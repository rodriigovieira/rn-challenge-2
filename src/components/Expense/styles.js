import styled from "styled-components"

export const ExpenseContainer = styled.View`
  height: 100px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.7);
  box-shadow: 1px 0.4px 0.4px rgba(0, 0, 0, 0.4);
  background-color: ${props => props.color}
`

export const ExpenseValueText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`
