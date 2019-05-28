import React from "react"

import ExpensesList from "~/components/ExpensesList"
import Header from "~/components/Header"

import { Container } from "./styles"

// eslint-disable-next-line react/prop-types
const ExpensesPage = ({ navigation }) => (
  <Container>
    <Header title="Expenses Page" navigation={navigation} hideFilter={false} />

    <ExpensesList navigation={navigation} />
  </Container>
)

export default ExpensesPage
