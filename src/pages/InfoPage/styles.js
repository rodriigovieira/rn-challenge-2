import styled from "styled-components/native"

export const Container = styled.View`
  align-items: center;
  flex: 1;
`

export const TitleContainer = styled.View`
  margin: 20px;
  align-items: center;
  width: 80%;
`

export const TitleText = styled.Text`
  font-size: 28px;
  font-weight: bold;
`

export const BodyContainer = styled.View`
  padding: 10px;
  align-items: center;
  width: 80%;
`

export const BodyText = styled.Text`
  font-size: 16px;
  text-align: center;
`

export const RepoButton = styled.TouchableOpacity`
  margin: 30px;
  border-radius: 5px;
  padding: 10px;
  background-color: rgba(73, 110, 239, 1);
  width: 100%;
  align-items: center;
`

export const RepoButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`
