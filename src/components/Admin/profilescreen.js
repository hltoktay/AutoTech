import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>PROFILE SCREEN</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ProfileScreen;
