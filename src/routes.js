import React from "react";
import { Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

// SCREENS
import Login from "./components/Auth";
import Home from "./components/Home";
import AddPost from "./components/Admin/AddPost";
import SideDrawer from "./components/SIdeDrawer";

const HomeStack = createStackNavigator(
  {
    Home: Home,
    SellIt: AddPost
  },
  {
    initialRouteKey: "Home"
  }
);

const SellStack = createStackNavigator(
  {
    Home: Home,
    SellIt: AddPost
  },
  {
    initialRouteName: "SellIt"
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
          iconName = `ios-apps`;
        } else if (routeName === "SellIt") {
          iconName = `md-gift`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    })
  }
);

const AuthStack = createStackNavigator(
  {
    Login: Login
  },
  {
    headerMode: "none"
  }
);

const DrawerStack = createDrawerNavigator({
  Home: {
    screen: SideDrawer
  }
});

export const RootNavigator = () => {
  return createAppContainer(
    createSwitchNavigator(
      {
        App: AppStack,
        Auth: AuthStack,
        Drawer: DrawerStack
      },
      {
        initialRouteName: "Auth"
      }
    )
  );
};
