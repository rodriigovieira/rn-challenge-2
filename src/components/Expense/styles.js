import styled from "styled-components"

export const ExpenseContainer = styled.TouchableOpacity`
  height: 90px;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.7);
  box-shadow: 1px 0.4px 0.4px rgba(0, 0, 0, 0.4);
  background-color: ${props => props.color};
  padding: 10px;
`

export const ExpenseValueText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
`

export const DescriptionText = styled.Text`
  font-size: 14px;
  color: black;
`
