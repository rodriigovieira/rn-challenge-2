import React from "react"
import PropTypes from "prop-types"
import { ScrollView, FlatList, SafeAreaView } from "react-native"

import Icon from "react-native-vector-icons/FontAwesome"

import {
  ItemButton,
  HeaderIconContainer,
  IconContainer,
  ItemText,
  HeaderContainer,
  TextContainer,
  UserNameText
} from "./styles"

import AppContext from "~/context/AppContext"

const menuData = [
  {
    name: "Add Expense",
    routeName: "MainPage",
    iconName: "plus-square",
    key: "1"
  },
  {
    name: "Expenses List",
    routeName: "ExpensesPage",
    iconName: "list",
    key: "2"
  },
  {
    name: "Informations",
    routeName: "InfoPage",
    iconName: "info-circle",
    key: "3"
  }
]

const DrawerMenu = ({ onItemPress, navigation }) => {
  const activeItemKey = menuData[navigation.state.index].routeName

  const [activeRoute, setActiveRoute] = React.useState(activeItemKey)

  const { state } = React.useContext(AppContext)

  React.useEffect(() => {
    setActiveRoute(activeItemKey)
  }, [activeItemKey])

  return (
    <ScrollView>
      <SafeAreaView>
        <HeaderContainer>
          <HeaderIconContainer>
            <Icon name="user-circle" size={50} />
          </HeaderIconContainer>

          <TextContainer>
            <UserNameText>Hey, {state.name}!</UserNameText>
          </TextContainer>
        </HeaderContainer>

        <FlatList
          data={menuData}
          extraData={activeRoute}
          renderItem={({ item: { name, routeName, iconName } }) => (
            <ItemButton
              isItemActive={activeRoute === routeName}
              onPress={() => {
                setActiveRoute(routeName)

                onItemPress({ route: { routeName } })
              }}
            >
              <IconContainer>
                <Icon
                  color={activeRoute === routeName ? "rgba(37,82,237,1)" : "rgba(0,0,0,.7)"}
                  name={iconName}
                  size={20}
                />
              </IconContainer>

              <ItemText isItemActive={activeRoute === routeName}>{name}</ItemText>
            </ItemButton>
          )}
        />
      </SafeAreaView>
    </ScrollView>
  )
}

DrawerMenu.propTypes = {
  onItemPress: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      index: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
}

export default DrawerMenu
