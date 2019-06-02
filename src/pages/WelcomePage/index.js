import React from "react"
import AssyncStorage from "@react-native-community/async-storage"
import gql from "graphql-tag"
import PropTypes from "prop-types"

import {
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  Linking,
  Platform,
  Animated
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
  ActionsContainer,
  RecoverPasswordButton,
  RecoverPasswordText,
  SignUpButton,
  SignUpText
} from "./styles"

import AnimatedInput from "~/components/AnimatedInput"
import AppContext from "~/context/AppContext"

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

const Welcome = ({ navigation }) => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const [animationLogin] = React.useState(new Animated.Value(email.length === 0 ? 0 : 1))
  const [animationPassword] = React.useState(new Animated.Value(password.length === 0 ? 0 : 1))

  const [errorPassword, setErrorPassword] = React.useState(false)
  const [errorEmpty, setErrorEmpty] = React.useState(false)

  const [isLoginActive, setIsLoginActive] = React.useState(false)
  const [isPasswordActive, setIsPasswordActive] = React.useState(false)

  const { dispatch } = React.useContext(AppContext)

  const passwordChanged = navigation.getParam("passwordChanged")

  React.useEffect(() => {
    Animated.timing(animationLogin, {
      toValue: isLoginActive || email.length > 0 ? 1 : 0,
      duration: 200
    }).start()

    Animated.timing(animationPassword, {
      toValue: isPasswordActive || password.length > 0 ? 1 : 0,
      duration: 200
    }).start()
  })

  const navigate = (url) => {
    if (url.includes("recover")) {
      const token = url.replace("expenses-rn-app://recover/", "")

      navigation.navigate("NewPasswordPage", { token })
    }
  }

  const handleOpenURL = (event) => {
    navigate(event.url)
  }

  React.useEffect(() => {
    if (Platform.OS === "android") {
      Linking.getInitialURL().then((url) => {
        this.navigate(url)
      })
    } else {
      Linking.addEventListener("url", handleOpenURL)
    }
  }, [])

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

        AssyncStorage.setItem("@token", data.loginUser.token).then(() => {
          navigation.navigate("User")

          dispatch({
            type: "SET_USER_NAME",
            name: data.loginUser.user.name
          })
        })
      })
      .catch(() => setErrorPassword(true))
  }

  return (
    <Mutation
      mutation={gql`
        mutation LOGIN_USER($email: String!, $password: String!) {
          loginUser(data: { email: $email, password: $password }) {
            token
            user {
              id
              name
              email
            }
          }
        }
      `}
    >
      {(loginFunction, { loading }) => {
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

              {passwordChanged && (
                <View style={styles.errorContainer}>
                  <Text style={styles.successText}>Your password was changed successfully..</Text>
                </View>
              )}

              <LoginFormContainer>
                <AnimatedInput textValue="Your email" animationStatus={animationLogin}>
                  <UsernameInput
                    autoFocus
                    style={{
                      borderBottomColor: isLoginActive ? "rgba(73, 110, 239, 1)" : "rgba(0,0,0,.4)",
                      borderBottomWidth: 1
                    }}
                    onFocus={() => setIsLoginActive(true)}
                    onBlur={() => setIsLoginActive(false)}
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </AnimatedInput>

                <AnimatedInput textValue="Your password" animationStatus={animationPassword}>
                  <PasswordInput
                    style={{
                      borderBottomColor: isPasswordActive
                        ? "rgba(73, 110, 239, 1)"
                        : "rgba(0,0,0,.4)",
                      borderBottomWidth: 1
                    }}
                    onFocus={() => setIsPasswordActive(true)}
                    onBlur={() => setIsPasswordActive(false)}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </AnimatedInput>
              </LoginFormContainer>

              <LoginButtonContainer>
                <LoginButton onPress={() => handleLogin(loginFunction)}>
                  <LoginButtonText>Login</LoginButtonText>
                </LoginButton>
              </LoginButtonContainer>

              <ActionsContainer>
                <RecoverPasswordButton onPress={() => navigation.navigate("RecoverPage")}>
                  <RecoverPasswordText>Recover Password</RecoverPasswordText>
                </RecoverPasswordButton>

                <SignUpButton onPress={() => navigation.navigate("SignUpPage")}>
                  <SignUpText>No account? Sign up!</SignUpText>
                </SignUpButton>
              </ActionsContainer>
            </Container>
          </TouchableWithoutFeedback>
        )
      }}
    </Mutation>
  )
}

Welcome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

export default Welcome
