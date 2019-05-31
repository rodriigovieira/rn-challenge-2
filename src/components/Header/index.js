import React from "react"
import PropTypes from "prop-types"
import Icon from "react-native-vector-icons/FontAwesome"
import AssyncStorage from "@react-native-community/async-storage"

import {
  StatusBar, StatusBarText, DrawerButton, DrawerButtonText
} from "./styles"

const Header = ({ navigation, hideFilter, title }) => (
  <StatusBar>
    <DrawerButton onPress={() => navigation.openDrawer()}>
      <Icon name="bars" size={20} />
    </DrawerButton>

    <StatusBarText>{title}</StatusBarText>

    <DrawerButton
      onPress={
        !hideFilter
          ? () => {
            AssyncStorage.removeItem("@token")
            navigation.navigate("WelcomePage")
          }
          : () => {}
      }
    >
      <DrawerButtonText hideFilter={hideFilter}>Logout</DrawerButtonText>
    </DrawerButton>
  </StatusBar>
)

Header.propTypes = {
  hideFilter: PropTypes.bool,
  title: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired
  }).isRequired
}

Header.defaultProps = {
  hideFilter: false
}

export default Header
