import React, {useState,useEffect} from "react";
import {View, StyleSheet, ScrollView, FlatList, ActivityIndicator} from "react-native";
import {Text,Button,Card,Avatar,Input,Header} from "react-native-elements";
import {AuthContext} from "../providers/AuthProvider";
import {AntDesign,Entypo} from "@expo/vector-icons";
import {useNetInfo} from "@react-native-community/netinfo";
import PostCard from "../components/PostCard";
import HeaderHome from "../components/HeaderHome";
import getPosts from "../requests/Posts";
import * as firebase from "firebase";
import "firebase/firestore";

const HomeScreen = (props) => {

    const netinfo = useNetInfo();
    if(netinfo.type!=="unknown" && !netinfo.isInternetReachable)
    {
        alert("No Internet Connection!");
    }
    console.log(netinfo);

    const [input,setInput] = useState("");
    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(false);

    const loadPosts = async () => {
        setLoading(true);
        firebase
            .firestore()
            .collection("posts")
            .orderBy("created_at","desc")
            .onSnapshot((querySnapshot) => {
                let temp_posts = [];
                querySnapshot.forEach((doc) => {
                    temp_posts.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setPosts(temp_posts);
                setLoading(false);
            })
            .catch((error) => {
                alert(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        loadPosts();
    },[])

    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.viewStyle}>
                    <HeaderHome
                        drawerFunction = {() => {
                            props.navigation.toggleDrawer();
                        }}
                    />
                    <Card>
                        <Input
                            placeholder={"What's on your mind?"}
                            leftIcon={<Entypo name={"pencil"} size={24} color={"black"}/>}
                            onChangeText={(currentText) => {
                                setInput(currentText);
                            }}
                        />
                        <Button
                            title={"Post"}
                            type = {"outline"}
                            onPress={() => {
                                setLoading(true);
                                firebase
                                    .firestore()
                                    .collection("posts")
                                    .add({
                                        userID:auth.currentUser.uid,
                                        body: input,
                                        author: auth.currentUser.displayName,
                                        created_at: firebase.firestore.Timestamp.now(),
                                        likes: [],
                                        comments: [],
                                    })
                                    .then(() => {
                                        setLoading(false);
                                        alert("Post created successfully!");
                                    })
                                    .catch((error) => {
                                        setLoading(false);
                                        alert(error)
                                    });
                            }}
                        />
                    </Card>

                    <ActivityIndicator
                        size={"large"}
                        color={"blue"}
                        animating={loading}
                    />

                    <FlatList
                        data={posts}
                        keyExtractor = {((item) => item.id.toString())}
                        renderItem={({item}) =>{
                            return (
                                <PostCard
                                    post_ID = {item.id}
                                    currentUser = {auth.currentUser.displayName}
                                    author = {item.data.author}
                                    date_time = {item.data.created_at.date}
                                    body = {item.data.body}
                                    likes = {item.data.likes.length}
                                    comments = {item.data.comments.length}
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

    textStyle : {
        fontSize: 30,
        color: "blue",
    },

    viewStyle:{
        flex : 1,
    },
});

export default HomeScreen;