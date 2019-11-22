import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";

import CustomHeader from "../Header/index";

class Screen1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader />
        <Text>SCREEN 1 Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "green"
  }
});

export default Screen1;
