import React from "react"
import PropTypes from "prop-types"
import gql from "graphql-tag"

import { Mutation } from "react-apollo"
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native"

import {
  Container,
  TitleContainer,
  TitleText,
  RecoverFormContainer,
  EmailInput,
  RecoverButtonContainer,
  RecoverButton,
  RecoverButtonText,
  ActionsContainer,
  ReturnHomePageButton,
  ReturnHomePageButtonText
} from "./styles"

import AnimatedInput from "~/components/AnimatedInput"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "80%"
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

const RecoverPage = ({ navigation }) => {
  const [email, setEmail] = React.useState("")

  const [showMessage, setShowMessage] = React.useState(false)
  const [invalidError, setInvalidError] = React.useState(false)
  const [emptyError, setEmptyError] = React.useState(false)

  const [isRecoverActive, setIsRecoverActive] = React.useState(false)
  const [animation] = React.useState(new Animated.Value(email.length === 0 ? 0 : 1))

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: (isRecoverActive || email.length > 0) ? 1 : 0,
      duration: 200
    }).start()
  })

  const handleRecover = (recoverFunction) => {
    setEmptyError(false)
    setShowMessage(false)
    setInvalidError(false)

    if (!email) {
      setEmptyError(true)

      return
    }

    recoverFunction({
      variables: {
        email: email.trim().toLowerCase()
      }
    })
      .then(() => setShowMessage(true))
      .catch(() => setInvalidError(true))
  }

  return (
    <Mutation
      mutation={gql`
        mutation TRIGGER_PASSWORD_RESET($email: String!) {
          triggerPasswordReset(email: $email)
        }
      `}
    >
      {(recoverFunction, { loading, err: requestError }) => {
        if (loading) {
          return (
            <View style={styles.container}>
              <ActivityIndicator size="large" color="rgba(73, 110, 239, 1)" />
            </View>
          )
        }
        return (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Container>
              <TitleContainer>
                <TitleText>Recover Password</TitleText>
              </TitleContainer>

              {emptyError && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>You have to provide an email.</Text>
                </View>
              )}

              {(invalidError || requestError) && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>There is no account with the provided email.</Text>
                </View>
              )}

              {showMessage && (
                <View style={styles.errorContainer}>
                  <Text style={styles.successText}>
                    An email wast sent with instructions on how to proceed.
                  </Text>
                </View>
              )}

              <RecoverFormContainer>
                <AnimatedInput textValue="Type your account email here" animationStatus={animation}>
                  <EmailInput
                    autoCapitalize="none"
                    style={{
                      borderBottomColor: isRecoverActive
                        ? "rgba(73, 110, 239, 1)"
                        : "rgba(0,0,0,.4)",
                      borderBottomWidth: 1
                    }}
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setIsRecoverActive(true)}
                    onBlur={() => setIsRecoverActive(false)}
                  />
                </AnimatedInput>
              </RecoverFormContainer>

              <RecoverButtonContainer>
                <RecoverButton onPress={() => handleRecover(recoverFunction)}>
                  <RecoverButtonText>Recover Password</RecoverButtonText>
                </RecoverButton>
              </RecoverButtonContainer>

              <ActionsContainer>
                <ReturnHomePageButton onPress={() => navigation.navigate("WelcomePage")}>
                  <ReturnHomePageButtonText>Return to Login Page</ReturnHomePageButtonText>
                </ReturnHomePageButton>
              </ActionsContainer>
            </Container>
          </TouchableWithoutFeedback>
        )
      }}
    </Mutation>
  )
}

RecoverPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

export default RecoverPage
