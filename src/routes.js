import {
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation"

import MainPage from "~/pages/MainPage"
import ExpensesPage from "~/pages/ExpensesPage"
import InfoPage from "~/pages/InfoPage"

import RepoWebViewPage from "~/pages/RepoWebViewPage"

import WelcomePage from "~/pages/WelcomePage"
import SignUpPage from "~/pages/SignUpPage"
import RecoverPage from "~/pages/RecoverPage"
import NewPasswordPage from "~/pages/NewPasswordPage"

import DrawerMenu from "~/components/DrawerMenu"

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
          ExpensesPage,
          InfoPage: createStackNavigator({
            InfoPage,
            RepoWebViewPage
          }, {
            mode: "modal"
          })
        },
        {
          contentComponent: DrawerMenu
        }
      )
    },
    { initialRouteName: userLogged ? "User" : "WelcomePage" }
  )
)

export default Routes
