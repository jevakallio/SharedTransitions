import React from 'react';
import {View, FlatList, Modal} from 'react-native';
import styled from 'styled-components/native';
import data from './data';

import ListItem from './components/ListItem';
import Header from './components/Header';

const Container = styled.View`
  flex: 1;
  margin-top: 32px;
`;

const DetailContainer = styled.View`
  flex: 1;
`;

const DetailContent = styled.View`
  flex: 1;
  background-color: white;
`;

const initialState = {
  focusedItem: null,
  iconX: null,
  iconY: null,
};

export default class AppStore extends React.Component {
  state = initialState;

  onRowPress = (focusedItem, iconX, iconY) => {
    this.setState({iconX, iconY, focusedItem});
  };

  hideModal = () => {
    this.setState(initialState);
  };

  render() {
    return (
      <Container>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <ListItem
              item={item}
              onPress={this.onRowPress}
              isFocused={
                this.state.focusedItem &&
                  this.state.focusedItem.key === item.key
              }
            />
          )}
        />
        <Modal
          transparent={true}
          visible={this.state.focusedItem !== null}
          onRequestClose={this.hideModal}
        >
          <DetailContainer>
            <Header
              item={this.state.focusedItem}
              offsetX={this.state.iconX}
              offsetY={this.state.iconY}
            />
            <DetailContent />
          </DetailContainer>
        </Modal>
      </Container>
    );
  }
}
