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
import { signIn } from "next-auth/react"
import { useState } from "react"

import { SignupContainer } from "./signup.styled"
import { SignUPOTP } from "./SignupOTP"
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
  providers: Record<string, any>
}
export function Signup(props: ISignupProps) {
  const [isEmailSet, setIsEmailSet] = useState(false)
  const [mailsent, setMailsent] = useState(false)
  const { values, handleSubmit, isSubmitting, errors, handleChange } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        confirmpassword: "",
      },
      onSubmit: values => {
        setMailsent(true)
      },
    })

  const handleEmailOtp = () => {
    if ((values.email || "").trim()) {
      setIsEmailSet(true)
    }
    return null
  }
  return (
    <AuthLayout>
      <SignupContainer className="providers-section">
        <div className="top_navigation">
          <Link href="/signin">
            <a>Already a member?</a>
          </Link>
          <Button>LOGIN</Button>
        </div>

        <div className="section_wrapper">
          <h1 className="heading">get started</h1>
          {!mailsent ? (
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
                  <p>
                    <span>
                      <EnvelopIcon />
                      {values.email}
                    </span>
                    <Edit />
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
                    />
                    <Input
                      type="password"
                      placeholder="confirm Password"
                      className="confirmpassword-input"
                      id="confirmpassword"
                      name="confirmpassword"
                      // materialDesign
                      onChange={handleChange}
                      value={values.confirmpassword}
                    />
                  </>
                )}
              </div>
              <Button
                onClick={() =>
                  isEmailSet ? handleSubmit() : handleEmailOtp()
                }>
                Next
              </Button>
            </div>
          ) : (
            <SignUPOTP email={values.email} />
          )}
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
