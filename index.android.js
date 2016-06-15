/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  LayoutAnimation,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

const animating = React.createClass({
  doAnimation(easing, duration, toValue) {
    console.log(easing, duration, toValue);
    LayoutAnimation.configureNext(LayoutAnimation.create(
        duration,
        LayoutAnimation.Types[easing]
    ));

    this.setState({
        bottom: toValue
    });
  },

  keyboardWillShow(e) {
    this.doAnimation(e.easing, e.duration, e.endCoordinates.height);
  },

  keyboardWillHide(e) {
    this.doAnimation(e.easing, e.duration, 0);
  },

  getInitialState() {
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);

    return {
      bottom: 0
    }
  },

  onPress() {
    this.a.blur();
  },

  render() {
    const { width, height } = Dimensions.get('window');

    let _styles = [
      styles.container,
      {
        width,
        bottom: this.state.bottom,
      },
    ];

    return (
      <View style={{width, height}}>
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View style={{width, height}}></View>
        </TouchableWithoutFeedback>
        <View style={_styles}>
          <TextInput ref={(a)=>this.a = a} style={{height:40, width}} defaultValue="lkjasdlkjasdfkljasfl" />
        </View>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('animating', () => animating);
