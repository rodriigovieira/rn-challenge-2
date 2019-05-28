import styled from "styled-components/native"

export const ExpenseContainer = styled.View`
  background-color: lightgray;
  align-items: center;
  justify-content: center;
`

export const ExpenseButton = styled.TouchableOpacity`
min-height: 80px;
  padding: 10px;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  border: 0 solid black;
  border-top-width: .5px;
  border-bottom-width: 1px;
  background-color: white;
`

export const ExpenseValueText = styled.Text`
  color: ${props => props.color};
  font-size: 24px;
  font-weight: bold;
`

export const DescriptionText = styled.Text`
  font-size: 14px;
  color: black;
`
