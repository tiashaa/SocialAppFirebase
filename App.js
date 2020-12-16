import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {AuthProvider, AuthContext} from "./src/providers/AuthProvider";
import AuthStackScreen from "./src/navigation/AuthStack";
import AppDrawerScreen from "./src/navigation/AppDrawer";
import * as firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyBWE31HR4whHehXwoMPWr-2jxlB15-PO1c",
  authDomain: "labtask2-795ac.firebaseapp.com",
  projectId: "labtask2-795ac",
  storageBucket: "labtask2-795ac.appspot.com",
  messagingSenderId: "887229408542",
  appId: "1:887229408542:web:7172742947017d4fb6950f"
};

if(!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);


function App() {
    return (
        <AuthProvider>
            <AuthContext.Consumer>
                {
                    (auth) => (
                        <NavigationContainer>
                            {auth.isLoggedIn ? <AppDrawerScreen/>:<AuthStackScreen/>}
                        </NavigationContainer>
                    )
                }
            </AuthContext.Consumer>
        </AuthProvider>
    );
}

export default App;