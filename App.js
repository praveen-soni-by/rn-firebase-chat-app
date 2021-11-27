import React, { useState, createContext, useContext, useEffect } from 'react';
import { Platform, StatusBar, View,ActivityIndicator } from "react-native";
import Login from "./src/components/Login";
import Chat from "./src/components/Chat";
import Signup from "./src/components/Signup";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/firebase/firebase';

const Stack = createNativeStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};


function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='chat' component={Chat} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='login' component={Login} />
      <Stack.Screen name='signup' component={Signup} />
    </Stack.Navigator>
  );
}


function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>

      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const paddingTop = Platform.OS === "android" ? StatusBar.currentHeight : 0;

export default function App() {
  return (
    <AuthenticatedUserProvider>
    <RootNavigator />
  </AuthenticatedUserProvider>
  );
}
