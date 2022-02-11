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
      setMailsent(true)
    },
  })

  const handleEmail = () => {
    if ((values.email || "").trim()) {
      setIsEmailSet(true)
    }
    return null
  }
  return (
    <AuthLayout>
      <SignupContainer className="providers-section">
        <div className="top_navigation">
          Not a member?
          <Button onClick={() => router.push("/auth/signup")}>SIGNUP</Button>
        </div>

        <div className="section_wrapper">
          <h1 className="heading">login</h1>

          <div>
            <div className="providers">
              {Object.values(AuthServices).map((provider: any) => (
                <div
                  className="icon"
                  key={provider}
                  onClick={() => signIn(provider)}>
                  {getIcon(provider)}
                </div>
              ))}
            </div>
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
                      setFieldValue("password", "")
                    }}>
                    <Edit />
                  </span>
                </p>
              )}
              <strong className="signup_email">
                {isEmailSet
                  ? "Enter a Valid Password"
                  : "Or Sign up with Email"}
              </strong>
              {!isEmailSet ? (
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
              ) : (
                <>
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
                  <Link href={"/forgot-password"}>
                    <a>Forgot password</a>
                  </Link>
                </>
              )}
            </div>
            <Button
              onClick={() => (isEmailSet ? handleSubmit() : handleEmail())}>
              Next
            </Button>
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
