import React, { useState } from "react"
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures"

import {
  Container,
  StatusBar,
  DrawerButton,
  DrawerButtonText,
  StatusBarText,
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

import api from "~/services/api"

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "00", ","]

// eslint-disable-next-line
const MainPage = ({ navigation }) => {
  const [bigText, setBigText] = useState("")
  const [description, setDescription] = useState("")
  const [operator, setOperator] = useState("+")

  const [showModal, setShowModal] = useState(false)
  const [showError, setShowError] = useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleNumberPress = (number) => {
    setBigText(`${bigText}${number}`)

    setShowError(false)
  }

  const handlePress = () => {
    if (!bigText) {
      setShowError(true)
      return
    }

    setShowModal(true)
  }

  const handleSubmit = () => {
    setLoading(true)

    const object = {
      type: operator === "+" ? "positive" : "negative",
      value: bigText,
      description
    }

    api
      .post("/expenses/.json", JSON.stringify(object))
      .then(() => {
        setLoading(false)
        setShowModal(false)
        setBigText("")

        navigation.navigate("ExpensesPage", {
          created: true
        })
      })
      .catch(() => setLoading(false))
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
      <StatusBar>
        <DrawerButton onPress={() => navigation.openDrawer()}>
          <DrawerButtonText>X</DrawerButtonText>
        </DrawerButton>
        <StatusBarText>HomePage</StatusBarText>
      </StatusBar>

      <GestureRecognizer
        config={config}
        onSwipe={direction => onSwipe(direction)}
      >
        <BigTextContainer showError={showError}>
          <BigTextDisplay operator={operator}>{bigText || 0}</BigTextDisplay>

          {showError && <ErrorTextDisplay>Please insert a value.</ErrorTextDisplay>}
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

      <AddExpenseModal
        onBackdropPress={() => setShowModal(false)}
        modal={showModal}
        value={bigText}
        isAdding={operator === "+"}
        handleSubmit={handleSubmit}
        loading={loading}
        setDescription={setDescription}
        description={description}
      />
    </Container>
  )
}

export default MainPage
