import React from "react"
import PropTypes from "prop-types"
import { Linking, TouchableOpacity } from "react-native"

import {
  Container,
  TitleContainer,
  TitleText,
  BodyContainer,
  BodyText,
  RepoButton,
  RepoButtonText
} from "./styles"

import Header from "~/components/Header"

const InfoPage = ({ navigation }) => (
  <Container>
    <Header title="Information" navigation={navigation} />

    <TitleContainer>
      <TitleText>Information</TitleText>
    </TitleContainer>

    <BodyContainer>
      <BodyText>
        This is an open-source project made with React Native, featuring a complete integration with
        a GraphQL backend using React-Apollo.
        {"\n"}
        {"\n"}
        If you have any suggestion or critic to this projet, I insist: please share with me! You can
        reach me at
      </BodyText>
      <TouchableOpacity
        onPress={() => Linking.openURL("mailto:rodriigovieira@gmail.com?subject=ExpensesApp")}
      >
        <BodyText style={{ color: "rgba(73, 110, 239, 1)" }}>rodriigovieira@gmail.com</BodyText>
      </TouchableOpacity>

      <RepoButton onPress={() => navigation.navigate("RepoWebViewPage")}>
        <RepoButtonText>Access Project</RepoButtonText>
      </RepoButton>
    </BodyContainer>
  </Container>
)

InfoPage.navigationOptions = {
  header: null
}

InfoPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

export default InfoPage
