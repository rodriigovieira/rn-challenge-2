import styled from "styled-components/native"
import { Dimensions } from "react-native"

const { height } = Dimensions.get("window")

const ContentContainer = styled.View`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 1);
  height: ${height * 0.7};
`

const ModalTitle = styled.View`
  margin: 15px;
  text-align: center;
`

const ModalTitleText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`

const ExpenseTypeContainer = styled.View`
  width: 90%;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  flex-direction: row;
  justify-content: space-between;
`

const ExpensesTextContainer = styled.View`
  justify-content: center;
  width: 50px;
`

const ExpenseTypeText = styled.Text`
  font-size: 20px;
`

const ButtonsContainer = styled.View`
  border: 1px solid black;
  border-radius: 15px;
  flex-direction: row;
  overflow: hidden;
  width: 40%;
  min-width: 120px;
`

const OperatorButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 50%;
  background-color: ${(props) => {
    if (props.showPlusColor) return "rgba(120,156,70,1)"
    if (props.showMinusColor) return "rgba(231, 76, 60, 1)"

    return "white"
  }};
  overflow: hidden;
`

const OperatorButtonText = styled.Text`
  font-size: 30px;
  margin: 9%;
  font-weight: bold;
  color: black;
`

const Divider = styled.View`
  height: 100%;
  width: 3px;
  background-color: rgba(0, 0, 0, 0.8);
`

const ValueContainer = styled.View`
  text-align: center;
  margin-bottom: 50px;
  margin-top: 10px;
`

const ValueText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: ${props => props.color};
`

const ConfirmButton = styled.TouchableOpacity`
  border-radius: 5px;
  width: 90%;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
  margin-bottom: 10px;
  margin-top: auto;
`

const ConfirmButtonText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
`

export const DescriptionContainer = styled.View`
  margin: 20px;
  width: 90%;
  align-items: center;
  justify-content: center;
  padding: 3px;
`

export const DescriptionTextInput = styled.TextInput`
  font-size: 18px;
  padding-top: 5px;
  padding-bottom: 2px;
  margin: 12px 0;
  width: 100%;
  margin-bottom: 5%;
`

export const TitleTextInput = styled(DescriptionTextInput)``

export {
  ContentContainer,
  ModalTitle,
  ModalTitleText,
  ExpenseTypeContainer,
  ExpensesTextContainer,
  ExpenseTypeText,
  ButtonsContainer,
  OperatorButton,
  OperatorButtonText,
  Divider,
  ValueContainer,
  ValueText,
  ConfirmButton,
  ConfirmButtonText
}
