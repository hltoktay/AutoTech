import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  Modal
} from "react-native";

import Input from "../../utils/input";
import ValidationRules from "../../utils/validationRules";

import { withNavigation } from "react-navigation";

import { connect } from "react-redux";
import { addArticle } from "../../../store/actions/articles_actions";
import { bindActionCreators } from "redux";
import { autoSignIn } from "../../../store/actions/user_actions";

import { getTokens, setTokens } from "../../utils/misc";

import CustomHeader from "../../Header/index";

class AddPost extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: false,
    hasErrors: false,
    modalVisible: false,
    modalSuccess: false,
    errorsArray: [],
    form: {
      category: {
        value: "",
        name: "category",
        valid: false,
        type: "picker",
        options: ["Select", "Sports", "Music", "Clothing", "Electronics"],
        rules: {
          isRequired: true
        },
        errorMsg: "You need to select a category"
      },
      title: {
        value: "",
        name: "title",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          maxLength: 50
        },
        errorMsg: "You could enter max 50 char"
      },
      description: {
        value: "",
        name: "description",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          maxLength: 150
        },
        errorMsg: "You could enter max 150 char"
      },
      price: {
        value: "",
        name: "price",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          maxLength: 6
        },
        errorMsg: "You could enter max 6 char"
      },
      email: {
        value: "",
        name: "email",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          isEmail: true
        },
        errorMsg: "You need to enter an valid email"
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

  submitFormHandler = () => {
    let isFormValid = true;
    let dataToSubmit = {};
    const formCopy = this.state.form;

    for (let key in formCopy) {
      isFormValid = isFormValid && formCopy[key].valid;
      dataToSubmit[key] = this.state.form[key].value;
    }

    if (isFormValid) {
      this.setState({
        loading: true
      });

      getTokens(value => {
        // console.log(value);
        const dateNow = new Date();
        const expiration = dateNow.getTime();
        const form = {
          ...dataToSubmit,
          uid: value[3][1]
        };

        if (expiration > value[2][1]) {
          alert("Auto Sign In");
        } else {
          alert("Post the article");
        }
      });
      // console.log(dataToSubmit);
      // this.setState({
      //   modalSuccess: true
      // });
    } else {
      let errorsArray = [];

      for (let key in formCopy) {
        if (!formCopy[key].valid) {
          errorsArray.push(formCopy[key].errorMsg);
        }
      }

      this.setState({
        loading: false,
        hasErrors: true,
        modalVisible: true,
        errorsArray
      });
    }
  };

  showErrosArray = errors =>
    errors
      ? errors.map((item, i) => (
          <Text key={i} style={styles.errorItem}>
            - {item}
          </Text>
        ))
      : null;

  clearErrors = () => {
    this.setState({
      hasErrors: false,
      modalVisible: false,
      errorsArray: []
    });
  };

  resetSellItScreen = () => {
    const formCopy = this.state.form;

    for (let key in formCopy) {
      formCopy[key].valid = false;
      formCopy[key].value = "";
    }

    this.setState({
      modalSuccess: false,
      hasErrors: false,
      errorsArray: [],
      loading: false
    });

    // dispatch action to clear the store....
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader />
        <ScrollView>
          <View style={styles.formInputContainer}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.mainTitle}>Sell your things</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <Text>Select a category</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  placeholder="Select a category"
                  type={this.state.form.category.type}
                  value={this.state.form.category.value}
                  onValueChange={value => this.updateInput("category", value)}
                  options={this.state.form.category.options}
                />
              </View>
            </View>

            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.secondTitle}>
                Describe what you are selling
              </Text>
            </View>

            <View>
              <Text>Please add the title, be descriptive</Text>
              <Input
                placeholder="Enter a title"
                type={this.state.form.title.type}
                value={this.state.form.title.value}
                onChangeText={value => this.updateInput("title", value)}
                overRideStyle={styles.inputText}
              />
            </View>

            <View>
              <Input
                placeholder="Enter a description"
                type={this.state.form.description.type}
                value={this.state.form.description.value}
                onChangeText={value => this.updateInput("description", value)}
                multiline={true}
                numberOfLiens={4}
                overRideStyle={styles.inputTextMultiLine}
              />
            </View>

            <View>
              <Text
                style={{
                  marginTop: 20,
                  marginBottom: 20
                }}
              >
                How much you want for that item?
              </Text>
              <Input
                placeholder="Enter a price"
                type={this.state.form.price.type}
                value={this.state.form.price.value}
                onChangeText={value => this.updateInput("price", value)}
                overRideStyle={styles.inputText}
                keyboardType={"numeric"}
              />
            </View>

            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.secondTitle}>
                Add your contact information
              </Text>
            </View>

            <View>
              <Text>Please enter your email</Text>
              <Input
                placeholder="Enter your email"
                type={this.state.form.email.type}
                value={this.state.form.email.value}
                onChangeText={value => this.updateInput("email", value)}
                overRideStyle={styles.inputText}
                autoCapitalize={"none"}
                keyboardType={"email-address"}
              />
            </View>

            {!this.state.loading ? (
              <Button
                title="Sell It"
                color="#6b0000"
                onPress={this.submitFormHandler}
              />
            ) : null}

            <Modal
              animationType="slide"
              visible={this.state.modalVisible}
              onRequestClose={() => {}}
              presentationStyle="formSheet"
            >
              <View style={{ padding: 20, marginTop: 30 }}>
                {this.showErrosArray(this.state.errorsArray)}
                <Button title="Back to Form" onPress={this.clearErrors} />
              </View>
            </Modal>

            <Modal
              animationType="slide"
              visible={this.state.modalSuccess}
              onRequestClose={() => {}}
              presentationStyle="pageSheet"
            >
              <View style={{ padding: 20, marginTop: 30 }}>
                <Text>Well done!</Text>
                <Button
                  title="Go back Home"
                  onPress={() => {
                    this.resetSellItScreen();
                    this.props.navigation.navigate("Home");
                  }}
                />
              </View>
            </Modal>
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
  formInputContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 20
  },
  mainTitle: {
    fontFamily: "Avenir-Roman",
    fontSize: 30,
    color: "#00ada9",
    fontWeight: "bold"
  },
  secondTitle: {
    fontFamily: "Avenir-Roman",
    fontSize: 20,
    color: "#00ada9",
    marginTop: 30,
    marginBottom: 30,
    fontWeight: "bold"
  },
  inputText: {
    backgroundColor: "#f2f2f2",
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "#fff",
    padding: 10,
    width: "100%"
  },
  inputTextMultiLine: {
    backgroundColor: "#f2f2f2",
    borderWidth: 0,
    borderRadius: 0,
    borderColor: "#fff",
    padding: 10,
    minHeight: 100,
    width: "100%"
  },
  errorItem: {
    fontFamily: "Avenir-Roman",
    fontSize: 16,
    color: "red",
    marginBottom: 10
  }
});

function mapStateToProps(state) {
  return {
    Articles: state.Articles,
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addArticle, autoSignIn }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(AddPost));
