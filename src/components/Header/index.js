import React from "react"
import PropTypes from "prop-types"
import Icon from 'react-native-vector-icons/FontAwesome'

import {
  StatusBar, StatusBarText, DrawerButton, DrawerButtonText
} from "./styles"

// eslint-disable-next-line react/prop-types
const Header = ({ navigation, hideFilter, title }) => (
  <StatusBar>
    <DrawerButton onPress={() => navigation.openDrawer()}>
      <Icon name="bars" size={20} />
    </DrawerButton>

    <StatusBarText>{title}</StatusBarText>

    <DrawerButton onPress={!hideFilter ? () => navigation.openDrawer() : () => {}}>
      <DrawerButtonText hideFilter={hideFilter}>Filter</DrawerButtonText>
    </DrawerButton>
  </StatusBar>
)

Header.propTypes = {
  hideFilter: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
}

export default Header
