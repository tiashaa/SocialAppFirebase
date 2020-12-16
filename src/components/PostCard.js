import React, {useState} from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import {Text, Button, Card, Header, Input, Avatar} from "react-native-elements";
import {AuthContext} from "../providers/AuthProvider";
import {AntDesign} from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";



const PostCard = (props) => {
    const [likes, setLikes] = useState(props.likes);
    const [comments, setComments] = useState(props.comments);
    return (
        <Card>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Avatar
                    containerStyle={{backgroundColor: "#ffab91"}}
                    rounded
                    icon={{name: "user", type: "font-awesome", color: "black"}}
                    activeOpacity={1}
                />
                <Text h4Style={{padding: 10}} h4>
                    {props.author}
                </Text>
            </View>
            <Text style={{fontStyle: "italic"}}>Posted on 10 Aug,2020</Text>
            <Text style={{fontWeight: "normal", fontSize: 16}}>
                {props.date_time}
            </Text>
            <Text style={{paddingVertical: 10}}>
                {props.body}
            </Text>

            <Card.Divider/>

            <View style={{flexDirection: "row", justifyContent: "space-between", paddingBottom: 20}}>
                <Text style={styles.textStyle}>Likes({likes})</Text>
                <Text style={styles.textStyle}>Comments({comments})</Text>
            </View>

            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Button
                    type={"outline"}
                    title={"Like"}
                    icon={<AntDesign name={"like2"} size={24} color={"dodgerblue"}/>}
                    onPress={() => {
                        firebase
                            .firestore()
                            .collection("posts")
                            .doc(props.post_ID)
                            .update({
                                "likes": firebase.firestore.FieldValue.arrayUnion(props.currentUser)
                            })
                            .then(() => {
                                setLikes(likes+1)
                                alert("You liked this post.")
                            })
                            .catch((error) => {
                                alert(error);
                            })
                    }}
                />
                <Button
                    type={"solid"}
                    title={"Comment"}
                />
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({

    textStyle: {
        fontSize: 15,
        color: "dodgerblue",
    },

    viewStyle: {
        flex: 1,
    }
});

export default PostCard;