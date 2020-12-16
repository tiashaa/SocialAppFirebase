  
import React,{useState} from "react";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [currentUser,setCurrentUser] = useState({});
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  return(
      <AuthContext.Provider value={{
          currentUser:currentUser,
          setCurrentUser:setCurrentUser,
          isLoggedIn:isLoggedIn,
          setIsLoggedIn:setIsLoggedIn,
      }}>
          {props.children}
      </AuthContext.Provider>
  );
};

export {AuthContext,AuthProvider};