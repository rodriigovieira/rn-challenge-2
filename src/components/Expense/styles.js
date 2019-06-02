import styled from "styled-components/native"

export const ExpenseButton = styled.TouchableOpacity`
  border-radius: 10px;
  min-height: 80px;
  width: 100%;
  padding: 10px;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0;
  background-color: rgba(0, 0, 0, 0.1);
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
