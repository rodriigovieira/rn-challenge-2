import styled from "styled-components/native"
import { getStatusBarHeight } from "react-native-status-bar-height"
import { Dimensions, Platform } from "react-native"

const statusBarHeight = Platform.OS === "android" ? 0 : Number(getStatusBarHeight())

const screenFraction = Dimensions.get("window").height / 16

export const StatusBar = styled.View`
  border: 0 solid rgba(0, 0, 0, 0.4);
  width: 100%;
  height: ${screenFraction + statusBarHeight};
  padding-top: ${statusBarHeight};
  border-bottom-width: 0.3;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background-color: white;
`

export const TitleContainer = styled.View`
  align-self: center;
  margin: 0 auto;
`

export const StatusBarText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`

export const DrawerButton = styled.TouchableOpacity`
  margin: auto 10px;
  margin-right: auto;
  align-self: flex-start;
`

export const DrawerButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${props => (props.hideFilter ? "white" : "rgba(73, 110, 239, 1)")};
`

export const ExtraButton = styled.TouchableOpacity`
  margin: auto 10px;
  margin-left: auto;
  align-self: flex-end;
`
