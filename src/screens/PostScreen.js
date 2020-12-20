import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, AsyncStorage } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import Comments from "./../components/Comments";
import HeaderHome from "../components/HeaderHome";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { useNetInfo } from "@react-native-community/netinfo";
import * as firebase from "firebase";
import "firebase/firestore";


const PostScreen = (props) => {
  const netinfo = useNetInfo();
  if (netinfo.type != "unknown" && !netinfo.isInternetReachable) {
    alert("No Internet!");
  }
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);


  const loadComments = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("comments")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        let User = [];
        querySnapshot.forEach((doc) => {
          User.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setComments(User);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  useEffect(() => {
    loadComments();
  }, []);


  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
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
          AUTHOR
        </Text>
      </View>
      <Text style={{
          paddingVertical: 10,
        }}>
        POST
      </Text>
            <Input
              placeholder="Comment here"
              leftIcon={<Entypo name="pencil" size={24} color="black" />}
              onChangeText={(currentText) => {
                setInput(currentText);
              }}
            />
            <Button
              title="Comment"
              type="outline"
              onPress={function () {
                setLoading(true);
                firebase
                  .firestore().collection("comments").add({
                    userId: auth.CurrentUser.uid,
                    body: input,
                    author: auth.CurrentUser.displayName,
                    created_at: firebase.firestore.Timestamp.now(),
                    likes: [],
                  })
                  .then(() => {
                    setLoading(false);
                    alert("Comment created Successfully!");
                  })
                  .catch((error) => {
                    setLoading(false);
                    alert(error);
                  });
              }}
            />
          </Card>
          <ActivityIndicator size="large" color="red" animating={loading} />

          <FlatList
            data={comments}
            renderItem={({ item }) => {
              return (
                <Comments
                  author={item.data.author}
                  body={item.data.body}
                />
              );
            }}
          />
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default PostScreen;