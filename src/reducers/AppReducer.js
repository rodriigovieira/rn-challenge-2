import AsyncStorage from "@react-native-community/async-storage"

const AppReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER_NAME":
      AsyncStorage.setItem("@name", action.name)

      return { ...state, name: action.name }
    default:
      return state
  }
}

export default AppReducer
