import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

export const gqlClient = new ApolloClient({
  link: new HttpLink({ uri: `${import.meta.env.VITE_SERVER_URL}/graphql` }),
  cache: new InMemoryCache(),
})
