import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View
} from "react-native"
import { Mutation } from "react-apollo"

import gql from "graphql-tag"
import {
  ContentContainer,
  ModalTitle,
  ModalTitleText,
  ExpenseTypeContainer,
  ExpensesTextContainer,
  ExpenseTypeText,
  ButtonsContainer,
  OperatorButton,
  OperatorButtonText,
  Divider,
  ValueContainer,
  ValueText,
  DescriptionContainer,
  DescriptionTextInput,
  ConfirmButton,
  ConfirmButtonText
} from "./styles"

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

const AddExpenseModal = ({
  value, isAdding, navigation, setModal
}) => {
  const [description, setDescription] = useState("")
  const [name, setName] = useState("")

  const [showPlusColor, setShowPlusColor] = useState(isAdding)
  const [showMinusColor, setShowMinusColor] = useState(!isAdding)

  const color = showMinusColor ? "rgba(231, 76, 60, 1)" : "rgba(170, 198, 149, 1)"

  React.useEffect(() => {
    setShowPlusColor(isAdding)

    setShowMinusColor(!isAdding)
  }, [isAdding])

  const handlePlusClick = () => {
    setShowPlusColor(true)
    setShowMinusColor(false)
  }

  const handleMinusClick = () => {
    setShowPlusColor(false)
    setShowMinusColor(true)
  }

  const handleCreate = (createExpenseFunction) => {
    createExpenseFunction({
      variables: {
        value: parseFloat(value),
        description,
        type: isAdding ? "POSITIVE" : "NEGATIVE",
        name
      }
    })
      .then(() => {
        navigation.navigate("ExpensesPage", { created: true })

        setModal(false)
      })
      .catch(() => setModal(false))
  }

  return (
    <Mutation
      mutation={gql`
        mutation CREATE_EXPENSE(
          $value: Float!
          $description: String!
          $type: ExpenseType!
          $name: String!
        ) {
          createExpense(
            data: { value: $value, description: $description, type: $type, name: $name }
          ) {
            id
          }
        }
      `}
    >
      {(createExpenseFunction, { loading, error }) => {
        if (loading) {
          return (
            <View style={styles.container}>
              <ActivityIndicator size="large" />
            </View>
          )
        }

        return (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ContentContainer>
              <ModalTitle>
                <ModalTitleText>Create Expense</ModalTitleText>
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

              <DescriptionContainer color={color}>
                <DescriptionTextInput
                  value={name}
                  placeholder="Title goes here"
                  onChangeText={setName}
                />

                <DescriptionTextInput
                  value={description}
                  placeholder="Description goes here"
                  onChangeText={setDescription}
                  multiline
                />
              </DescriptionContainer>

              <ValueContainer isAdding={showPlusColor}>
                <ValueText color={color}>{`$${value}`}</ValueText>
              </ValueContainer>

              <ConfirmButton color={color} onPress={() => handleCreate(createExpenseFunction)}>
                {loading ? (
                  <ActivityIndicator size="large" color="black" />
                ) : (
                  <ConfirmButtonText>CONFIRM</ConfirmButtonText>
                )}
              </ConfirmButton>
            </ContentContainer>
          </TouchableWithoutFeedback>
        )
      }}
    </Mutation>
  )
}

AddExpenseModal.propTypes = {
  value: PropTypes.string.isRequired,
  isAdding: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

export default AddExpenseModal
