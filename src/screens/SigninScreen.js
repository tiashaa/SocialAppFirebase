import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import {Button, Text, Card, Input} from "react-native-elements";
import {FontAwesome, Feather, AntDesign} from '@expo/vector-icons';
import {AuthContext} from "../providers/AuthProvider";

import * as firebase from "firebase";
import Loading from "../components/Loading";

const SigninScreen = ({navigation}) => {

    const [Email, setEmail] = useState('');
    const [Pass, setPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) {
        return (
            <Loading/>
        );
    }
    else {
        return (
            <AuthContext.Consumer>
                {
                    (auth) => (
                        <View style={styles.viewStyle}>
                            <Card>
                                <Card.Title>Welcome to BlogApp!</Card.Title>
                                <Card.Divider/>
                                <Input
                                    leftIcon={<FontAwesome name={"envelope"} size={24} color={"black"}/>}
                                    placeholder={"E-mail Address"}
                                    onChangeText={(currentInput) => setEmail(currentInput)}
                                />
                                <Input
                                    placeholder={"Password"}
                                    leftIcon={<FontAwesome name={"key"} size={24} color={"black"}/>}
                                    secureTextEntry={true}
                                    onChangeText={(currentInput) => setPass(currentInput)}
                                />
                                <Button
                                    icon={<AntDesign name={"login"} size={24} color={"white"}/>}
                                    title={"Sign In"}
                                    type={"solid"}
                                    onPress={() => {
                                        setIsLoading(true);
                                        firebase
                                            .auth()
                                            .signInWithEmailAndPassword(Email, Pass)
                                            .then((userCreds) => {
                                                setIsLoading(false);
                                                auth.setIsLoggedIn(true);
                                                auth.setCurrentUser(userCreds.user);
                                            })
                                            .catch((error) => {
                                                setIsLoading(false);
                                                alert(error)
                                            })
                                    }}
                                />
                                <Button
                                    icon={<AntDesign name={"user"} size={24} color={"dodgerblue"}/>}
                                    title={"Don't have an account?"}
                                    type={"clear"}
                                    onPress={() => {
                                        navigation.navigate("Signup")
                                    }}
                                />
                            </Card>
                        </View>
                    )
                }
            </AuthContext.Consumer>
        );
    }
};

const styles = StyleSheet.create({
    viewStyle: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        backgroundColor: '#7A9EFF'
    }
});

export default SigninScreen;