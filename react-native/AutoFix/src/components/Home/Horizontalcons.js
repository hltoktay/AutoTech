import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

const categoriesIcons = value => {
  let name = "home";
  switch (value) {
    case "All":
      name = "ios-keypad";
      break;
    case "EVC":
      name = "md-baseball";
      break;
    case "Magic Motor":
      name = "md-microphone";
      break;
    case "Training":
      name = "md-desktop";
      break;
    case "Truck Script":
      name = "md-pricetags";
      break;
      case "DAMOS":
      name = "md-pricetags";
      break;
    default:
      name = "";
  }

  return name;
};

class HorizontanScrollIcons extends Component {
  generateIcon = categories =>
    categories
      ? categories.map(item => (
          <View style={{ marginRight: 15 }} key={item}>
            <Icon.Button
              name={categoriesIcons(item)}
              iconStyle={{ marginRight: 10, marginLeft: 5 }}
              backgroundColor={
                this.props.categorySelected !== item ? "#a9a9a9" : "#db4040"
              }
              size={20}
              borderRadius={100}
              onPress={() => this.props.updateCategoryHandler(item)}
            >
              <Text style={{ color: "#fff", marginRight: 5 }}>{item}</Text>
            </Icon.Button>
          </View>
        ))
      : null;

  render() {
    return (
      <ScrollView
        horizontal={true}
        decelerationRate={0}
        snapToInterval={200}
        showsHorizontalScrollIndicator={true}
      >
        <View style={styles.scrollContainer}>
          {this.generateIcon(this.props.categories)}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    width: "100%"
  }
});

export default HorizontanScrollIcons;
