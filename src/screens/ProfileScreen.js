import React from "react";
import {View,StyleSheet,ScrollView} from "react-native";
import {Text,Button,Card,Avatar,Input,Header} from "react-native-elements";
import {AuthContext} from "../providers/AuthProvider";
import {AntDesign,Entypo} from "@expo/vector-icons";

const ProfileScreen = (props) => {
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <ScrollView style={styles.viewStyle}>
                    <Header
                        leftComponent={{
                            icon:"menu",
                            color:"#fff",
                            onPress: () => {
                                props.navigation.toggleDrawer();
                            }
                        }}
                        centerComponent={{text:"The Office",style:{color:"$fff"}}}

                    />
                    <Card containerStyle={{borderRadius:20}}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Text style={{paddingHorizontal:10}}>
                                This is the user profile.
                            </Text>
                        </View>
                    </Card>
                </ScrollView>
            )}
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({

});

export default ProfileScreen;