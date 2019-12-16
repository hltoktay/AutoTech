import React from "react";
import { Platform, Text, Easing, Animated, View, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

// SCREENS
import Login from "./components/Auth";
import Home from "./components/Home";
import AddPost from "./components/Admin/AddPost";
import SideDrawer from "./components/SideDrawer";
import Article from "./components/Article";
import NotAllow from "./components/Admin/AddPost/notAllow";

import MyPost from "./components/Screens/MyPost";
import Screen2 from "./components/Screens/screen2";
import Screen3 from "./components/Screens/screen3";

import CardFormScreen from './components/Scenes/CardFormScreen'

const ArticleStack = createStackNavigator({
  Article: Article,
  CardFormScreen: CardFormScreen
}, );

const HomeStack = createStackNavigator(
  {
    Home: Home,
    SellIt: AddPost,
    Article: ArticleStack
  },
  {
    headerMode: "none",
    mode: "modal",
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 500,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0]
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1]
        });

        return { opacity, transform: [{ translateY }] };
      }
    })
  }
);

const SellStack = createStackNavigator(
  {
    Home: Home,
    SellIt: AddPost,
    Article: ArticleStack
  },
  {
    initialRouteName: "SellIt",
    headerMode: "none"
  }
);

const AppStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    SellIt: SellStack
  },
  {
    tabBarOptions: {
      activeTintColor: "#6b0000",
      showLabel: true,
      activeBackgroundColor: "#ffcaca",
      inactiveBackgroundColor: "#6b0000",
      style: {
        backgroundColor: "#6b0000"
      }
    },
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focuses, horizantal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        if (routeName === "Home") {
          iconName = `md-search`;
        } else if (routeName === "SellIt") {
          iconName = `md-gift`;
        }

        return <Icon name={iconName} size={25} color={tintColor} />;
      }
    })
  }
);

const AuthStack = createStackNavigator(
  {
    Login: Login
  },
  {
    initialRouteName: "Login",
    title: "Main",
    headerMode: "none"
  }
);

const DrawerStack = createDrawerNavigator(
  {
    Home: { screen: AppStack },
    SellIt: { screen: AddPost },
    MyPost: { screen: MyPost },
    Setting: { screen: Screen3 },
    // Logout: { screen: AuthStack }
  },
  {
    contentComponent: props => <SideDrawer {...props} />,
    drawerType: "slide",
    drawerPosition: "left"

  
  }
);

export const RootNavigator = () => {
  return createAppContainer(
    createSwitchNavigator(
      {
        Auth: AuthStack,
        App: DrawerStack
      },
      {
        initialRouteName: "Auth"
      }
    )
  );
};
