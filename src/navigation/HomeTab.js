import HomeScreen from "../screens/HomeScreen";
import {AntDesign, Entypo, Ionicons} from "@expo/vector-icons";
import NotificationScreen from "../screens/NotificationScreen";
import React from "react";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";

const HomeTab = createMaterialBottomTabNavigator();

const HomeTabScreen = () => {
    return(
        <HomeTab.Navigator initialRouteName={HomeScreen}>
            <HomeTab.Screen
                name = {"Home"}
                component = {HomeScreen}
                options = {{
                    tabBarLabel:"Home",
                    tabBarIcon: ({focused}) =>
                        focused ? (
                            <Entypo name={"home"} color={"white"} size={26}/>
                        ):(
                            <AntDesign name={"home"} color={"white"} size={22}/>
                        ),
                }}
            />
            <HomeTab.Screen
                name={"Notification"}
                component={NotificationScreen}
                options = {{
                    tabBarLabel:"Notification",
                    tabBarIcon: ({focused}) =>
                        focused ? (
                            <Ionicons name={"ios-notifications"} color={"white"} size={26}/>
                        ):(
                            <Ionicons name={"ios-notifications-outline"} color={"white"} size={22}/>
                        ),
                }}
            />
        </HomeTab.Navigator>
    );
};

export default HomeTabScreen;