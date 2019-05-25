import { createAppContainer, createDrawerNavigator } from "react-navigation"

import MainPage from "~/pages/MainPage"
import ExpensesPage from "~/pages/ExpensesPage"

const Routes = createAppContainer(
  createDrawerNavigator(
    { MainPage, ExpensesPage },
    {
      navigationOptions: {
        title: "App"
      }
    }
  )
)

export default Routes
