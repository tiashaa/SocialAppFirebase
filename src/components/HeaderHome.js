import React from "react";
import {StyleSheet} from "react-native";
import {Header} from "react-native-elements";
import {AuthContext} from "../providers/AuthProvider";
import * as firebase from "firebase";

const HeaderHome = (props) => {
    return(
        <AuthContext.Consumer>
            {(auth)=> (
                <Header
                    leftComponent={{
                        icon: "menu",
                        color: "#fff",
                        onPress: props.drawerFunction
                    }}
                    centerComponent={{text: "The Blog", style: {color: "#fff"}}}
                    rightComponent={{
                        icon: "lock-outline",
                        color: "#fff",
                        onPress: () => {
                            firebase
                                .auth()
                                .signOut()
                                .then(() => {
                                    auth.setIsLoggedIn(false);
                                    auth.setCurrentUser({});
                                })
                                .catch((error) => {
                                    alert(error);
                                });
                        },
                    }}
                />
            )}
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({

});

export default HeaderHome;