import React from "react"
import AssyncStorage from "@react-native-community/async-storage"
import { ApolloProvider } from "react-apollo"
import { View, ActivityIndicator, StyleSheet } from "react-native"

import "~/config/ReactotronConfig"

import client from "~/utils/apolloClient"

import createNavigator from "~/routes"

AssyncStorage.clear()

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
})

const App = () => {
  const [userLogged, setUserLogged] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    AssyncStorage.getItem("@token")
      .then((token) => {
        if (!token) {
          setLoading(false)

          return
        }

        AssyncStorage.setItem("@token", token)
        setUserLogged(true)
      })
      .catch(() => setLoading(false))
  }, [])

  const Routes = createNavigator(userLogged)

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  )
}

export default App
