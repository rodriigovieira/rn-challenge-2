import React, { useState } from "react"
import {
  ActivityIndicator,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Animated,
  Platform,
  ScrollView
} from "react-native"
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
  ButtonsContainer,
  OperatorButton,
  OperatorButtonText,
  Divider,
  DescriptionContainer,
  DescriptionTextInput,
  ConfirmButton,
  ConfirmButtonText
} from "./styles"

import AnimatedInput from "~/components/AnimatedInput"

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
    value: propValue, description: propDescription, id, type: propType, name: propName
  },
  modal,
  onBackdropPress,
  setShowModal,
  setModalIndex
}) => {
  const [showPlusColor, setShowPlusColor] = useState(propType === "POSITIVE")
  const [showMinusColor, setShowMinusColor] = useState(propType === "NEGATIVE")

  const [description, setDescription] = useState(propDescription)
  const [title, setTitle] = useState(propName)
  const [value, setValue] = useState(propValue.toString())
  const [type, setType] = useState(propType)

  const [isValueActive, setIsValueActive] = React.useState(false)
  const [isTitleActive, setIsTitleActive] = React.useState(false)
  const [isDescriptionActive, setIsDescriptionActive] = React.useState(false)

  const [animationValue] = React.useState(new Animated.Value(0))
  const [animationTitle] = React.useState(new Animated.Value(0))
  const [animationDescription] = React.useState(new Animated.Value(0))

  React.useEffect(() => {
    Animated.timing(animationValue, {
      toValue: isValueActive || value.length > 0 ? 1 : 0,
      duration: 200
    }).start()

    Animated.timing(animationTitle, {
      toValue: isTitleActive || title.length > 0 ? 1 : 0,
      duration: 200
    }).start()

    Animated.timing(animationDescription, {
      toValue: isDescriptionActive || description.length > 0 ? 1 : 0,
      duration: 200
    }).start()
  })

  const color = showMinusColor ? "rgba(231, 76, 60, 1)" : "rgba(120,156,70,1)"

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
        name: title,
        id
      }
    }).then(() => {
      setModalIndex(-1)

      setShowModal(false)
    })
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
            data: { description: $description, value: $value, type: $type, name: $name }
            id: $id
          ) {
            id
            value
            description
            type
            name
          }
        }
      `}
    >
      {(updateFunction, { loading }) => {
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
              {/* <ScrollView> */}
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "padding"}
                enabled
              >
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

                  <DescriptionContainer color={color}>
                    <AnimatedInput
                      color={color}
                      left="0%"
                      textValue="Value"
                      animationStatus={animationValue}
                    >
                      <DescriptionTextInput
                        keyboardType="numeric"
                        onFocus={() => setIsValueActive(true)}
                        onBlur={() => setIsValueActive(false)}
                        style={{
                          borderBottomColor: isValueActive ? color : "rgba(0,0,0,.4)",
                          borderBottomWidth: 1
                        }}
                        onChangeText={setValue}
                        value={value.toString()}
                      />
                    </AnimatedInput>
                  </DescriptionContainer>

                  <DescriptionContainer color={color}>
                    <AnimatedInput
                      color={color}
                      left="0%"
                      textValue="Title"
                      animationStatus={animationTitle}
                    >
                      <DescriptionTextInput
                        onFocus={() => setIsTitleActive(true)}
                        onBlur={() => setIsTitleActive(false)}
                        style={{
                          borderBottomColor: isTitleActive ? color : "rgba(0,0,0,.4)",
                          borderBottomWidth: 1
                        }}
                        onChangeText={setTitle}
                        multiline
                        value={title}
                      />
                    </AnimatedInput>
                  </DescriptionContainer>

                  <DescriptionContainer color={color}>
                    <AnimatedInput
                      color={color}
                      left="0%"
                      textValue="Description"
                      animationStatus={animationDescription}
                    >
                      <DescriptionTextInput
                        onFocus={() => setIsDescriptionActive(true)}
                        onBlur={() => setIsDescriptionActive(false)}
                        style={{
                          borderBottomColor: isDescriptionActive ? color : "rgba(0,0,0,.4)",
                          borderBottomWidth: 1
                        }}
                        onChangeText={setDescription}
                        multiline
                        value={description}
                      />
                    </AnimatedInput>
                  </DescriptionContainer>

                  <ConfirmButton
                    style={{
                      shadowOffset: { width: 0, height: 0 },
                      shadowColor: "rgba(0,0,0,.2)",
                      shaddowRadius: 15,
                      shadowOpacity: 1
                    }}
                    color={color}
                    onPress={() => handleSubmit(updateFunction)}
                  >
                    {loading ? (
                      <ActivityIndicator size="large" color="black" />
                    ) : (
                      <ConfirmButtonText>CONFIRM</ConfirmButtonText>
                    )}
                  </ConfirmButton>
                </ContentContainer>
              </KeyboardAvoidingView>
              {/* </ScrollView> */}
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
  setShowModal: PropTypes.func.isRequired
}

export default EditExpenseModal
