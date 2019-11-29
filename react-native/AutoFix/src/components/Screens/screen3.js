import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";

import CustomHeader from "../Header/index";

class Screen3 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader />
        <Text>SCREEN 3 Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "red"
  }
});

export default Screen3;
