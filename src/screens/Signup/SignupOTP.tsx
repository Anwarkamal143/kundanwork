import { Button, Input, Slicklider } from "@Components"
import {
  AppleIcon,
  Edit,
  EnvelopIcon,
  Eye,
  FacebookIcon,
  GoogleIcon,
  LinkedInIcon,
  Spinner,
} from "@Icons"
import { AuthLayout } from "@Layouts"
import { AuthServices } from "@Utils/enums"
import { useFormik } from "formik"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useState } from "react"
import styled from "styled-components"

import { SignupContainer } from "./signup.styled"
const getIcon = (title: string) => {
  switch (title) {
    case "google":
      return <GoogleIcon />
    case "linkedin":
      return <LinkedInIcon />
    case "apple":
      return <AppleIcon />

    case "facebook":
      return <FacebookIcon />
    default:
      break
  }
}
type ISignupProps = {
  email: string
  className?: string
}
function SignOTP(props: ISignupProps) {
  const { email, className } = props
  const {
    values,
    handleSubmit,
    isSubmitting,
    errors,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
      opts: {},
    },
    onSubmit: values => {},
  })
  const handleInputChange = (value: string, index: number) => {
    const { opts } = values
    console.log({ opts, index })
    const newOpts: Record<number, any> = { ...opts, [index]: value }
    if (!(value || "").trim()) delete newOpts[index]
    setFieldValue("opts", newOpts)
    const isAllSelected = Object.keys(newOpts || {}).length
    if (isAllSelected === 6) {
      handleSubmit()
    }
  }
  console.log({ values })
  return (
    <div className={className}>
      <p>
        <strong>An email has been sent to </strong> {email}
      </p>
      <p>
        <strong>
          Click on the Link to verify or Enter the OTP sent to you
        </strong>
      </p>
      {[...new Array(6)].fill(0).map((a, i) => {
        return (
          <input
            key={i}
            name={`otp-${i}`}
            onChange={e => handleInputChange(e.target.value, i)}
            placeholder={``}
            value={(values.opts as any)[i]}
            disabled={isSubmitting}
          />
        )
      })}
      {isSubmitting && <span>{<Spinner color="green" />}</span>}
    </div>
  )
}
export const SignUPOTP = styled(SignOTP)`
  p {
    margin: 15px 0;
  }
  input {
    width: 60px;
    height: 60px;
    text-align: center;
  }
  input:nth-child(even) {
    margin: 0 20px;
  }
`
