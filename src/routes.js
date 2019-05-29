import { createAppContainer, createDrawerNavigator, createSwitchNavigator } from "react-navigation"

import MainPage from "~/pages/MainPage"
import ExpensesPage from "~/pages/ExpensesPage"

import WelcomePage from "~/pages/WelcomePage"
import SignUpPage from "~/pages/SignUpPage"
import RecoverPage from "~/pages/RecoverPage"
import NewPasswordPage from "~/pages/NewPasswordPage"

const Routes = (userLogged = false) => createAppContainer(
  createSwitchNavigator(
    {
      WelcomePage,
      SignUpPage,
      RecoverPage,
      NewPasswordPage,
      User: createDrawerNavigator(
        {
          MainPage,
          ExpensesPage
        },
        {
          navigationOptions: {
            title: "App"
          }
        }
      )
    },
    { initialRouteName: userLogged ? "User" : "WelcomePage" }
  )
)

export default Routes
