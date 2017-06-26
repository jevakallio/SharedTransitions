import React from 'react';
import {Animated, View} from 'react-native';
import Measurable from './Measurable';

export default class MagicMove extends React.Component {
  constructor(props) {
    super(props);
    this._position = new Animated.ValueXY();
    this._opacity = new Animated.Value(0);
  }
  capturef = ref => {
    this._measureble = ref;
  };

  animate = () => {
    this._measureble.measuref((toX, toY) => {
      const {fromX, fromY} = this.props;

      // initialize in start position
      this._opacity.setValue(1);
      this._position.setValue({
        x: fromX - toX,
        y: fromY - toY,
      });

      // animate to end position
      Animated.timing(this._position, {
        duration: 200,
        toValue: {x: 0, y: 0},
      }).start();
    });
  };

  render() {
    // nativeID is used to disable the Android layout-only
    // view removal optimization

    const style = {
      opacity: this._opacity,
      transform: [
        {translateX: this._position.x},
        {translateY: this._position.y},
      ],
    };

    return (
      <Animated.View style={style}>
        <Measurable tag={this.props.tag} ref={this.capturef}>
          {this.props.children}
        </Measurable>
      </Animated.View>
    );
  }
}
