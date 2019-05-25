import React from "react"

import ExpensesList from "~/components/ExpensesList"

import {
  Container, StatusBar, StatusBarText, DrawerButton, DrawerButtonText
} from "./styles"

const ExpensesPage = ({ navigation }) => {
  const oi = "oi"

  return (
    <Container>
      <StatusBar>
        <DrawerButton onPress={() => navigation.openDrawer()}>
          <DrawerButtonText>X</DrawerButtonText>
        </DrawerButton>

        <StatusBarText>Expenses Page</StatusBarText>
      </StatusBar>

      <ExpensesList navigation={navigation} />
    </Container>
  )
}

export default ExpensesPage
