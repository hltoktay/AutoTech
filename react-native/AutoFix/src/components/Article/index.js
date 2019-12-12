import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity
} from "react-native";
import { HeaderBackButton } from "react-navigation-stack";

import {Button } from 'native-base'

import Icon from "react-native-vector-icons/Ionicons";

import stripe from 'tipsi-stripe';
import axios from 'axios';



stripe.setOptions({
  publishableKey: 'pk_test_4xpMrbSDQbi6XfZLMt6DIHf2'
})


class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      token: null,
    }
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


  handleCardPayPress = async (props) => {
    try {
      this.setState({ loading: true, token: null })
      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Gunilla Haugeh',
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: 'Georgia',
            country: 'US',
            postalCode: '31217',
            email: 'ghaugeh0@printfriendly.com',
          },
        },
      })

      this.setState({ loading: false, token })
    } catch (error) {
      this.setState({ loading: false })
    }
  }

  makePayment =  () => {
    this.setState({loading: true})

    axios({
      method: "POST",
      url: 'https://us-central1-autotech-bc113.cloudfunctions.net/completePaymentWithStripe',
      data: {
        amount: 100,
        currency: 'gbp',
        token: this.state.token,
      },
    }).then(response => {
      console.log(response);
      this.setState({loading: false})
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    const { navigation  } = this.props;

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
          <Icon.Button
            name="ios-mail"
            color="#6b0000"
             size={24}
            backgroundColor="#fff"
            onPress={() => openEmail()}
          >
            <Text>Contact:{navigation.getParam("passOwner")}</Text>
          </Icon.Button>

        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button 
        onPress={this.handleCardPayPress} 
        block  
        loading={this.state.loading}
        style={{padding: 15, backgroundColor: '#ffcaca', borderWidth: 1, borderColor: '#6b0000' }}>
            <Text style={{color: '#6b0000'}}>Buy Now</Text>
          </Button>
      

          <Button onPress={() => alert('Item Added')} block  style={{padding: 15, backgroundColor: '#ffcaca', borderWidth: 1, borderColor: '#6b0000'}}>
            <Text style={{color: '#6b0000'}}>Add Cart</Text>
          </Button>
        </TouchableOpacity>

        {this.state.token &&
            <View style={styles.paymentContent}>


              <View>
                <Text style={styles.token}>
                  Token: {this.state.token.tokenId}
           
                </Text>
              </View>

              <View>
                <TouchableOpacity  loading={this.state.loading} onPress={this.makePayment}>
                  <Text style={{ color: '#6b0000' }}>Make Payment</Text>
                </TouchableOpacity>
              </View>

            </View>     
             
            }
               

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
    bottom: 236,
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
    borderTopColor: "#eee",
  },
  token: {
    color: '#2e2e2e',
    marginTop: 70,
    alignContent: 'center'
  },
  paymentContent: {
    position: 'absolute', 
    marginTop: 50, 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 10
  }
});

export default Article;
