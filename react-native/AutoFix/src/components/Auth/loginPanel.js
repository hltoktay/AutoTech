import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated, Image
} from 'react-native';

import ImageLogo from '../../../assets/image/logo1.png';
import LoginForm from './LoginForm';

class LoginPanel extends Component {

    state = {
        animFinish: false,
        imageLogo: new Animated.Value(0),
        inputForm: new Animated.Value(0)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.show && !this.state.animFinish){
            Animated.parallel([
                Animated.timing(this.state.imageLogo, {
                    toValue: 1,
                    duration: 1000
                }),
                Animated.timing(this.state.inputForm, {
                    toValue: 1,
                    duration: 1500
                })
            ]).start(
                this.setState({animFinish: true})
            )
        }
    }

    render() {
        return (
            <View >
                <Animated.View
                style={{
                    opacity: this.state.imageLogo
                }}
                >
                    <Image
                    style={
                        this.props.orientation === 'portrait'
                        ? styles.imageStylePortrait
                        : styles.imageStyleLandscape
                    }
                    source={ImageLogo}
                    resizeMode={'contain'}
                    />
                </Animated.View>
                <Animated.View
                    style={{
                        opacity: this.state.inputForm,
                        top: this.state.inputForm.interpolate({
                            inputRange:[0, 1],
                            outputRange: [100, 30]
                        })
                    }}
                >
                   <LoginForm 
                   platform={this.props.platform}
                   />
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageStylePortrait: {
        width: 340,
        height: 250
    },
    imageStyleLandscape: {
        width: 370,
        height: 0
    }
  });

  export default LoginPanel;