import { Button, Input, Slicklider } from "@Components"
import {
  AppleIcon,
  Edit,
  EnvelopIcon,
  Eye,
  FacebookIcon,
  GoogleIcon,
  LinkedInIcon,
} from "@Icons"
import { AuthLayout } from "@Layouts"
import { AuthServices } from "@Utils/enums"
import { useFormik } from "formik"
import Link from "next/link"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"
import { useState } from "react"
import * as yup from "yup"

import { SignupContainer } from "./signin.styled"
import { OTPLink } from "../OTP"
import { ResetPassword } from "../ResetPassword"

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
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter valid email address")
    .required("Enter valid email address"),
  password: yup.string().required("Password is required"),
})
type ISignupProps = {
  providers: Record<string, any>
}
export function SignIn(props: ISignupProps) {
  const [isEmailSet, setIsEmailSet] = useState(false)
  const [mailsent, setMailsent] = useState(false)
  const [isResetPassword, setIsResetPassword] = useState(false)
  const [isOTPenabled, setIsOTPenabled] = useState(false)

  const router = useRouter()

  const {
    values,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    errors,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      if (values.password !== "admin") {
        // setIsResetPassword(true);
      }
      setMailsent(true)
    },
  })

  const handleEmail = () => {
    if ((values.email || "").trim()) {
      setIsEmailSet(true)
    }
    return null
  }

  const getComponnets = () => {
    if (!isEmailSet) {
      return (
        <>
          <strong className="signup_email">Or Sign up with Email</strong>
          <Input
            hasRightIcon
            rightIcon={{ icon: EnvelopIcon }}
            type="email"
            placeholder="Email"
            // className="email-input"
            id="Email"
            name="email"
            onChange={handleChange}
            // materialDesign
            value={values.email}
            onBlur={handleBlur}
          />
          <Button onClick={handleEmail}>Next</Button>
        </>
      )
    }
    if (isOTPenabled) {
      return (
        <OTPLink
          title={
            <p>
              Click on the Link sent to email@gmail.com to verify ownership of
              your account or Enter the OTP sent to you
            </p>
          }
          onSubmit={isSubmitted => {
            setTimeout(() => {
              setIsOTPenabled(false)
              setIsResetPassword(true)
            }, 2000)
          }}
        />
      )
    }

    if (!isResetPassword) {
      return (
        <>
          <strong className="signup_email">Enter a Valid Password</strong>
          <Input
            hasRightIcon
            rightIcon={{
              icon: Eye,
            }}
            type="password"
            placeholder="Password"
            className="password-input"
            id="password"
            name="password"
            onChange={handleChange}
            // materialDesign
            value={values.password}
            onBlur={handleBlur}
          />
          <div>
            <p onClick={() => setIsOTPenabled(true)}>Forgot password</p>
            <Button onClick={handleSubmit}>Next</Button>
          </div>
        </>
      )
    }

    return (
      <ResetPassword
        title="Create new password"
        onSubmit={isSubmitted => {
          setIsResetPassword(true)
        }}
      />
    )
  }
  return (
    <AuthLayout>
      <SignupContainer className="providers-section">
        <div className="top_navigation">
          Not a member?
          <Button onClick={() => router.push("/auth/signup")}>SIGNUP</Button>
        </div>

        <div className="section_wrapper">
          <h1 className="heading">
            {isResetPassword ? "reset password" : "login"}
          </h1>

          <div>
            {!isEmailSet && (
              <div className="providers">
                {Object.values(AuthServices).map((provider: any) => (
                  <div
                    className="icon"
                    key={provider}
                    onClick={() => signIn(provider)}
                  >
                    {getIcon(provider)}
                  </div>
                ))}
              </div>
            )}
            <div className="input_wrapper">
              {isEmailSet && (
                <p className="email_holder">
                  <span className="email_icon_wrapper">
                    <EnvelopIcon />
                    {values.email}
                  </span>
                  <span
                    className="edit_button"
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()
                      setIsEmailSet(false)
                      setIsResetPassword(false)
                      setIsOTPenabled(false)
                      setFieldValue("password", "")
                    }}
                  >
                    <Edit />
                  </span>
                </p>
              )}

              <div>
                {/* <strong className="signup_email">
                  {isEmailSet
                    ? "Enter a Valid Password"
                    : "Or Sign up with Email"}
                </strong> */}
                {getComponnets()}
              </div>
            </div>
          </div>
        </div>
        {/* {Object.values(providers).map((provider: any) => (
            <div key={provider.name}>
                {getIcon(provider.id)}
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          ))} */}
      </SignupContainer>
    </AuthLayout>
  )
}
