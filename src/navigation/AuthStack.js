import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";


const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
    return(
        <AuthStack.Navigator initialRouteName={"Signin"}>
            <AuthStack.Screen  name = {"Signin"} component={SigninScreen} options={{headerShown:false}}/>
            <AuthStack.Screen name={"Signup"} component={SignupScreen} options={{headerShown:false}}/>
        </AuthStack.Navigator>
    );
};

export default AuthStackScreen;