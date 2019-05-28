import { createAppContainer, createDrawerNavigator, createSwitchNavigator } from "react-navigation"

import MainPage from "~/pages/MainPage"
import ExpensesPage from "~/pages/ExpensesPage"

import WelcomePage from "~/pages/WelcomePage"

const Routes = (userLogged = false) => createAppContainer(
  createSwitchNavigator(
    {
      WelcomePage,
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
