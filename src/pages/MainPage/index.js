import React, { useState } from "react"
import Modal from "react-native-modal"
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures"

import {
  Container,
  BigTextContainer,
  BigTextDisplay,
  ButtonsContainer,
  OperatorsContainer,
  NumbersContainer,
  OperatorButton,
  OperatorButtonText,
  NumberButton,
  NumberButtonText,
  ConfirmButtonContainer,
  ConfirmButton,
  ConfirmButtonText,
  ErrorTextDisplay
} from "./styles"

import AddExpenseModal from "~/components/AddExpenseModal"
import Header from "~/components/Header"

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "00", "."]

// eslint-disable-next-line
const MainPage = ({ navigation }) => {
  const [bigText, setBigText] = useState("")
  const [operator, setOperator] = useState("+")

  const [showModal, setShowModal] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleNumberPress = (number) => {
    if ((number === "0" || number === "00" || number === ".") && !bigText) return

    if (number === "." && bigText.includes(number)) return

    setBigText(`${bigText}${number}`)

    setShowError(false)
  }

  const handlePress = () => {
    if (bigText[bigText.length - 1] === ".") {
      setShowError(true)
      return
    }

    if (!bigText) {
      setShowError(true)
      return
    }

    setShowModal(true)
  }

  const onSwipe = (gestureName) => {
    const { SWIPE_LEFT } = swipeDirections

    const newString = bigText.slice(0, bigText.length - 1)

    if (gestureName === SWIPE_LEFT) setBigText(newString)
  }

  const config = {
    velocityThreshold: 0.05,
    directionalOffsetThreshold: 10
  }

  return (
    <Container>
      <Header title="MainPage" navigation={navigation} hideFilter />

      <GestureRecognizer config={config} onSwipe={direction => onSwipe(direction)}>
        <BigTextContainer showError={showError}>
          <BigTextDisplay operator={operator}>{bigText || 0}</BigTextDisplay>

          {showError && <ErrorTextDisplay>Please insert a valid value.</ErrorTextDisplay>}
        </BigTextContainer>
      </GestureRecognizer>

      <ButtonsContainer>
        <OperatorsContainer>
          <OperatorButton onPress={() => setOperator("+")}>
            <OperatorButtonText color="green">+</OperatorButtonText>
          </OperatorButton>

          <OperatorButton onPress={() => setOperator("-")}>
            <OperatorButtonText color="red">-</OperatorButtonText>
          </OperatorButton>
        </OperatorsContainer>

        <NumbersContainer>
          {numbers.map(number => (
            <NumberButton onPress={() => handleNumberPress(number)} key={Math.random()}>
              <NumberButtonText key={Math.random()}>{number}</NumberButtonText>
            </NumberButton>
          ))}
        </NumbersContainer>

        <ConfirmButtonContainer>
          <ConfirmButton onPress={handlePress}>
            <ConfirmButtonText operator={operator}>CREATE</ConfirmButtonText>
          </ConfirmButton>

          <ConfirmButton onPress={() => setBigText("")}>
            <ConfirmButtonText>CLEAR</ConfirmButtonText>
          </ConfirmButton>
        </ConfirmButtonContainer>
      </ButtonsContainer>

      <Modal onBackdropPress={() => setShowModal(false)} isVisible={showModal}>
        <AddExpenseModal
          value={bigText}
          isAdding={operator === "+"}
          navigation={navigation}
          setModal={setShowModal}
        />
      </Modal>
    </Container>
  )
}

export default MainPage
