import React from "react";
import {
  AppRegistry,
  Image,
  StatusBar,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import { Container, Content, Text, List, ListItem, Icon } from "native-base";

import { clearToken } from '../utils/misc'


const routes = ["Home", "SellIt", "MyPost", "Setting","LIST NAME ANYTHIGN"];

class SideDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  componenDidMount() {
    clearToken()
  }

  render() {
    return (
      <Container style={{marginTop: 50}}>

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
            keyExtractor={(data, index) => data.toString()}
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
              <TouchableOpacity onPress={()=>
              Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {
                    console.log('TOKEN CLEARED')
                    this.props.navigation.navigate("Login")
                  }},
                ],
                { cancelable: false }
              )
            }>
              <Text style={{margin: 36,fontWeight: 'bold'}}>Logout</Text>
            </TouchableOpacity>
      
      </Container>
    );
  }
}


const styles = StyleSheet.create({});

export default SideDrawer;

