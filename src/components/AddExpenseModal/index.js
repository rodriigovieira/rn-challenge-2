import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  Animated,
  Text
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
  ConfirmButtonText,
  TitleTextInput
} from "./styles"

import AnimatedInput from "~/components/AnimatedInput"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },

  errorContainer: {
    marginBottom: 20,
    alignItems: "center"
  },

  errorText: {
    textAlign: "center",
    color: "rgba(196,0,2,1)",
    fontSize: 14
  }
})

const AddExpenseModal = ({
  value, isAdding, navigation, setModal, setBigText
}) => {
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")

  const [showPlusColor, setShowPlusColor] = useState(isAdding)
  const [showMinusColor, setShowMinusColor] = useState(!isAdding)

  const [errorEmpty, setErrorEmpty] = React.useState(false)

  const [isTitleActive, setIsTitleActive] = React.useState(false)
  const [isDescriptionActive, setIsDescriptionActive] = React.useState(false)

  const [animationTitle] = React.useState(new Animated.Value(title.length === 0 ? 0 : 1))
  const [animationDescription] = React.useState(
    new Animated.Value(description.length === 0 ? 0 : 1)
  )
  const [animationValue] = React.useState(new Animated.Value(0))

  const color = showMinusColor ? "rgba(231, 76, 60, 1)" : "rgba(120,156,70,1)"

  React.useEffect(() => {
    Animated.timing(animationTitle, {
      toValue: isTitleActive || title.length > 0 ? 1 : 0,
      duration: 200
    }).start()

    Animated.timing(animationDescription, {
      toValue: isDescriptionActive || description.length > 0 ? 1 : 0,
      duration: 200
    }).start()
  })

  React.useEffect(() => {
    Animated.timing(animationValue, {
      toValue: showPlusColor ? 0 : 1,
      duration: 400
    }).start()
  }, [showPlusColor, showMinusColor])

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
    if (!description || !title) {
      setErrorEmpty(true)

      return
    }

    createExpenseFunction({
      variables: {
        value: parseFloat(value),
        description,
        type: isAdding ? "POSITIVE" : "NEGATIVE",
        name: title
      }
    })
      .then(() => {
        setBigText("")
        navigation.navigate("ExpensesPage")

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
              <ActivityIndicator size="large" color="rgba(73, 110, 239, 1)" />
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
                <AnimatedInput
                  color={color}
                  textValue="Expense Title"
                  animationStatus={animationTitle}
                  left="0%"
                >
                  <TitleTextInput
                    onFocus={() => setIsTitleActive(true)}
                    style={{
                      borderBottomColor: isTitleActive ? color : "rgba(0,0,0,.4)",
                      borderBottomWidth: 1
                    }}
                    onBlur={() => setIsTitleActive(false)}
                    value={title}
                    onChangeText={setTitle}
                  />
                </AnimatedInput>
                <AnimatedInput
                  textValue="Description goes here"
                  color={color}
                  animationStatus={animationDescription}
                  left="0%"
                >
                  <DescriptionTextInput
                    onFocus={() => setIsDescriptionActive(true)}
                    style={{
                      borderBottomColor: isDescriptionActive ? color : "rgba(0,0,0,.4)",
                      borderBottomWidth: 1
                    }}
                    onBlur={() => setIsDescriptionActive(false)}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                  />
                </AnimatedInput>
              </DescriptionContainer>

              {errorEmpty && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>ERROR! You need to fill all fields.</Text>
                </View>
              )}

              <ValueContainer isAdding={showPlusColor}>
                {/* <ValueText> */}
                <Animated.Text
                  style={{
                    fontSize: animationValue.interpolate({
                      inputRange: [0, 0.3, 0.7, 1],
                      outputRange: [30, 18, 50, 30]
                    }),
                    fontWeight: "bold",
                    color: animationValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["rgba(120,156,70,1)", "rgba(231, 76, 60, 1)"]
                    })
                  }}
                >
                  {`$${value}`}
                </Animated.Text>
                {/* </ValueText> */}
              </ValueContainer>

              <ConfirmButton color={color} onPress={() => handleCreate(createExpenseFunction)}>
                {loading ? (
                  <ActivityIndicator size="large" color="rgba(73, 110, 239, 1)" />
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
