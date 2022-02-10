// import { Header, Sidebar } from "@Components"
import { StyledLayoutWrapper } from "@Styled"
import styled from "styled-components"

import { MainContainer, MainContentWrapper } from "./applayout.styled"

export type LayoutType = {
  variant?: "small" | "regular"
  children: React.ReactNode | JSX.Element | React.ReactNode[]
  styles?: React.CSSProperties
  otherProps?: Record<string, unknown>
}
export const AppLayoutWrapper = styled.div``

export function AppLayout(props: LayoutType) {
  const { otherProps, children, styles } = props
  return (
    <StyledLayoutWrapper>
      <AppLayoutWrapper style={styles} {...otherProps}>
        {/* <Header /> */}
        <MainContainer>
          {/* <Sidebar /> */}
          <MainContentWrapper>{children}</MainContentWrapper>
        </MainContainer>
      </AppLayoutWrapper>
    </StyledLayoutWrapper>
  )
}
