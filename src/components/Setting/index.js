import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import { Header, Left } from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";

class SettingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Setting Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "50%",
    height: "100%",
    backgroundColor: "green"
  }
});

export default SettingScreen;
