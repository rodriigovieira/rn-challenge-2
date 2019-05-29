import React, { useState } from "react"
import PropTypes from "prop-types"
import Swipeout from "react-native-swipeout"
import { ActivityIndicator, Alert } from "react-native"

import {
  ExpenseContainer, ExpenseButton, ExpenseValueText, DescriptionText
} from "./styles"
import EditExpenseModal from "~/components/EditExpenseModal"

import api from "~/services/api"

const Expense = ({
  expense: {
    value, type, id, description
  }, handleRefresh
}) => {
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleDelete = () => {
    setLoading(true)

    api
      .delete(`/expenses/${id}.json`)
      .then(() => {
        setLoading(false)

        handleRefresh()
      })
      .catch(() => setLoading(false))
  }

  const swipeoutBtns = [
    {
      text: loading ? <ActivityIndicator /> : "Delete",
      backgroundColor: "rgba(231, 76, 60, 1)",
      type: "delete",
      onPress: () => Alert.alert("Confirmation", "Are you sure you want to delete this expense?", [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: handleDelete
        }
      ])
    }
  ]

  return (
    <>
      <Swipeout right={swipeoutBtns}>
        <ExpenseContainer>
          <ExpenseButton onPress={() => setShowModal(true)}>
            <ExpenseValueText
              color={type === "positive" ? "rgba(144, 198, 149, .7)" : "rgba(231, 76, 60, .7)"}
              style={{
                textShadowColor: "#585858",
                textShadowRadius: 0.1,
                textShadowOffset: { width: 1, height: 1 }
              }}
            >
              {`${type === "positive" ? "+" : "-"}${value}`}
            </ExpenseValueText>

            {description ? <DescriptionText>{description}</DescriptionText> : null}
          </ExpenseButton>
        </ExpenseContainer>
      </Swipeout>

      <EditExpenseModal
        onBackdropPress={() => setShowModal(false)}
        modal={showModal}
        setShowModal={setShowModal}
        handleRefresh={handleRefresh}
        expense={{
          value,
          type,
          id,
          description
        }}
      />
    </>
  )
}

Expense.propTypes = {
  expense: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  handleRefresh: PropTypes.func.isRequired
}

export default Expense
