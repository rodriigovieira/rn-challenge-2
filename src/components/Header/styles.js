import styled from "styled-components/native"
import { getStatusBarHeight } from "react-native-status-bar-height"

const height = getStatusBarHeight()

export const StatusBar = styled.View`
  border: 0 solid rgba(0, 0, 0, 0.4);
  width: 100%;
  height: ${44 + height};
  padding-top: ${height};
  border-bottom-width: 0.3;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background-color: white;
`

export const StatusBarText = styled.Text`
  margin: 0 auto;
  font-size: 16px;
  font-weight: bold;
`

export const DrawerButton = styled.TouchableOpacity`
  margin: auto 10px;
  align-self: flex-start;
`

export const DrawerButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${props => (props.hideFilter ? "white" : "rgba(73, 110, 239, 1)")};
`
