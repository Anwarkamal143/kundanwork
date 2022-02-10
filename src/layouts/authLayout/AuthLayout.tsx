import { Button, Input, Slicklider } from "@Components"
import {
  AppleIcon,
  EnvelopIcon,
  FacebookIcon,
  GoogleIcon,
  LinkedInIcon,
} from "@Icons"
import { AuthServices } from "@Utils/enums"
import Link from "next/link"
import {
  cloneElement,
  FC,
  isValidElement,
  PropsWithChildren,
  ReactChild,
  ReactChildren,
  ReactElement,
  ReactNode,
} from "react"
import styled from "styled-components"

import { AuthContainer } from "./authlayout.styled"

type IAuthProps = {
  children?: ReactChild | ReactChildren | ReactNode | ReactElement | HTMLElement
  className?: string
}
function AuthL(props: IAuthProps) {
  const { children, className = "" } = props
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

  console.log(isValidElement(children))
  console.log({ children })
  // return <p>hello theere</p>
  return (
    <AuthContainer className={`${className} auth_layout`}>
      <div className="react-slick">
        <Slicklider />
      </div>
      {cloneElement(children as any, {
        // loading,
        // isLoading: loading,
        // files: acceptedFiles,
      })}
    </AuthContainer>
  )
}
export const AuthLayout = styled(AuthL)``
