import React from "react"
import PropTypes from "prop-types"
import gql from "graphql-tag"

import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Animated
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

  const [isNameActive, setIsNameActive] = React.useState(false)
  const [isLoginActive, setIsLoginActive] = React.useState(false)
  const [isPasswordActive, setIsPasswordActive] = React.useState(false)
  const [isPasswordConfirmActive, setIsPasswordConfirmActive] = React.useState(false)

  const [animationName] = React.useState(new Animated.Value(name.length === 0 ? 0 : 1))
  const [animationLogin] = React.useState(new Animated.Value(email.length === 0 ? 0 : 1))
  const [animationPassword] = React.useState(new Animated.Value(password.length === 0 ? 0 : 1))
  const [animationPasswordConfirm] = React.useState(
    new Animated.Value(passwordConfirm.length === 0 ? 0 : 1)
  )

  React.useEffect(() => {
    Animated.timing(animationName, {
      toValue: isNameActive || name.length > 0 ? 1 : 0,
      duration: 200
    }).start()

    Animated.timing(animationLogin, {
      toValue: isLoginActive || email.length > 0 ? 1 : 0,
      duration: 200
    }).start()

    Animated.timing(animationPassword, {
      toValue: isPasswordActive || password.length > 0 ? 1 : 0,
      duration: 200
    }).start()

    Animated.timing(animationPasswordConfirm, {
      toValue: (isPasswordConfirmActive || passwordConfirm.length > 0) ? 1 : 0,
      duration: 200
    }).start()
  })

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
              <ActivityIndicator size="large" color="rgba(73, 110, 239, 1)" />
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
                <AnimatedInput textValue="Your email" animationStatus={animationLogin}>
                  <UsernameInput
                    autoCapitalize="none"
                    onFocus={() => setIsLoginActive(true)}
                    onBlur={() => setIsLoginActive(false)}
                    style={{
                      borderBottomColor: isLoginActive ? "rgba(73, 110, 239, 1)" : "rgba(0,0,0,.4)",
                      borderBottomWidth: 1
                    }}
                    value={email}
                    onChangeText={setEmail}
                  />
                </AnimatedInput>

                <AnimatedInput textValue="Your name" animationStatus={animationName}>
                  <UsernameInput
                    style={{
                      borderBottomColor: isNameActive ? "rgba(73, 110, 239, 1)" : "rgba(0,0,0,.4)",
                      borderBottomWidth: 1
                    }}
                    value={name}
                    onFocus={() => setIsNameActive(true)}
                    onBlur={() => setIsNameActive(false)}
                    onChangeText={setName}
                  />
                </AnimatedInput>

                <AnimatedInput textValue="Password" animationStatus={animationPassword}>
                  <PasswordInput
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setIsPasswordActive(true)}
                    onBlur={() => setIsPasswordActive(false)}
                    secureTextEntry
                    textContentType="none"
                    style={{
                      borderBottomColor: isPasswordActive
                        ? "rgba(73, 110, 239, 1)"
                        : "rgba(0,0,0,.4)",
                      borderBottomWidth: 1
                    }}
                  />
                </AnimatedInput>

                <AnimatedInput
                  textValue="Confirm Password"
                  animationStatus={animationPasswordConfirm}
                >
                  <PasswordInput
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                    onFocus={() => setIsPasswordConfirmActive(true)}
                    onBlur={() => setIsPasswordConfirmActive(false)}
                    style={{
                      borderBottomColor: isPasswordConfirmActive
                        ? "rgba(73, 110, 239, 1)"
                        : "rgba(0,0,0,.4)",
                      borderBottomWidth: 1
                    }}
                    secureTextEntry
                  />
                </AnimatedInput>
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
