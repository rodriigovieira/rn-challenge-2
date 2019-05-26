import styled from "styled-components"
import { getStatusBarHeight } from "react-native-status-bar-height"

const height = getStatusBarHeight()

export const Container = styled.View`
  align-items: center;
  flex: 1;
`

export const StatusBar = styled.View`
  border: 0 solid black;
  width: 100%;
  height: ${44 + height};
  padding-top: ${height};
  border-bottom-width: 0.4;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`

export const StatusBarText = styled.Text`
  margin: 0 auto;
  font-size: 18px;
  font-weight: bold;
`

export const DrawerButton = styled.TouchableOpacity`
  margin: auto 0;
  margin-left: 10px;
  align-self: flex-start;
`

export const DrawerButtonText = styled.Text`
  font-size: 18px;
  color: blue;
`

export const BigTextContainer = styled.View`
  margin: ${props => (props.showError ? "72px 0" : "80px 0")};
  text-align: center;
  align-items: center;
`

export const BigTextDisplay = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: ${(props) => {
    if (props.operator === "+") return "green"
    if (props.operator === "-") return "red"
    return "black"
  }};
`

export const ErrorTextDisplay = styled.Text`
  color: red;
  font-size: 14px;
`

export const ButtonsContainer = styled.View`
  border: 1px solid rgba(0, 0, 0, 0.6);
  width: 100%;
  justify-content: flex-end;
`

export const OperatorsContainer = styled.View`
  flex-direction: row;
  width: 100%;
`

export const OperatorButton = styled.TouchableOpacity`
  width: 50%;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.6);
  height: 67px;
  align-items: center;
  justify-content: center;
`

export const OperatorButtonText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: ${props => props.color};
`

export const NumbersContainer = styled.View`
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
`

export const NumberButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.6);
  width: 33%;
  height: 67px;
`

export const NumberButtonText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`

export const ConfirmButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
`

export const ConfirmButton = styled.TouchableOpacity`
  width: 50%;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.6);
`

export const ConfirmButtonText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 16px;
  color: ${(props) => {
    if (props.operator === "+") return "green"
    if (props.operator === "-") return "red"
    return "black"
  }};
`