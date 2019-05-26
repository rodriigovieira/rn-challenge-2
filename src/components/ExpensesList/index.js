import React from "react"
import {
  ActivityIndicator, ScrollView, View, RefreshControl, Text
} from "react-native"

import Expense from "~/components/Expense"

import api from "~/services/api"

const ExpensesList = ({ navigation }) => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const created = navigation.getParam("created")

  const handleRefresh = () => {
    setLoading(true)

    api
      .get("/expenses.json")
      .then((res) => {
        if (!res.data) setData([])

        const array = []

        Object.keys(res.data).forEach((key) => {
          array.push({
            id: key,
            type: res.data[key].type,
            value: res.data[key].value,
            description: res.data[key].description
          })
        })

        setData(array)

        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  React.useEffect(() => {
    handleRefresh()
  }, [created])

  if (loading) {
    return (
      <View style={{ marginTop: 15 }}>
        <ActivityIndicator size="large" color="darkgreen" />
      </View>
    )
  }

  return (
    <ScrollView style={{ width: "100%" }}>
      <>
        <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        {data.length > 0 ? (
          data.map(expense => (
            <Expense handleRefresh={handleRefresh} key={expense.id} expense={{ ...expense }} />
          ))
        ) : (
          <Text>No expense available.</Text>
        )}
      </>
    </ScrollView>
  )
}

export default ExpensesList
