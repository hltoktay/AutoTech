import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  KeyboardAvoidingView
} from "react-native";

import { connect } from "react-redux";
import { signUp, signIn } from "../../store/actions/user_actions";
import { bindActionCreators } from "redux";

import { withNavigation } from "react-navigation";

import Input from "../utils/input";
import ValidationRules from "../utils/validationRules";

import { setTokens } from "../../components/utils/misc";

class LoginForm extends Component {
  state = {
    type: "Login",
    action: "Login",
    actionMode: "Not a user, Register",
    hasErrors: false,
    form: {
      email: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          isEmail: true
        }
      },
      password: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          minLength: 6
        }
      },
      confirmPassword: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          confirmPass: "password"
        }
      }
    }
  };

  updateInput = (name, value) => {
    this.setState({
      hasErrors: false
    });

    let formCopy = this.state.form;
    formCopy[name].value = value;

    let rules = formCopy[name].rules;
    let valid = ValidationRules(value, rules, formCopy);

    formCopy[name].valid = valid;

    this.setState({
      form: formCopy
    });
  };

  confirmPassword = () =>
    this.state.type != "Login" ? (
      <Input
        placeholder="Confirm password"
        type={this.state.form.confirmPassword.type}
        value={this.state.form.confirmPassword.value}
        onChangeText={value => this.updateInput("confirmPassword", value)}
        secureTextEntry
      />
    ) : null;

  changeFormType = () => {
    const type = this.state.type;
    this.setState({
      type: type === "Login" ? "Register" : "Login",
      action: type === "Login" ? "Register" : "Login",
      actionMode:
        type === "Login" ? "Not registered, Login" : "Not a user, Register"
    });
  };

  formHasErrors = () =>
    this.state.hasErrors ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Opps, check your info!</Text>
      </View>
    ) : null;

  submitUser = () => {
    let isFormValid = true;
    let formToSubmit = {};
    const formCopy = this.state.form;

    for (let key in formCopy) {
      if (this.state.type === "Login") {
        // LOGIN
        if (key !== "confirmPassword") {
          isFormValid = isFormValid && formCopy[key].valid;
          formToSubmit[key] = formCopy[key].value;
        }
      } else {
        //REGISTER
        isFormValid = isFormValid && formCopy[key].valid;
        formToSubmit[key] = formCopy[key].value;
      }
    }

    if (isFormValid) {
      if (this.state.type === "Login") {
        this.props.signIn(formToSubmit).then(() => {
          this.manageAccess();
        });
      } else {
        this.props.signUp(formToSubmit).then(() => {
          this.manageAccess();
        });
      }
    } else {
      this.setState({
        hasErrors: true
      });
    }
  };

  manageAccess = () => {
    if (!this.props.User.auth.uid) {
      this.setState({
        hasErrors: true
      });
    } else {
      setTokens(this.props.User.auth, () => {
        this.setState({ hasErrors: false });
        this.props.navigation.navigate("Home");
      });
    }
  };

  render() {
    return (
      <View style={styles.formContainer}>
        <Input
          placeholder="Your Email Address"
          type={this.state.form.email.type}
          value={this.state.form.email.value}
          onChangeText={value => this.updateInput("email", value)}
          autoCapitalize={"none"}
          keyboardType={"email-address"}
        />

        <Input
          placeholder="Your Password"
          type={this.state.form.password.type}
          value={this.state.form.password.value}
          onChangeText={value => this.updateInput("password", value)}
          secureTextEntry
        />

        {this.confirmPassword()}
        {this.formHasErrors()}

        <View
          style={
            this.props.platform === "android"
              ? styles.buttonStyleAndroid
              : styles.buttonStyleIos
          }
        >
          <Button
            title={this.state.action}
            color="#6b0000"
            onPress={this.submitUser}
          />
        </View>

        <View
          style={
            this.props.platform === "android"
              ? styles.buttonStyleAndroid
              : styles.buttonStyleIos
          }
        >
          <Button
            title={this.state.actionMode}
            color="#ffcaca"
            onPress={this.changeFormType}
          />
        </View>

        {/* <View>
          <Button
            title="Do it later"
            color="#ffcaca"
            onPress={() => this.props.navigation.navigate("Home")}
          />
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyleAndroid: {
    marginBottom: 5,
    marginTop: 5
  },
  buttonStyleIos: {
    marginBottom: 7
  },
  errorContainer: {
    marginBottom: 20,
    marginTop: 10
  },
  errorText: {
    color: "red",
    fontFamily: "TimesNewRomanPSMT"
  }
});

function mapStateToProps(state) {
  console.log(state);
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signUp, signIn }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(LoginForm));
