/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';

import Collapse from './Collapse'

type Props = {};
type State = {
  collapsed: boolean
};

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      collapsed: true
    };
  }

  render() {
    const {collapsed} = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <View style={styles.buttonWrapper}>
          <Button
            onPress={() => this.setState({ collapsed: !this.state.collapsed })}
            title={collapsed ? 'Open' : 'Close'}
          />
        </View>
        <Collapse collapsed={collapsed} duration={1000}>
          <Image
            source={{ uri: 'https://placekitten.com/400/400' }}
            style={styles.image}
          />
          <Text>Hello!</Text>
        </Collapse>
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
  image: {
    height: 200,
    width: 200,
  }
});
