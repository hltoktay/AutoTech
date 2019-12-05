import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Button } from "react-native";

import CustomHeader from "../Header/index";

import { connect } from "react-redux";
import { getUserPosts, deleteUserpost } from "../../store/actions/user_actions";
import { bindActionCreators } from "redux";

import Modal from "react-native-modal";



class MyPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      modal: false
    };
  }

  componentDidMount() {
    const UID = this.props.User.auth.uid;
    this.props.getUserPosts(UID).then(nextProps => {
      this.setState({
        posts: nextProps.User.userPosts
      });
    });
  }

    UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.User.userPosts) {
      this.setState({
        posts: nextProps.User.userPosts
      });
    }
  }

  showConfirm = (ID) => {
    this.setState({
      modal: true,
      toDelete: ID
    })
  }

  deletePost = (ID) => {
    this.props.deleteUserpost(ID, this.props.User.auth).then(() => {
      const UID = this.props.User.auth.uid;
      this.props.getUserPosts(UID)

      this.setState({
        modal: false,
        toDelete: ''
      });
    })
  }


  showPosts = (posts) => (
    posts ? posts.map(item => (
      <View style={styles.itemWrapper} key={item.id}>
          <View style={styles.itemTitle}>
            <Text style={{ fontFamily: "Avenir-Roman", fontWeight: 'bold', fontSize: 15}}> {item.title}</Text>
          </View>
          <View style={styles.itemDescription}>
              <Text>{item.description}</Text>
              <View style={{marginTop: 10}}>
                <Text style={styles.small}>PRICE: $ {item.price}</Text>
                <Text style={styles.small}>CATEGORY:  {item.category}</Text>
              </View>
          </View>

          <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => this.showConfirm(item.id)}
              >
                <Text style={{color: '#f44336', paddingBottom: 10, fontWeight: 'bold'}}>Delete Post </Text>
              </TouchableOpacity>
          </View>

          <Modal testID={'modal'} swipeDirection={['down']} isVisible={this.state.modal}>
          <View style={styles.content}>
          <Text style={{fontSize: 20}}>
                  Are you sure you delete to post?
              </Text>
              <TouchableOpacity
              style={{marginTop: 15}}
              onPress={() => this.deletePost(this.state.toDelete)}
              >
              <Text style={styles.modalDelete}>Yes, delete it</Text>
                
              </TouchableOpacity>

              <TouchableOpacity
              onPress={() => {
                this.setState({
                  modal: false,
                  toDelete: ''
                })
              }}
              >
              <Text style={styles.modalCancel}>No, keep it</Text>
                
              </TouchableOpacity>
          </View>
        </Modal>

      </View>
    ))
    : null
  )

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader />
        <ScrollView>
          <View style={{ marginBottom: 10,  padding: 10 }}>
            <Text>You have {this.state.posts.length} posts</Text>
          </View>

          {this.showPosts(this.state.posts)}

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  itemWrapper: {
    padding: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 4,
    marginBottom: 20
  },
  itemTitle: {
    borderBottomWidth: 1,
    fontWeight: "bold",
    borderBottomColor: "grey",
    padding: 10,
    backgroundColor: "#f5f5f5"
  },
  itemDescription: {
    padding: 10
  }, 
  small: {
    fontSize: 14
  },
  buttons: {
    alignItems: 'center'
  },
  modalDelete: {
    marginBottom: 20,
    alignSelf: 'center',
    fontSize: 20,
    color: 'red'
  },
  modalCancel: {
    marginBottom: 20,
    alignSelf: 'center',
    fontSize: 20,
    color: '#00ada9'
  },
  content:{
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  }
});

function mapStateToProps(state) {
  console.log(state);
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserPosts, deleteUserpost }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPost);
