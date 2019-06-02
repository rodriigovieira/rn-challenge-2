import React from "react"
import AsyncStorage from "@react-native-community/async-storage"
import { ApolloProvider } from "react-apollo"
import { View, ActivityIndicator, StyleSheet } from "react-native"
import { ThemeProvider } from "styled-components"

import theme from "~/styles"

import "~/config/ReactotronConfig"

import client from "~/utils/apolloClient"

import createNavigator from "~/routes"

import AppContext from "~/context/AppContext"
import AppReducer from "~/reducers/AppReducer"

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

  const [state, dispatch] = React.useReducer(AppReducer, {
    name: "User"
  })

  React.useEffect(() => {
    AsyncStorage.getItem("@name").then((user) => {
      if (user) {
        dispatch({
          type: "SET_USER_NAME",
          name: user
        })
      }
    })
  }, [])

  React.useEffect(() => {
    AsyncStorage.getItem("@token")
      .then((token) => {
        if (!token) {
          setLoading(false)

          return
        }

        AsyncStorage.setItem("@token", token)
        setUserLogged(true)
        setLoading(false)
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
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={{ state, dispatch }}>
          <Routes />
        </AppContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
