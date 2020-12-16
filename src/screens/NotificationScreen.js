import React from "react";
import {View,StyleSheet,ScrollView} from "react-native";
import {Text,Card,Avatar,Header} from "react-native-elements";
import {AuthContext} from "../providers/AuthProvider";
import HeaderHome from "../components/HeaderHome";


const NotificationScreen = (props) => {
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <ScrollView style={styles.viewStyle}>
                    <HeaderHome
                        drawerFunction = {() => {
                            props.navigation.toggleDrawer();
                        }}
                    />
                    <Card>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Avatar
                                containerStyle={{backgroundColor:"cyan"}}
                                rounded
                                icon={{
                                    name:"thumbs-o-up",
                                    type: "font-awesome",
                                    color: "black"
                                }}
                                activeOpacity={1}
                            />
                            <Text style={{paddingHorizontal:10}}>
                                Pam Beesley liked your post.
                            </Text>
                        </View>
                    </Card>
                </ScrollView>
            )}
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({

    textStyle : {
        fontSize: 30
    },

    viewStyle:{
        flex : 1,
    },
});

export default NotificationScreen;
