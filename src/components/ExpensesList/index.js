import React from "react"
import gql from "graphql-tag"
import {
  View, Text, FlatList, ActivityIndicator, StyleSheet
} from "react-native"
import { Query } from "react-apollo"

import Expense from "~/components/Expense"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
})

// eslint-disable-next-line react/prop-types
const ExpensesList = ({ navigation }) => (
  <Query
    query={gql`
      query {
        showUserExpenses {
          id
          value
          name
          type
          description
        }
      }
    `}
  >
    {({
      data: { showUserExpenses }, error, loading, refetch
    }) => {
      if (loading) {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" />
          </View>
        )
      }

      const subscription1 = navigation.addListener("willFocus", (willFocus) => {
        refetch()
      })

      const subscription2 = navigation.addListener("didFocus", (willFocus) => {
        subscription1.remove()

        subscription2.remove()
      })

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
            onRefresh={refetch}
            refreshing={loading}
            keyExtractor={item => item.id}
            ListEmptyComponent={(
              <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                <Text>No expenses avaibale.</Text>
              </View>
)}
            renderItem={({ item }) => (
              <Expense refetch={refetch} key={item.id} handleRefresh={() => {}} expense={{ ...item }} />
            )}
          />
        </View>
      )
    }}
  </Query>
)

export default ExpensesList
