import React from "react"
import gql from "graphql-tag"
import {
  View, Text, FlatList, ActivityIndicator, StyleSheet
} from "react-native"
import { Query } from "react-apollo"

import Expense from "~/components/Expense"

import api from "~/services/api"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
})

// eslint-disable-next-line react/prop-types
const ExpensesList = ({ navigation }) => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  // const created = navigation.getParam("created")

  // const handleRefresh = () => {
  //   setLoading(true)

  //   api
  //     .get("/expenses.json")
  //     .then((res) => {
  //       if (!res.data) setData([])

  //       const array = []

  //       Object.keys(res.data).forEach((key) => {
  //         array.push({
  //           id: key,
  //           type: res.data[key].type,
  //           value: res.data[key].value,
  //           description: res.data[key].description
  //         })
  //       })

  //       setData(array)

  //       setLoading(false)
  //     })
  //     .catch(() => setLoading(false))
  // }

  // React.useEffect(() => {
  //   handleRefresh()
  // }, [])

  // React.useEffect(() => {
  //   handleRefresh()
  // }, [created])

  return (
    <Query
      query={gql`
        query {
          showUserExpenses {
            id
            value
            name
            type
          }
        }
      `}
    >
      {({ data: { showUserExpenses }, error, loading: requestLoading }) => {
        if (requestLoading) {
          return (
            <View style={styles.container}>
              <ActivityIndicator size="large" />
            </View>
          )
        }

        if (error) navigation.navigate("WelcomePage")

        return (
          <View
            style={{
              flex: 1,
              backgroundColor: "lightgray",
              border: "0 solid black",
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5
            }}
          >
            <FlatList
              style={{ width: "100%" }}
              data={showUserExpenses}
              onRefresh={() => {}}
              refreshing={loading}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Expense key={item.id} handleRefresh={() => {}} expense={{ ...item }} />
              )}
              ListEmptyComponent={(
                <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                  <Text>No expenses avaibale.</Text>
                </View>
)}
            />
          </View>
        )
      }}
    </Query>
  )
}

export default ExpensesList
