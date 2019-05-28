import React, { useState } from "react"
import Modal from "react-native-modal"
import PropTypes from "prop-types"
import { ActivityIndicator, TouchableWithoutFeedback, Keyboard } from "react-native"

import {
  Container,
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

const AddExpenseModal = ({
  value,
  modal,
  isAdding,
  onBackdropPress,
  handleSubmit,
  loading,
  description,
  setDescription
}) => {
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

  return (
    <Container>
      <Modal onBackdropPress={onBackdropPress} isVisible={modal}>
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
                value={description}
                placeholder="Description goes here"
                onChangeText={setDescription}
                multiline
              />
            </DescriptionContainer>

            <ValueContainer isAdding={showPlusColor}>
              <ValueText color={color}>{`$${value}`}</ValueText>
            </ValueContainer>

            <ConfirmButton color={color} onPress={handleSubmit}>
              {loading ? (
                <ActivityIndicator size="large" color="black" />
              ) : (
                <ConfirmButtonText>CONFIRM</ConfirmButtonText>
              )}
            </ConfirmButton>
          </ContentContainer>
        </TouchableWithoutFeedback>
      </Modal>
    </Container>
  )
}

AddExpenseModal.propTypes = {
  value: PropTypes.string.isRequired,
  modal: PropTypes.bool.isRequired,
  isAdding: PropTypes.bool.isRequired,
  onBackdropPress: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired
}

export default AddExpenseModal
