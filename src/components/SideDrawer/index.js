import React from "react";
import {
  AppRegistry,
  Image,
  StatusBar,
  ImageBackground,
  StyleSheet
} from "react-native";
import { Container, Content, Text, List, ListItem, Icon } from "native-base";

const routes = ["Home", "SellIt", "Profile", "Logout"];

class SideDrawer extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <ImageBackground
            source={{
              uri:
                "https://www.semmotorsports.com/imgs/photos/small/autotech.jpg"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}
          ></ImageBackground>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  key={data}
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

export default SideDrawer;

const styles = StyleSheet.create({});
