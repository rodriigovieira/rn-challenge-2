import React from "react"
import { WebView } from "react-native-webview"
import { Text, TouchableOpacity } from "react-native"

const RepoWebViewPage = () => (
  <WebView source={{ uri: "https://github.com/rodriigovieira/rn-challenge-2" }} />
)

RepoWebViewPage.navigationOptions = {
  headerTitle: "Project Page"
}

RepoWebViewPage.navigationOptions = ({ navigation }) => ({
  headerLeft: (
    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
      <Text style={{ fontWeight: "600", fontSize: 16, color: "rgba(73, 110, 239, 1)" }}>Close</Text>
    </TouchableOpacity>
  )
})

export default RepoWebViewPage
