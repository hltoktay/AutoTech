import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Linking
} from "react-native";
import { HeaderBackButton } from "react-navigation-stack";

import Ionicons from "react-native-vector-icons/Ionicons";

class Article extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "AUTO TECH",
      headerStyle: {
        backgroundColor: "#6b0000"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerLeft: (
        <HeaderBackButton
          tintColor={"white"}
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      )
    };
  };

  render() {
    const { navigation } = this.props;

    const openEmail = () => {
      Linking.openURL("mailto:example@gmail.com?subject=example&body=example");
    };

    return (
      <ScrollView style={styles.articleContainer}>
        <Image
          resizeMode={"cover"}
          style={styles.articleImage}
          source={{ uri: "https://source.unsplash.com/daily" }}
        />

        <Text style={styles.priceTag}>
          $ {JSON.stringify(navigation.getParam("passProps"))}
        </Text>

        <View style={styles.contentContainer}>
          <Text style={styles.titleTag}>
            Title:{navigation.getParam("passTitle")}
          </Text>

          <Text style={styles.descriptionTag}>
            Description :{navigation.getParam("passDescription")}
          </Text>
        </View>

        <View style={styles.ownerInfo}>
          <Ionicons.Button
            name="ios-mail"
            color="#00ada9"
            backgroundColor="#fff"
            onPress={() => openEmail()}
          >
            <Text>Contact:{navigation.getParam("passOwner")}</Text>
          </Ionicons.Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  articleContainer: {
    padding: 10
  },
  articleImage: {
    width: "100%",
    height: 250
  },
  articleContent: {
    paddingTop: 10
  },
  priceTag: {
    position: "absolute",
    bottom: 209,
    backgroundColor: "#6b0000",
    padding: 10,
    color: "#fff",
    fontSize: 20,
    fontFamily: "Avenir-Roman"
  },
  contentContainer: {
    marginTop: 5
  },
  titleTag: {
    fontSize: 30,
    fontFamily: "Avenir-Roman",
    marginTop: 20,
    fontWeight: "600"
  },
  descriptionTag: {
    marginTop: 20,
    fontSize: 18
  },
  ownerInfo: {
    marginTop: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee"
  }
});

export default Article;
