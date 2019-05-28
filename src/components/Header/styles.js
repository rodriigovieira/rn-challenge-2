import styled from "styled-components/native"
import { getStatusBarHeight } from "react-native-status-bar-height"

const height = getStatusBarHeight()

export const StatusBar = styled.View`
  border: 0 solid black;
  width: 100%;
  height: ${44 + height};
  padding-top: ${height};
  border-bottom-width: 0.4;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background-color: white;
`

export const StatusBarText = styled.Text`
  margin: 0 auto;
  font-size: 18px;
  font-weight: bold;
`

export const DrawerButton = styled.TouchableOpacity`
  margin: auto 10px;
  align-self: flex-start;
`

export const DrawerButtonText = styled.Text`
  font-size: 18px;
  color: ${props => (props.hideFilter ? "white" : "blue")};
`
