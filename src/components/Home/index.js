import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';


 class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello HOMEEEE PAGE</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Home;