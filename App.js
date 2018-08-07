/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';

import Revealer from './Revealer'

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  render() {
    const {isOpen} = this.state;

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        ref={component => this._root = component}
      >
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <View style={styles.buttonWrapper}>
          <Button
            onPress={() => this.setState({ isOpen: !this.state.isOpen })}
            title={isOpen ? 'Close' : 'Open'}
          />
        </View>
        <Revealer open={isOpen}>
          <Text>Hello!</Text>
        </Revealer>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonWrapper: {
    marginVertical: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
