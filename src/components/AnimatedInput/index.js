import React from "react"
import PropTypes from "prop-types"

import { Animated, View } from "react-native"

const AnimatedInput = ({
  animationStatus, textValue, children, color, width, left
}) => (
  <View style={{ width, alignItems: "center" }}>
    <Animated.Text
      style={{
        position: "absolute",
        left,
        fontSize: animationStatus.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 12]
        }),
        color: animationStatus.interpolate({
          inputRange: [0, 1],
          outputRange: ["rgba(0,0,0,.4)", color]
        }),
        top: animationStatus.interpolate({
          inputRange: [0, 1],
          outputRange: ["20%", "-10%"]
        })
      }}
    >
      {textValue}
    </Animated.Text>

    {children}
  </View>
)

AnimatedInput.propTypes = {
  animationStatus: PropTypes.shape({
    interpolate: PropTypes.func.isRequired
  }).isRequired,
  textValue: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  width: PropTypes.string,
  left: PropTypes.string
}

AnimatedInput.defaultProps = {
  color: "rgba(73, 110, 239, 1)",
  width: "100%",
  left: "10%"
}

export default AnimatedInput
