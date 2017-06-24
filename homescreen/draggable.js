import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  PanResponder,
  Dimensions,
  ScrollView,
  View
} from 'react-native';

const YES = (evt, gestureState) => true;
const NO = (evt, gestureState) => false;

export default class Draggable extends Component {
  constructor(props) {
    super(props);

    this.state = { draggable: new Animated.ValueXY(), dragging: false };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: YES,
      onStartShouldSetPanResponderCapture: YES,
      onMoveShouldSetPanResponder: YES,
      onMoveShouldSetPanResponderCapture: YES,
      onPanResponderTerminationRequest: YES,
      onShouldBlockNativeResponder: YES,
      onPanResponderGrant: (evt, gestureState) => {
        // this.state.draggable.setOffset(this.state.draggable.__getValue());
        // this.state.draggable.setValue({x: 0, y: 0});
        this.state.draggable.extractOffset();
        if (this.props.dragStarted) {
          this.props.dragStarted();
        }
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.draggable.x, dy: this.state.draggable.y }
      ]),
      onPanResponderRelease: (evt, gestureState) => {
        if (this.props.dragEnded) {
          this.props.dragEnded(true);
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        if (this.props.dragEnded) {
          this.props.dragEnded(false);
        }
      }
    });
  }

  render() {
    const animated = {
      transform: [
        { translateX: this.state.draggable.x },
        { translateY: this.state.draggable.y }
      ]
    };

    return (
      <Animated.View style={animated} {...this.panResponder.panHandlers}>
        {this.props.children}
      </Animated.View>
    );
  }
}
