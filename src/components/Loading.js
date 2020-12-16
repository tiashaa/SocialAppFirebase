import React from "react";
import {View,ActivityIndicator} from "react-native";

const Loading = (props) => {
    return (
        <View style={{flex:1,justifyContent:"center", backgroundColor:"#7A9EFF"}}>
            <ActivityIndicator
                size={"large"}
                color={"blue"}
                animating={true}
            />
        </View>
    );
};

export default Loading;