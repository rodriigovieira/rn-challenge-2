import React, { useState } from "react"
import PropTypes from "prop-types"
import Modal from "react-native-modal"
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures"
import Icon from "react-native-vector-icons/FontAwesome5"
import { StatusBar } from "react-native"

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

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "."]

const MainPage = ({ navigation }) => {
  const [bigText, setBigText] = useState("")
  const [operator, setOperator] = useState("+")

  const [showModal, setShowModal] = useState(false)
  const [showError, setShowError] = useState(false)
  const [lengthError, setLengthError] = useState(false)

  const handleNumberPress = (number) => {
    const nextString = `${bigText}${number}`

    if ((number === "0" || number === "00" || number === ".") && !bigText) return

    if (number === "." && bigText.includes(number)) return

    let limit = 8

    if (bigText.includes(".")) {
      limit = 10

      const dotIndex = nextString.indexOf(".")

      if (nextString.substr(dotIndex, nextString.length).length > 3) return
    }

    if (nextString.length > limit) {
      setLengthError(true)

      return
    }

    setBigText(nextString)

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

  const removeLastCharacter = () => {
    let newString = bigText.slice(0, bigText.length - 1)

    if (bigText.length === 1) newString = ""

    setBigText(newString)
    if (lengthError) setLengthError(false)
  }

  const onSwipe = (gestureName) => {
    const { SWIPE_LEFT } = swipeDirections

    if (gestureName === SWIPE_LEFT) removeLastCharacter()
  }

  const config = {
    velocityThreshold: 0.01,
    directionalOffsetThreshold: 100
  }

  return (
    <>
      <Header title="MainPage" navigation={navigation} hideFilter />

      <Container>
        <GestureRecognizer config={config} onSwipe={direction => onSwipe(direction)}>
          <BigTextContainer>
            <BigTextDisplay operator={operator}>{bigText || 0}</BigTextDisplay>

            {showError && <ErrorTextDisplay>Please insert a valid value.</ErrorTextDisplay>}

            {lengthError && (
              <ErrorTextDisplay>You can only type 9 characters or less.</ErrorTextDisplay>
            )}
          </BigTextContainer>
        </GestureRecognizer>

        <ButtonsContainer>
          <OperatorsContainer>
            <OperatorButton onPress={() => setOperator("+")}>
              <OperatorButtonText color="rgba(120,156,70,1)">+</OperatorButtonText>
            </OperatorButton>

            <OperatorButton onPress={() => setOperator("-")}>
              <OperatorButtonText color="rgba(231, 76, 60, 1)">-</OperatorButtonText>
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

            <ConfirmButton onPress={removeLastCharacter}>
              <Icon name="backspace" size={30} />
            </ConfirmButton>
          </ConfirmButtonContainer>
        </ButtonsContainer>

        <Modal onBackdropPress={() => setShowModal(false)} isVisible={showModal}>
          <AddExpenseModal
            value={bigText}
            setBigText={setBigText}
            isAdding={operator === "+"}
            navigation={navigation}
            setModal={setShowModal}
          />
        </Modal>
      </Container>
    </>
  )
}

MainPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

export default MainPage
