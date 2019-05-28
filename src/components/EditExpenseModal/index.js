import React, { useState } from "react"
import { ActivityIndicator } from "react-native"
import Modal from "react-native-modal"
import PropTypes from "prop-types"

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

const EditExpenseModal = ({
  expense: {
    value: propValue, description: propDescription, id, type: propType
  },
  modal,
  onBackdropPress,
  handleRefresh,
  setShowModal
}) => {
  const [showPlusColor, setShowPlusColor] = useState(propType === "positive")
  const [showMinusColor, setShowMinusColor] = useState(propType === "negative")
  const [loading, setLoading] = useState(false)

  const [description, setDescription] = useState(propDescription)
  const [value, setValue] = useState(propValue)
  const [type, setType] = useState(propType)

  const color = showMinusColor ? "rgba(231, 76, 60, 1)" : "rgba(170, 198, 149, 1)"

  const handlePlusClick = () => {
    setShowPlusColor(true)
    setShowMinusColor(false)
    setType("positive")
  }

  const handleMinusClick = () => {
    setShowPlusColor(false)
    setShowMinusColor(true)
    setType("negative")
  }

  const handleSubmit = () => {
    setLoading(true)

    const object = {
      value,
      description,
      type
    }

    api
      .patch(`/expenses/${id}.json`, JSON.stringify(object))
      .then(() => {
        setLoading(false)
        setShowModal(false)
        handleRefresh()
      })
      .catch(() => setLoading(false))
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

            <ExpenseValueTextInput keyboardType="numeric" onChangeText={setValue} color={color}>
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

EditExpenseModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  onBackdropPress: PropTypes.func.isRequired,
  expense: PropTypes.shape({
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  handleRefresh: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired
}

export default EditExpenseModal
