import React, { Component } from "react";
import { StyleSheet, View, Text, Platform, ScrollView } from "react-native";

import CustomHeader from "../Header/index";

import { connect } from "react-redux";
import { getUserPosts } from "../../store/actions/user_actions";
import { bindActionCreators } from "redux";

class MyPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    const UID = this.props.User.auth.uid;
    this.props.getUserPosts(UID);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.User.userPosts) {
      this.setState({
        posts: nextProps.User.userPosts
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader />
        <ScrollView>
          <View style={{ marginBottom: 30 }}>
            <Text>You have {this.state.posts.length} posts</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemWrapper: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 4,
    marginBottom: 20
  },
  itemTitle: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    padding: 10,
    backgroundColor: "#f5f5f5"
  }
});

function mapStateToProps(state) {
  console.log(state);
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserPosts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPost);
