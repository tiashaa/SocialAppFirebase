import React, {useState} from "react";
import {View,StyleSheet} from "react-native";
import {Button, Text, Card, Input} from "react-native-elements";
import {FontAwesome,Ionicons,AntDesign,Feather} from '@expo/vector-icons';
import 'firebase/firestore'
import * as firebase from "firebase";
import Loading from "../components/Loading";

const SignupScreen = ({navigation}) => {

    const [Name, setName] = useState('');
    const [ID,setID] = useState('');
    const [Email,setEmail] = useState('');
    const [Pass,setPass] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    if (isLoading)
    {
        return (
            <Loading/>
        );
    }

    else {
        return (
            <View style={styles.viewStyle}>
                <Card>
                    <Card.Title>Welcome to BlogApp!</Card.Title>
                    <Card.Divider/>
                    <Input
                        leftIcon={<Ionicons name={"ios-person"} size={24} color={"black"}/>}
                        placeholder={"Name"}
                        onChangeText={(currentInput) => setName(currentInput)}
                    />
                    <Input
                        leftIcon={<Ionicons name={"ios-school"} size={24} color={"black"}/>}
                        placeholder={"Student ID"}
                        onChangeText={(currentInput) => setID(currentInput)}
                    />
                    <Input
                        leftIcon={<FontAwesome name={"envelope"} size={24} color={"black"}/>}
                        placeholder={"E-mail Address"}
                        onChangeText={(currentInput) => setEmail(currentInput)}
                    />
                    <Input
                        placeholder={"Password"}
                        leftIcon={<Feather name={"key"} size={24} color={"black"}/>}
                        secureTextEntry={true}
                        onChangeText={(currentInput) => setPass(currentInput)}
                    />
                    <Button
                        icon={<AntDesign name={"user"} size={24} color={"white"}/>}
                        title={"Sign Up"}
                        type={"solid"}
                        onPress={() => {
                            if (Name && ID && Email && Pass) {
                                setIsLoading(true);
                                firebase
                                    .auth()
                                    .createUserWithEmailAndPassword(Email, Pass)
                                    .then((userCreds) => {
                                        userCreds.user.updateProfile({displayName: Name});
                                        firebase
                                            .firestore()
                                            .collection("users")
                                            .doc(userCreds.user.uid)
                                            .set({
                                                name: Name,
                                                studentID: ID,
                                                email: Email,
                                            })
                                            .then(() => {
                                                setIsLoading(false);
                                                alert("Account created successfully!");
                                                console.log(userCreds.user);
                                                navigation.navigate("Signin")
                                            })
                                            .catch((error) => {
                                                setIsLoading(false);
                                                alert(error)
                                            });

                                    })
                                    .catch((error) => {
                                        setIsLoading(false);
                                        alert(error);
                                    });
                            } else {
                                alert("Fields can not be empty!");
                            }
                        }}
                    />
                    <Button
                        icon={<AntDesign name={"login"} size={24} color={"dodgerblue"}/>}
                        title={"Already have an account?"}
                        type={"clear"}
                        onPress={() => {
                            navigation.navigate("Signin")
                        }}
                    />
                </Card>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    viewStyle:{
        ...StyleSheet.absoluteFillObject,
        justifyContent:'center',
        backgroundColor:'#7A9EFF'
    }
});

export default SignupScreen;