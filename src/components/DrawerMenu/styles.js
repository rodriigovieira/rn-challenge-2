import styled from "styled-components/native"

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 4px 0;
`

export const HeaderIconContainer = styled.View`
  margin: 15px;
`

export const TextContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  width: 70%;
  overflow: hidden;
`

export const UserNameText = styled.Text`
  font-size: 15px;
  font-weight: bold;
`


export const ItemButton = styled.TouchableOpacity`
  background-color: ${props => (props.isItemActive ? props.theme.colors.primaryLighter : "white")};
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
`

export const IconContainer = styled.View`
  margin: 15px;
  width: 25px;
  justify-content: center;
`

export const ItemText = styled.Text`
  color: ${props => (props.isItemActive ? props.theme.colors.primaryNormal : "rgba(0,0,0,.7)")};
  font-weight: bold;
`
