import styled from "styled-components/native"

export const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  margin-bottom: 200px;
`

export const TitleContainer = styled.View`
  margin: 30px;
`

export const TitleText = styled.Text`
  font-size: 34px;
  font-weight: bold;
`

export const RecoverFormContainer = styled.View`
  width: 100%;
  align-items: center;
`

export const EmailInput = styled.TextInput`
  width: 80%;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid black;
  font-size: 16px;
  padding: 10px 7px;
  margin: 5px;
`

export const RecoverButtonContainer = styled.View`
  margin: 10px;
  width: 100%;
  align-items: center;
`

export const RecoverButton = styled.TouchableOpacity`
  border-radius: 5px;
  background: lightskyblue;
  width: 80%;
  padding: 10px 7px;
`

export const RecoverButtonText = styled.Text`
  color: white;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
`

export const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 80%;
`

export const ReturnHomePageButton = styled.TouchableOpacity`
  margin-left: 10%;
  margin: 5px;
`

export const ReturnHomePageButtonText = styled.Text`
  color: lightskyblue;
  font-size: 14px;
`
