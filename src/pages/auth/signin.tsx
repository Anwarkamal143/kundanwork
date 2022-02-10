import { GetServerSideProps } from "next"
import type { Session } from "next-auth"
import { getSession, useSession } from "next-auth/react"
// eslint-disable-next-line
import { getProviders, signIn } from "next-auth/react"
import { useEffect, useState } from "react"

import Layout from "../../components/layout"
// import {   } from "next-auth/client/_utils"
export default function Page({ providers }: { providers: any }) {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  console.log("Custom Signin page was called.", providers, session)
  return (
    <>
      <div>Custom Signin Page</div>
      {Object.values(providers || {}).map((provider: any) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}

// Export the `session` prop to use sessions with Server Side Rendering
export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async context => {
  return {
    props: {
      session: await getSession(context),
      providers: await getProviders(),
    },
  }
}
