import React from "react"
import gql from "graphql-tag"
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions
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
const ExpensesList = ({ navigation }) => {
  const [modalIndex, setModalIndex] = React.useState(-1)

  return (
    <Query
      fetchPolicy="cache-and-network"
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
              <ActivityIndicator size="large" color="rgba(73, 110, 239, 1)" />
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
          <FlatList
            data={showUserExpenses}
            contentContainerStyle={{
              alignItems: "stretch",
              // width: "100%",
              marginLeft: 20,
              marginRight: 20
            }}
            style={{
              width: "100%",
            }}
            onRefresh={refetch}
            refreshing={loading}
            keyExtractor={item => item.id}
            ListEmptyComponent={(
              <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                <Text>No expenses avaibale.</Text>
              </View>
)}
            renderItem={({ item, index }) => (
              <Expense
                refetch={refetch}
                key={item.id}
                handleRefresh={() => {}}
                expense={{ ...item }}
                index={index}
                setModalIndex={setModalIndex}
                modalIndex={modalIndex}
              />
            )}
          />
        )
      }}
    </Query>
  )
}

export default ExpensesList
