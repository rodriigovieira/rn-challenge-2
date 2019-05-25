import React from "react"
import { ActivityIndicator, ScrollView, View } from "react-native"

import Expense from "~/components/Expense"

import api from "~/services/api"

const ExpensesList = ({ navigation }) => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const created = navigation.getParam('created')

  React.useEffect(() => {
    setLoading(true)

    api
      .get("/expenses.json")
      .then((res) => {
        const array = []

        Object.keys(res.data).forEach((key) => {
          array.push({
            id: key,
            type: res.data[key].type,
            value: res.data[key].value
          })
        })

        setData(array)

        setLoading(false)
      })
      .catch(() => setLoading(false))
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
      {data.map(expense => (
        <Expense key={expense.id} expense={{ ...expense }} />
      ))}
    </ScrollView>
  )
}

export default ExpensesList
