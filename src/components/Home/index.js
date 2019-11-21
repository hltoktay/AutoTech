import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";

import Ionicons from "react-native-vector-icons/Ionicons";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "HOME",
    headerTintColor: "#e3e3e3",
    headerStyle: {
      backgroundColor: "#6b0000"
    },
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("Setting")}
      >
        <Text>
          <Ionicons name="ios-menu" size={25} color="white" />
        </Text>
      </TouchableOpacity>
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Setting")}
        >
          <Text>
            <Ionicons name="ios-menu" size={25} color="black" />
          </Text>
        </TouchableOpacity>
        <Text>Hello HOMEEEE PAGE</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    width: 24,
    height: 24
  }
});

export default withNavigation(Home);
