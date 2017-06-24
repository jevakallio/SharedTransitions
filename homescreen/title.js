import React from 'react';
import {Animated, Text, Platform} from 'react-native';
import {HIDDEN, VISIBLE} from './animation-state';

const Title = ({text, top, visibility}) => (
  <Animated.View
    style={{
      position: 'absolute',
      top,
      left: 0,
      right: 0,
      opacity: visibility.interpolate({
        inputRange: [HIDDEN, VISIBLE],
        outputRange: [0, 1],
      }),
      backgroundColor: 'transparent',
      transform: [
        {
          translateY: visibility.interpolate({
            inputRange: [HIDDEN, VISIBLE],
            outputRange: [100, 0],
          }),
        },
      ],
    }}
  >
    <Text
      style={{
        fontSize: 40,
        fontFamily: Platform.select({
          ios: 'GillSans-SemiBold',
          android: 'Roboto',
        }),
        textAlign: 'center',
      }}
    >
      {text}
    </Text>
  </Animated.View>
);

export default Title;
