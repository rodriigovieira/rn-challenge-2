import Reactotron, { trackGlobalErrors } from "reactotron-react-native"

if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .use(trackGlobalErrors())
    .connect()

  console.tron = tron.log
  console.trom = tron.log
}
