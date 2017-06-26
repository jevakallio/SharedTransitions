import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import Measurable from '../Measurable';
import AppIcon from './AppIcon';
import AppName from './AppName';

const Row = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export default class ListItem extends React.Component {
  measureMove = () => {
    this._appIcon.measuref((x, y) => {
      this.props.onPress(this.props.item, x, y);
    });
  };

  render() {
    const {item, isFocused} = this.props;
    return (
      <Row onPress={this.measureMove}>
        <Measurable
          tag={item.key}
          ref={ref => {
            this._appIcon = ref;
          }}
        >
          <View style={{opacity: isFocused ? 0 : 1}}>
            <AppIcon key={item.key} source={item.icon} />
          </View>
        </Measurable>
        <AppName>{item.name}</AppName>
      </Row>
    );
  }
}
