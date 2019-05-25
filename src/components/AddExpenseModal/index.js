import React, { useState } from "react"
import Modal from "react-native-modal"
import PropTypes from "prop-types"
import { ActivityIndicator } from "react-native"

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
  ConfirmButton,
  ConfirmButtonText
} from "./styles"

const AddExpenseModal = ({
  value, modal, isAdding, onBackdropPress, handleSubmit, loading
}) => {
  const [showPlusColor, setShowPlusColor] = useState(isAdding)
  const [showMinusColor, setShowMinusColor] = useState(!isAdding)

  const color = showMinusColor ? "rgba(231, 76, 60, 1)" : "rgba(144, 198, 149, 1)"

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
  loading: PropTypes.bool.isRequired
}

export default AddExpenseModal
