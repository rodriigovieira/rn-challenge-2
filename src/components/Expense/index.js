import React from "react"
import PropTypes from "prop-types"

import { ExpenseContainer, ExpenseValueText } from "./styles"

const Expense = ({ expense: { value, type } }) => {
  const oi = "oi"

  return (
    <ExpenseContainer
      color={type === "positive" ? "rgba(144, 198, 149, .7)" : "rgba(231, 76, 60, .7)"}
    >
      <ExpenseValueText>{`${type === "positive" ? "+" : "-"}${value}`}</ExpenseValueText>
    </ExpenseContainer>
  )
}

Expense.propTypes = {
  expense: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired
}

export default Expense
