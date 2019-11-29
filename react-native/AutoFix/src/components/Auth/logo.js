import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated, Easing
} from 'react-native';


class Logo extends Component {

    state = {
        autoAnim: new Animated.Value(0),
        techAnim: new Animated.Value(0)
      }

      UNSAFE_componentWillMount() {
        Animated.sequence([
          Animated.timing(this.state.autoAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.easeOutCubic
          }),
           Animated.timing(this.state.techAnim, {
             toValue: 1,
             duration: 500,
             easing: Easing.easeOutCubic
           })
        ]).start(() => {
          this.props.showLogin()
        })
      }


    render() {
        console.log(this.props.orientation)
        return(
            <View>
                 <View style={
                     this.props.orientation === 'portrait'
                     ? styles.logoStylesPortrait
                     : styles.logoStylesLandscape
                 }>
              <Animated.View
              style={{
                opacity: this.state.AutoAnim,
                top: this.state.techAnim.interpolate({
                  inputRange: [0,1],
                  outputRange: [100, 0]
                })
              }}
              >
                <Text style={styles.auto}>Auto</Text>
              </Animated.View>
              <Animated.View
              style={{opacity: this.state.techAnim}}
              >
              <Text style={styles.tech}>Tech</Text></Animated.View>
          </View>
        </View>
        
        )
    }
}

const styles = StyleSheet.create({
    logoStylesPortrait: {
    marginTop: 100,
    flex: 1,
    flexDirection: 'row',
    maxHeight: 100
  },
  logoStylesLandscape : {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    maxHeight: 50
  },
  auto: {
    fontSize: 40,
    color: '#b0acac',
    fontFamily: 'TimesNewRomanPSMT',
  },
  tech: {
    fontSize: 40,
    color: '#e10000',
    fontFamily: 'TimesNewRomanPSMT',
  }
});

export default Logo;