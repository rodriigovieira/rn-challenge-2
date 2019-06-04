import styled from "styled-components/native"
import { Dimensions } from "react-native"

const { height } = Dimensions.get("window")

const Container = styled.View`
  align-items: center;
`

const ContentContainer = styled.View`
  justify-content: flex-start;
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
  align-items: center;
  justify-content: space-between;
  height: 20%;
`

const ExpensesTextContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 60px;
`

const ExpenseTypeText = styled.Text`
  font-size: 20px;
`

const ButtonsContainer = styled.View`
  border: 1px solid black;
  border-radius: 15px;
  flex-direction: row;
  overflow: hidden;
  height: 75%;
  width: 40%;
  min-width: 120px;
`

const OperatorButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding-top: auto;
  background-color: ${(props) => {
    if (props.showPlusColor) return "rgba(120,156,70,1)"
    if (props.showMinusColor) return "rgba(231, 76, 60, 1)"

    return "white"
  }};
  overflow: hidden;
  width: 50%;
`

const OperatorButtonText = styled.Text`
  margin: 5%;
  font-size: 30px;
  font-weight: bold;
  color: black;
`

const Divider = styled.View`
  height: 100%;
  width: 3px;
  background-color: rgba(0, 0, 0, 0.8);
`

const ConfirmButton = styled.TouchableOpacity`
  margin-top: 5%;
  border-radius: 5px;
  width: 90%;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
  margin-bottom: 15px;
`

const ConfirmButtonText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
`

export const DescriptionContainer = styled.View`
  margin: 10px;
  width: 90%;
  align-items: center;
  justify-content: center;
`

export const DescriptionTextInput = styled.TextInput`
  padding: 3px 0;
  margin: 3%;
  width: 100%;
  font-size: 22px;
  margin-bottom: 3%;
`

export const ExpenseValueTextInput = styled.TextInput`
  font-size: 22px;
  color: ${props => props.color};
  border: 0px solid ${props => props.color};
  border-bottom-width: 1px;
  width: 150px;
  margin-bottom: 3%;
`

export {
  Container,
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
  ConfirmButton,
  ConfirmButtonText
}
