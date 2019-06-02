import React, { useState } from "react"
import PropTypes from "prop-types"
import Swipeout from "react-native-swipeout"
import gql from "graphql-tag"
import {
  ActivityIndicator, Alert, View, StyleSheet
} from "react-native"
import { Mutation } from "react-apollo"

import {
  ExpenseContainer, ExpenseButton, ExpenseValueText, DescriptionText
} from "./styles"
import EditExpenseModal from "~/components/EditExpenseModal"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },

  errorContainer: {
    marginBottom: 30,
    marginTop: -10,
    alignItems: "center"
  },

  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 14
  },

  successText: {
    textAlign: "center",
    color: "blue",
    fontSize: 14
  }
})

const Expense = ({
  expense: {
    value, type, id, description, name: title
  },
  handleRefresh,
  refetch,
  index,
  modalIndex,
  setModalIndex
}) => {
  const [showModal, setShowModal] = useState(false)
  React.useEffect(() => {
    if (index === modalIndex) setShowModal(true)
  }, [modalIndex])

  const handleDelete = (deleteFunction) => {
    deleteFunction({ variables: { id } })
      .then(() => refetch())
      .catch(() => refetch())
  }

  return (
    <Mutation
      mutation={gql`
        mutation DELETE_EXPENSE($id: ID!) {
          deleteExpense(id: $id) {
            id
            value
            name
            type
            description
          }
        }
      `}
    >
      {(deleteFunction, { error, loading }) => {
        if (loading) {
          return (
            <View style={styles.container}>
              <ActivityIndicator size="large" />
            </View>
          )
        }

        return (
          <>
            <Swipeout
              style={{
                backgroundColor: "white",
                width: "100%"
              }}
              right={[
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
                      onPress: () => handleDelete(deleteFunction)
                    }
                  ])
                }
              ]}
            >
              {/* <ExpenseContainer> */}
              <ExpenseButton onPress={() => setModalIndex(index)}>
                <ExpenseValueText
                  color={type === "POSITIVE" ? "rgba(144, 198, 149, .7)" : "rgba(231, 76, 60, .7)"}
                  style={{
                    textShadowColor: "#585858",
                    textShadowRadius: 0.1,
                    textShadowOffset: { width: 1, height: 1 }
                  }}
                >
                  {`${type === "POSITIVE" ? "+" : "-"}${value}`}
                </ExpenseValueText>

                {title ? <DescriptionText>{title}</DescriptionText> : null}
              </ExpenseButton>
              {/* </ExpenseContainer> */}
            </Swipeout>

            <EditExpenseModal
              onBackdropPress={() => {
                setModalIndex(-1)

                setShowModal(false)
              }}
              setModalIndex={setModalIndex}
              modal={showModal}
              setShowModal={setShowModal}
              handleRefresh={handleRefresh}
              expense={{
                value,
                type,
                id,
                description,
                name: title
              }}
              refetch={refetch}
            />
          </>
        )
      }}
    </Mutation>
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
