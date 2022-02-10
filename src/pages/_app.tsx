import "@Styles/globals.scss"

// import "./styles.css"
// Use the <SessionProvider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
import { AppLayout } from "@Layouts"
import { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      session={pageProps.session}
    >
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </SessionProvider>
  )
}

export default MyApp
// * getStaticProps with apollo

/**
 * export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_POSTS_QUERY,
    variables: allPostsQueryVars,
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}
 */

//  * getServerSideprops

/**
 * export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_POSTS_QUERY,
    variables: allPostsQueryVars,
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}
 */
