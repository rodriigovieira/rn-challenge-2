import React from "react"
import PropTypes from "prop-types"
import gql from "graphql-tag"
import AsyncStorage from "@react-native-community/async-storage"

import { Mutation } from "react-apollo"
import {
  View, ActivityIndicator, StyleSheet, Text, Alert
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

const RecoverPage = ({ navigation }) => {
  const [password, setPassword] = React.useState("")
  const [passwordConfirm, setPasswordConfirm] = React.useState("")

  const [loading, setLoading] = React.useState(false)
  const [showMessage, setShowMessage] = React.useState(false)
  const [invalidError, setInvalidError] = React.useState(false)
  const [emptyError, setEmptyError] = React.useState(false)
  const [matchError, setMatchError] = React.useState(false)

  const token = navigation.getParam("token")

  React.useEffect(() => {
    setLoading(true)

    const setToken = async () => {
      await AsyncStorage.setItem("@token", token)

      setLoading(false)
    }

    setToken()
  }, [])

  const handleCancel = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to cancel? You might have to request a new link to change your password.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Confirm",
          style: "destructive",
          onPress: () => navigation.navigate("WelcomePage")
        }
      ]
    )
  }

  const handleReset = (resetFunction) => {
    setEmptyError(false)
    setShowMessage(false)
    setInvalidError(false)

    if (!password || !passwordConfirm) {
      setEmptyError(true)

      return
    }

    if (password !== passwordConfirm) {
      setMatchError(true)

      return
    }

    resetFunction({ variables: { password } })
      .then(() => navigation.navigate("WelcomePage", {
        passwordChanged: true
      }))
      .catch(() => setInvalidError(true))
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <Mutation
      mutation={gql`
        mutation RESET_PASSWORD($password: String!) {
          resetPassword(password: $password) {
            id
          }
        }
      `}
    >
      {(resetFunction, { loading: requestLoading, err: requestError }) => {
        if (requestLoading) {
          return (
            <View style={styles.container}>
              <ActivityIndicator size="large" />
            </View>
          )
        }

        return (
          <Container>
            <TitleContainer>
              <TitleText>Recover Password</TitleText>
            </TitleContainer>

            {emptyError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>You have to provide an email.</Text>
              </View>
            )}

            {matchError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Your passwords do not match.</Text>
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
              <EmailInput
                placeholder="Type your new password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <EmailInput
                placeholder="Confirm your new password"
                secureTextEntry
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
              />
            </RecoverFormContainer>

            <RecoverButtonContainer>
              <RecoverButton onPress={() => handleReset(resetFunction)}>
                <RecoverButtonText>Change Password</RecoverButtonText>
              </RecoverButton>
            </RecoverButtonContainer>

            <ActionsContainer>
              <ReturnHomePageButton onPress={handleCancel}>
                <ReturnHomePageButtonText>Return to Login Page</ReturnHomePageButtonText>
              </ReturnHomePageButton>
            </ActionsContainer>
          </Container>
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
