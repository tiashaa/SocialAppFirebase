import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostScreen from "./../Screens/PostScreen" ;

const PostStack = createStackNavigator();
const PostStackScreen = () => {
  return (
    <PostStack.Navigator initialRouteName="Post">
      <PostStack.Screen
        name="Post"
        component={PostScreen}
        options={{ headerShown: false }}
      />
    </PostStack.Navigator>
  );
};

export default PostStackScreen;