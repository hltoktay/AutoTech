import React from "react";
import { StyleSheet } from "react-native";
import { Header, Left, Icon, Right, Body, Button, Title } from "native-base";

import { withNavigation } from "react-navigation";

const CustomHeader = props => {
  return (
    <Header style={{ backgroundColor: "#ffcaca" }}>
      <Left>
        <Icon
          name="menu"
          onPress={() => {
            props.navigation.openDrawer();
          }}
        />
      </Left>
      <Body>
        <Title style={styles.textHeader}>AUTO TECH</Title>
      </Body>
      <Right />
    </Header>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    color: "#6b0000"
  }
});

export default withNavigation(CustomHeader);
