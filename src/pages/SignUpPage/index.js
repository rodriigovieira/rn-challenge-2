import React from "react"
import PropTypes from "prop-types"
import gql from "graphql-tag"

import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ActivityIndicator,
  StyleSheet,
  Text
} from "react-native"
import { Mutation } from "react-apollo"

import AsyncStorage from "@react-native-community/async-storage"
import {
  Container,
  TitleContainer,
  TitleText,
  SignUpFormContainer,
  UsernameInput,
  PasswordInput,
  SignUpButtonContainer,
  SignUpButton,
  SignUpButtonText,
  ActionsContainer,
  LoginPageButton,
  LoginPageButtonText
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
  }
})

const SignUpPage = ({ navigation }) => {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [passwordConfirm, setPasswordConfirm] = React.useState("")

  const [errorMatch, setErrorMatch] = React.useState(false)
  const [errorEmpty, setErrorEmpty] = React.useState(false)
  const [errorSize, setErrorSize] = React.useState(false)

  const handleSignUp = (signUpFunction) => {
    setErrorEmpty(false)
    setErrorMatch(false)
    setErrorSize(false)

    if (!name || !email || !password || !passwordConfirm) {
      setErrorEmpty(true)

      return
    }

    if (password.length < 8) {
      setErrorSize(true)

      return
    }

    if (password !== passwordConfirm) {
      setErrorMatch(true)

      return
    }

    signUpFunction({
      variables: {
        email: email.trim().toLowerCase(),
        password,
        name: name.trim()
      }
    }).then(async ({ data: { createUser: { token } } }) => {
      await AsyncStorage.setItem("@token", token)

      navigation.navigate("User")
    })
  }

  return (
    <Mutation
      mutation={gql`
        mutation CREATE_USER($email: String!, $password: String!, $name: String!) {
          createUser(data: { email: $email, password: $password, name: $name }) {
            token
            user {
              id
            }
          }
        }
      `}
    >
      {(signUpFunction, { loading, error: errorOperation }) => {
        if (loading) {
          return (
            <View style={styles.container}>
              <ActivityIndicator size="large" />
            </View>
          )
        }

        return (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Container>
              <TitleContainer>
                <TitleText>Sign Up</TitleText>
              </TitleContainer>

              {errorOperation && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>This email is already being used.</Text>
                </View>
              )}

              {errorEmpty && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>You have to fill all fields.</Text>
                </View>
              )}

              {errorMatch && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>Your passwords do not match.</Text>
                </View>
              )}

              {errorSize && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>Your password must be at least 8 characters.</Text>
                </View>
              )}

              <SignUpFormContainer>
                <UsernameInput
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Your email"
                />

                <UsernameInput value={name} onChangeText={setName} placeholder="Your name" />

                <PasswordInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholder="Password"
                />

                <PasswordInput
                  value={passwordConfirm}
                  onChangeText={setPasswordConfirm}
                  secureTextEntry
                  placeholder="Confirm Password"
                />
              </SignUpFormContainer>

              <SignUpButtonContainer>
                <SignUpButton onPress={() => handleSignUp(signUpFunction)}>
                  <SignUpButtonText>Create Account</SignUpButtonText>
                </SignUpButton>
              </SignUpButtonContainer>

              <ActionsContainer>
                <LoginPageButton onPress={() => navigation.navigate("WelcomePage")}>
                  <LoginPageButtonText>Return to Login Page</LoginPageButtonText>
                </LoginPageButton>
              </ActionsContainer>
            </Container>
          </TouchableWithoutFeedback>
        )
      }}
    </Mutation>
  )
}

SignUpPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

export default SignUpPage
