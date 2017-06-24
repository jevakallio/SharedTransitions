import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';

const screen = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};

const minHoleSize = 150;
const getHoleSize = show => (show ? screen.height * 2 : minHoleSize);

export default class Reveal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hole: new Animated.Value(getHoleSize(props.show)),
    };
  }

  componentWillReceiveProps({show}) {
    Animated.spring(this.state.hole, {
      toValue: getHoleSize(show),
    }).start();
  }

  render() {
    const {hole} = this.state;

    const topDistance = 100;
    const left = hole.interpolate({
      inputRange: [0, 1000],
      outputRange: [screen.width / 2, screen.width / 2 - 500],
    });

    const top = hole.interpolate({
      inputRange: [0, 1000],
      outputRange: [
        screen.height / 2 - topDistance,
        screen.height / 2 - 500 - topDistance,
      ],
    });

    const leftOffset = left.interpolate({
      inputRange: [0, 1000],
      outputRange: [0, -1000],
    });

    const topOffset = top.interpolate({
      inputRange: [0, 1000],
      outputRange: [0, -1000],
    });

    const borderRadius = hole.interpolate({
      inputRange: [0, 1000],
      outputRange: [0, 500],
    });

    const circleFixBorder = 0;
    const styles = {
      peek: {
        backgroundColor: 'transparent',
        width: hole,
        height: hole,
        borderRadius,
        left,
        top,
        overflow: 'hidden',
      },
      container: {
        top: topOffset,
        left: leftOffset,
      },
    };

    return (
      <Animated.View style={styles.peek}>
        <Animated.View style={styles.container}>
          {this.props.children}
        </Animated.View>
        <Animated.View pointerEvents="none" style={styles.fixCircleClipping} />
      </Animated.View>
    );
  }
}
