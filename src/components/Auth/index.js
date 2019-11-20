import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';

import { 
  getOrientation, 
  setOrientationListener, 
  removeOrientationListener,
  getPlatform
} from '../../components/utils/misc'

import Logo from './logo';
import LoginPanel from './loginPanel';


 class Auth extends Component {
   constructor(props) {
     super(props)

     this.state = {
       platform: getPlatform(),
       orientation : getOrientation(500),
       logoAnimation: false
     }

     setOrientationListener(this.changeOrientation)
   }

   changeOrientation = () => {
     this.setState({
       orientation: getOrientation(500)
     })
    }

    UNSAFE_componentWillMount(){
      removeOrientationListener()
    }

    showLogin = () => {
     this.setState({
       logoAnimation: true
     })
    }
  
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
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
});

export default Auth;

