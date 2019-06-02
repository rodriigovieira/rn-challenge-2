import React from "react"
import PropTypes from "prop-types"

import ExpensesList from "~/components/ExpensesList"
import Header from "~/components/Header"

import { Container } from "./styles"

const ExpensesPage = ({ navigation }) => (
  <Container>
    <Header title="Expenses Page" navigation={navigation} hideFilter={false} />

    <ExpensesList navigation={navigation} />
  </Container>
)

ExpensesPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

export default ExpensesPage
