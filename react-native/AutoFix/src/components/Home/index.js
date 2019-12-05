import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";

import { gridTwoColumns } from "../utils/misc";
import CustomHeader from "../Header/index";
import HorizontanScrollIcons from "./Horizontalcons";

import { connect } from "react-redux";
import { getArticles } from "../../store/actions/articles_actions";
import { bindActionCreators } from "redux";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import BlockItem from "./blockItem";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      articles: [],
      categories: ["All", "EVC", "Magic Motor", "Training", "Truck Script", "DAMOS"],
      categorySelected: "All"
    };
  }

  updateCategoryHandler = value => {
    this.setState({
      isLoading: true,
      categorySelected: value,
      articles: []
    });

    this.props.getArticles(value).then(() => {
      const newArticles = gridTwoColumns(this.props.Articles.list);

      this.setState({
        isLoading: false,
        articles: newArticles
      });
    });
  };

  UNSAFE_componentWillMount() {
    this.props.getArticles("All").then(() => {
      const newArticles = gridTwoColumns(this.props.Articles.list);

      this.setState({
        isLoading: false,
        articles: newArticles
      });
    });
  }

  goToArticleHandler = props => {
    this.props.navigation.push("Article", {
      passProps: props.price,
      passDescription: props.description,
      passTitle: props.title,
      passOwner: props.email,

    });
  };

  showArticles = () =>
    this.state.articles.map((item, i) => (
      <BlockItem
        key={`columnHome=${i}`}
        item={item}
        iteration={i}
        goto={this.goToArticleHandler}
      />
    ));

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
            {this.state.isLoading ? (
              <View style={styles.isLoading}>
                <FontAwesome name="gears" size={30} color="red" />
                <Text style={{ color: "red", marginTop: 8 }}>Loading...</Text>
              </View>
            ) : null}
            <View style={styles.articleContainer}>
              <View style={{ flex: 1 }}>{this.showArticles()}</View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 5
  },
  isLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50
  },
  articleContainer: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

function mapStateToProps(state) {
  return {
    Articles: state.Articles
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getArticles }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Home));
