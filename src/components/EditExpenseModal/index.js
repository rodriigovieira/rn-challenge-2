import React, { useState } from "react"
import { ActivityIndicator, View, StyleSheet } from "react-native"
import { Mutation } from "react-apollo"
import Modal from "react-native-modal"
import PropTypes from "prop-types"

import gql from "graphql-tag"
import {
  Container,
  ContentContainer,
  ModalTitle,
  ModalTitleText,
  ExpenseTypeContainer,
  ExpensesTextContainer,
  ExpenseTypeText,
  ExpenseValueTextInput,
  ButtonsContainer,
  OperatorButton,
  OperatorButtonText,
  Divider,
  DescriptionContainer,
  DescriptionTextInput,
  ConfirmButton,
  ConfirmButtonText
} from "./styles"
import api from "~/services/api"

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

const EditExpenseModal = ({
  expense: {
    value: propValue, description: propDescription, id, type: propType
  },
  modal,
  onBackdropPress,
  handleRefresh,
  setShowModal,
  refetch
}) => {
  const [showPlusColor, setShowPlusColor] = useState(propType === "POSITIVE")
  const [showMinusColor, setShowMinusColor] = useState(propType === "NEGATIVE")

  const [description, setDescription] = useState(propDescription)
  const [name, setName] = useState("")
  const [value, setValue] = useState(propValue)
  const [type, setType] = useState(propType)

  const color = showMinusColor ? "rgba(231, 76, 60, 1)" : "rgba(170, 198, 149, 1)"

  const handlePlusClick = () => {
    setShowPlusColor(true)
    setShowMinusColor(false)
    setType("POSITIVE")
  }

  const handleMinusClick = () => {
    setShowPlusColor(false)
    setShowMinusColor(true)
    setType("NEGATIVE")
  }

  const handleSubmit = (updateFunction) => {
    updateFunction({
      variables: {
        description,
        value: parseFloat(value),
        type,
        name,
        id
      }
    })
      .then(() => {
        setShowModal(false)

        refetch()
      })
      .catch(() => refetch())
  }

  return (
    <Mutation
      mutation={gql`
        mutation UPDATE_EXPENSE(
          $description: String!
          $value: Float!
          $type: ExpenseType!
          $name: String!
          $id: ID!
        ) {
          updateExpense(
            data: { description: $description, value: $value, type: $type, name: $name },
            id: $id
          ) {
            id
          }
        }
      `}
    >
      {(updateFunction, { loading, error }) => {
        if (loading) {
          return (
            <View style={styles.container}>
              <ActivityIndicator size="large" />
            </View>
          )
        }

        return (
          <Container>
            <Modal onBackdropPress={onBackdropPress} isVisible={modal}>
              <ContentContainer>
                <ModalTitle>
                  <ModalTitleText>Edit Expense</ModalTitleText>
                </ModalTitle>

                <ExpenseTypeContainer>
                  <ExpensesTextContainer>
                    <ExpenseTypeText>Type:</ExpenseTypeText>
                  </ExpensesTextContainer>

                  <ButtonsContainer>
                    <OperatorButton onPress={handlePlusClick} showPlusColor={showPlusColor}>
                      <OperatorButtonText>+</OperatorButtonText>
                    </OperatorButton>

                    <Divider />

                    <OperatorButton onPress={handleMinusClick} showMinusColor={showMinusColor}>
                      <OperatorButtonText>-</OperatorButtonText>
                    </OperatorButton>
                  </ButtonsContainer>
                </ExpenseTypeContainer>

                <ExpenseTypeContainer>
                  <ExpensesTextContainer>
                    <ExpenseTypeText>Value:</ExpenseTypeText>
                  </ExpensesTextContainer>

                  <ExpenseValueTextInput
                    keyboardType="numeric"
                    onChangeText={setValue}
                    color={color}
                  >
                    {value}
                  </ExpenseValueTextInput>
                </ExpenseTypeContainer>

                <DescriptionContainer color={color}>
                  <DescriptionTextInput
                    value={description}
                    placeholder="Description goes here"
                    onChangeText={setDescription}
                    multiline
                  />
                </DescriptionContainer>

                <ConfirmButton color={color} onPress={() => handleSubmit(updateFunction)}>
                  {loading ? (
                    <ActivityIndicator size="large" color="black" />
                  ) : (
                    <ConfirmButtonText>CONFIRM</ConfirmButtonText>
                  )}
                </ConfirmButton>
              </ContentContainer>
            </Modal>
          </Container>
        )
      }}
    </Mutation>
  )
}

EditExpenseModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  onBackdropPress: PropTypes.func.isRequired,
  expense: PropTypes.shape({
    value: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  handleRefresh: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired
}

export default EditExpenseModal
