import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class Home extends Component {
  static navigationOptions = {
    title: "HOME",
    headerTintColor: "#e3e3e3",
    headerStyle: {
      backgroundColor: "#6b0000"
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello HOMEEEE PAGE</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Home;
