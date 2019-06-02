import styled from "styled-components/native"

import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

const isIphoneX = height === 812 || height === 896

export const Container = styled.View`
  align-items: center;
  flex: 1;
`

export const BigTextContainer = styled.View`
  text-align: center;
  justify-content: center;
  align-items: center;
  height: ${height / 3};
  width: ${width};
`

export const BigTextDisplay = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: ${(props) => {
    if (props.operator === "-") return "rgba(231, 76, 60, 1)"

    return "rgba(120,156,70,1)"
  }};
`

export const ErrorTextDisplay = styled.Text`
  color: rgba(231, 76, 60, 1);
  font-size: 14px;
`

export const ButtonsContainer = styled.View`
  height: ${height / 7};
  min-height: 60%;
  margin-top: auto;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: ${isIphoneX ? "40px" : 0};
`

export const OperatorsContainer = styled.View`
  flex-direction: row;
  width: 100%;
`

export const OperatorButton = styled.TouchableOpacity`
  width: 50%;
  background-color: white;
  border: 1px solid black;
  align-items: center;
  justify-content: center;
`

export const OperatorButtonText = styled.Text`
  margin: 8%;
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
  border: 1px solid black;
  width: 33.333%;
`

export const NumberButtonText = styled.Text`
  margin: 8%;
  font-size: 30px;
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
  border: 1px solid black;
`

export const ConfirmButtonText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 8%;
  color: ${(props) => {
    if (props.operator === "+") return "rgba(120,156,70,1)"
    if (props.operator === "-") return "rgba(231, 76, 60, 1)"
    return "black"
  }};
`
