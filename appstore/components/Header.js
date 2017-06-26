import React from 'react';
import styled from 'styled-components/native';

import Movable from '../Movable';
import AppIcon from './AppIcon';
import AppName from './AppName';

const DetailHeader = styled.View`
  padding: 10px;
  flex-shrink: 1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.8);
`;

const DetailContent = styled.View`
  flex: 1;
  background-color: white;
`;

export default class Header extends React.Component {
  componentDidMount() {
    if (!this._movable) {
      throw new Error('Header icon not mounted');
    }

    setTimeout(() => {
      this._movable.animate();
    }, 16);
  }

  render() {
    const {item, offsetX, offsetY} = this.props;
    const key = 'header-' + item.key;

    return (
      <DetailHeader>
        <Movable
          tag={key}
          fromX={offsetX}
          fromY={offsetY}
          ref={ref => {
            this._movable = ref;
          }}
        >
          <AppIcon key={key} source={item.icon} />
        </Movable>
      </DetailHeader>
    );
  }
}
