import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";

import CustomHeader from "../Header/index";
import HorizontanScrollIcons from "./Horizontalcons";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: ["All", "Sports", "Music", "Clothing", "Electronics"],
      categorySelected: "All"
    };
  }

  updateCategoryHandler = value => {
    this.setState({
      categorySelected: value
    });
  };

  render() {
    return (
      <View>
        <CustomHeader />
        <ScrollView>
          <View style={styles.container}>
            <HorizontanScrollIcons
              categories={this.state.categories}
              categorySelected={this.state.categorySelected}
              updateCategoryHandler={this.updateCategoryHandler}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 5
  }
});

export default withNavigation(Home);
