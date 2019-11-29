import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";

class Screen2 extends Component {
  static navigationOptions = {
    drawerLabel: "Contact",
    drawerIcon: () => <Icon name="menu" />
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>SCreen 2 Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "blue"
  }
});

export default Screen2;
