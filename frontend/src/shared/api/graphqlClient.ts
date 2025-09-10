import { userAtom } from "@/entities/user"
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client"
import { CombinedGraphQLErrors, ServerError } from "@apollo/client/errors"
import { ErrorLink } from "@apollo/client/link/error"

const errorLink = new ErrorLink(({ error }) => {
  console.log("error: ", error)

  if (ServerError.is(error) && error.statusCode === 401) {
    userAtom.reset()
    return
  }

  if (CombinedGraphQLErrors.is(error)) {
    for (const err of error.errors) {
      if (err.extensions?.code === "UNAUTHENTICATED") {
        userAtom.reset()
        return
      }
    }
  }
})

const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_SERVER_URL}/graphql`,
  credentials: "include",
})

export const gqlClient = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
})
