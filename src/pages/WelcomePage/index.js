import React from "react"
import AssyncStorage from "@react-native-community/async-storage"
import gql from "graphql-tag"
import {
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  View,
  StyleSheet,
  Text
} from "react-native"
import { Mutation } from "react-apollo"

import {
  Container,
  TitleContainer,
  TitleText,
  LoginFormContainer,
  UsernameInput,
  PasswordInput,
  LoginButtonContainer,
  LoginButton,
  LoginButtonText,
  ActionsContainer
  // RecoverPasswordButton,
  // RecoverPasswordText,
  // SignUpButton,
  // SignUpText
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

const Welcome = ({ navigation }) => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const [errorPassword, setErrorPassword] = React.useState(false)
  const [errorEmpty, setErrorEmpty] = React.useState(false)

  const handleLogin = (loginFunction) => {
    setErrorPassword(false)
    setErrorEmpty(false)

    if (!email || !password) {
      setErrorEmpty(true)

      return
    }

    loginFunction({
      variables: { email, password }
    })
      .then(({ data }) => {
        if (!data.loginUser.token) {
          setErrorPassword(true)
          return
        }

        AssyncStorage.setItem("@token", data.loginUser.token)
          .then(() => navigation.navigate("User"))
          .catch(() => setErrorPassword(true))
      })
      .catch(e => setErrorPassword(true))
  }

  return (
    <Mutation
      mutation={gql`
        mutation LOGIN_USER($email: String!, $password: String!) {
          loginUser(data: { email: $email, password: $password }) {
            token
            user {
              id
            }
          }
        }
      `}
    >
      {(loginFunction, { err, loading }) => {
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
                <TitleText>Welcome!</TitleText>
              </TitleContainer>

              {errorEmpty && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>You have to fill all fields.</Text>
                </View>
              )}

              {errorPassword && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>Invalid username or password.</Text>
                </View>
              )}

              <LoginFormContainer>
                <UsernameInput
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Login"
                />

                <PasswordInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholder="Password"
                />
              </LoginFormContainer>

              <LoginButtonContainer>
                <LoginButton onPress={() => handleLogin(loginFunction)}>
                  <LoginButtonText>Login</LoginButtonText>
                </LoginButton>
              </LoginButtonContainer>

              <ActionsContainer>
                {/* <RecoverPasswordButton>
          <RecoverPasswordText>Recover Password</RecoverPasswordText>
          </RecoverPasswordButton>

          <SignUpButton>
          <SignUpText>No account? Sign up!</SignUpText>
        </SignUpButton> */}
              </ActionsContainer>
            </Container>
          </TouchableWithoutFeedback>
        )
      }}
    </Mutation>
  )
}

export default Welcome
