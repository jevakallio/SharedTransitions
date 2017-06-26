import React from 'react';
import {Animated, View} from 'react-native';

export default class MagicMove extends React.Component {
  capturef = ref => {
    this._ref = ref;
  };

  measuref = callback => {
    this._ref.measure((x, y, width, height, pageX, pageY) => {
      //console.log(this.props.tag, x, y, width, height, pageX, pageY);
      callback(pageX, pageY);
    });
  };

  render() {
    // nativeID is used to disable the Android layout-only
    // view removal optimization
    return (
      <View nativeID={this.props.tag} ref={this.capturef}>
        {this.props.children}
      </View>
    );
  }
}
