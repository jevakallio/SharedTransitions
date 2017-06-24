import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  Slider,
  ScrollView,
  Dimensions,
  Platform,
  Button,
} from 'react-native';
import Reveal from './Reveal';

const tint = '#A6309B';

export default class App extends React.Component {
  state = {
    show: false,
    value: 11,
    content: new Animated.Value(0),
  };

  toggle = () => {
    const show = !this.state.show;
    this.setState({show}, () => {
      Animated.spring(this.state.content, {
        toValue: show ? 1 : 0,
      }).start();
    });
  };

  getContentStyle() {
    const scale = this.state.content.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.8],
    });

    const marginTop = this.state.content.interpolate({
      inputRange: [0, 1],
      outputRange: [210, 110],
    });

    return {
      position: 'relative',
      marginTop,
      transform: [{scale}],
    };
  }

  render() {
    const show = this.state.show;

    return (
      <View style={styles.container}>
        <Image
          style={[styles.image, styles.stretch]}
          source={require('./images/pier.jpg')}
        >
          <Text style={styles.title}>MIDSUMMER{'\n'}LOTTERY</Text>
          <Reveal show={show}>
            <Image
              key="screen-container"
              style={[styles.image, styles.stretch]}
              source={require('./images/home.jpg')}
            >
              <ScrollView style={{flex: 1}}>
                <Animated.View style={this.getContentStyle()}>
                  <TouchableOpacity style={styles.toggle} onPress={this.toggle}>
                    <Text style={styles.count}>
                      {this.state.value}
                    </Text>
                    <Text style={[styles.label, show && {marginTop: 8}]}>
                      POOR SOULS
                      {show ? '\nSHALL PERISH' : ''}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
                {show &&
                  <View style={styles.sliders}>
                    <View style={styles.sliderValues}>
                      {[0, 10, 20, 30, 40, 50].map(n => (
                        <Text key={n} style={styles.sliderLabel}>
                          {n.toString()}
                        </Text>
                      ))}
                    </View>
                    <Slider
                      minimumTrackTintColor={tint}
                      value={this.state.value}
                      minimumValue={0}
                      maximumValue={50}
                      onValueChange={value => {
                        this.setState({value: Math.round(value, 0)});
                      }}
                    />
                    <TouchableOpacity onPress={this.toggle}>
                      <Text style={styles.save}>
                        Save
                      </Text>
                    </TouchableOpacity>
                  </View>}
              </ScrollView>
            </Image>
          </Reveal>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  title: {
    position: 'absolute',
    backgroundColor: 'transparent',
    textAlign: 'center',
    width: '100%',
    top: Platform.select({
      ios: 50,
      android: 100,
    }),
    fontSize: 32,
    fontWeight: '100',
  },
  image: {
    resizeMode: 'cover',
  },
  stretch: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  toggle: {
    backgroundColor: 'transparent',
  },
  count: {
    fontSize: 32,
    textAlign: 'center',
  },
  label: {
    fontSize: 9,
    fontWeight: '100',
    textAlign: 'center',
  },
  sliders: {
    marginTop: 80,
    marginHorizontal: 25,
  },
  sliderValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    top: Platform.select({
      ios: 10,
      android: 0,
    }),
    marginHorizontal: 15,
  },
  sliderLabel: {
    fontSize: 9,
    color: tint,
    opacity: 0.75,
  },
  save: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 20,
    color: tint,
    backgroundColor: 'transparent',
  },
});
