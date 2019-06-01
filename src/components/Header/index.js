import React from "react"
import PropTypes from "prop-types"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import IconFont from "react-native-vector-icons/FontAwesome"
import AssyncStorage from "@react-native-community/async-storage"
import { Alert } from "react-native"

import {
  StatusBar, StatusBarText, DrawerButton, ExtraButton, TitleContainer
} from "./styles"

const Header = ({ navigation, hideFilter, title }) => (
  <StatusBar>
    <DrawerButton onPress={() => navigation.openDrawer()}>
      <IconFont name="bars" size={26} />
    </DrawerButton>

    <TitleContainer>
      <StatusBarText>{title}</StatusBarText>
    </TitleContainer>

    <ExtraButton
      onPress={() => {
        Alert.alert("Confirmation", "Are you sure you want to logout?", [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Logout",
            style: "destructive",
            onPress: () => {
              AssyncStorage.clear()

              navigation.navigate("WelcomePage")
            }
          }
        ])
      }}
    >
      <Icon name="logout" size={26} />
    </ExtraButton>
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
