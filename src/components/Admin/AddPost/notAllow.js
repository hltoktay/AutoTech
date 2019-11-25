import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";

class NotAllow extends Component {
  rendeR() {
    return <Text>Your are not allowed. You Should login before...</Text>;
  }
}

export default NotAllow;
