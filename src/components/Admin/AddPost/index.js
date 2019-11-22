import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { withNavigation } from "react-navigation";

import CustomHeader from "../../Header/index";

class AddPost extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader />
        <Text>Hello ADDING POST PAGE</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default withNavigation(AddPost);
