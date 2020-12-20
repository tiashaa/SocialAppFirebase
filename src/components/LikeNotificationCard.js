import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";

const LikeNotificationCard = (props) => {
  return (
    <Card>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar
                containerStyle={{ backgroundColor: "cyan" }}
                rounded
                icon={{
                  name: "thumbs-o-up",
                  type: "font-awesome",
                  color: "black",
                }}
                activeOpacity={1}
              />
              <Text style={{ paddingHorizontal: 10 }}>
                {props.author} Liked Your Post.
              </Text>
            </View>
          </Card>
  );
};

export default LikeNotificationCard;