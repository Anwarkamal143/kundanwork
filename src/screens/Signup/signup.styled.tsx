import styled from "styled-components"

export const SignupContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;

  align-items: center;
  flex-direction: column;
  padding: 30px;
  .heading {
    text-transform: uppercase;

    width: 100%;
  }
  .top_navigation {
    margin-left: auto;
  }
  .section_wrapper {
    width: 50%;
    margin: auto 0;

    .providers {
      margin-top: 20px;
      display: flex;
      .icon {
        margin-right: 20px;
        cursor: pointer;
      }
    }
    .input_wrapper {
      .signup_email {
        padding: 30px 0;
      }
      .email-input {
        margin-bottom: 20px;
      }
    }
  }
`
