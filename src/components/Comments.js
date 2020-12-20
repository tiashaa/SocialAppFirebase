import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

const Comments = (props) => {
  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          containerStyle={{ backgroundColor: "#ffab91" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "black" }}
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4>
          {props.author}
        </Text>
      </View>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.body}
      </Text>
    </Card>
  );
};

export default Comments;