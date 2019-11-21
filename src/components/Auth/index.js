import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";

import {
  getOrientation,
  setOrientationListener,
  removeOrientationListener,
  getPlatform
} from "../../components/utils/misc";

import Logo from "./logo";
import LoginPanel from "./loginPanel";

import { connect } from "react-redux";
import { autoSignIn } from "../../store/actions/user_actions";
import { bindActionCreators } from "redux";

import { getTokens, setTokens } from "../../components/utils/misc";

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      platform: getPlatform(),
      orientation: getOrientation(500),
      logoAnimation: false,
      loading: true
    };

    setOrientationListener(this.changeOrientation);
  }

  changeOrientation = () => {
    this.setState({
      orientation: getOrientation(500)
    });
  };

  // Normally put above ---->>>  UNSAFE_componentWillMount() ///// UNSAFE_componenDidMount//////
  UNSAFE_componenDidMount() {
    removeOrientationListener();
    getTokens(value => {
      if (value[0][1] === null) {
        this.setState({ loading: false });
      } else {
        this.props.autoSignIn(value[1][1]).then(() => {
          if (!this.props.User.auth.token) {
            this.setState({ loading: false });
            this.props.navigation.navigate("Home");
          } else {
            setTokens(this.props.User.auth, () => {
              this.props.navigation.navigate("Home");
            });
          }
        });
      }
    });
  }

  showLogin = () => {
    this.setState({
      logoAnimation: true
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Logo
            showLogin={this.showLogin}
            orientation={this.state.orientation}
          />
          <LoginPanel
            show={this.state.logoAnimation}
            orientation={this.state.orientation}
            platform={this.state.platform}
          />
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ autoSignIn }, dispatch);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
