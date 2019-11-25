import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, Button } from "react-native";

import Input from "../../utils/input";
import ValidationRules from "../../utils/validationRules";

import { withNavigation } from "react-navigation";

import CustomHeader from "../../Header/index";

class AddPost extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: false,
    hasErrors: false,
    form: {
      category: {
        value: "",
        name: "category",
        valid: false,
        type: "picker",
        options: ["Select", "Sports", "Music", "Clothing", "Electronics"],
        rules: {
          isRequired: true
        }
      },
      title: {
        value: "",
        name: "title",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          maxLength: 50
        }
      },
      description: {
        value: "",
        name: "description",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          maxLength: 150
        }
      },
      price: {
        value: "",
        name: "price",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          maxLength: 6
        }
      },
      email: {
        value: "",
        name: "email",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          maxLength: true
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

  submitFormHandler = () => {
    let isFormValid = true;
    let dataToSubmit = {};
    const formCopy = this.state.form;

    for (let key in formCopy) {
      isFormValid = isFormValid && formCopy[key].valid;
      dataToSubmit[key] = this.state.form[key].value;
    }

    if (isFormValid) {
      console.log(dataToSubmit);
    } else {
      console.log("Has errors");
    }
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
  }
});

export default withNavigation(AddPost);
