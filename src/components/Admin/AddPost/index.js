import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';


 class AddPost extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello ADDING POST PAGE</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default AddPost;