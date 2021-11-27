import React, { useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import {signup} from '../firebase/firebase';
import tw from 'tailwind-react-native-classnames';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignup = () => {
    if (email !== '' && password !== '') {
      signup(email, password)
        .then(() => console.log('accoutn created success'))
        .catch(err => console.log(`Login err: ${err}`));
    }
  };

  return (
    <View style={tw`flex items-center justify-center w-full`}>
      <View style={tw` mx-2 my-10 sm:my-auto w-full max-w-xs`}>
        <View style={tw`w-full
          px-6 py-10 sm:px-10 sm:py-6 
          bg-white rounded-lg shadow-md lg:shadow-lg`}>
          <Text style={tw`text-center font-semibold text-3xl lg:text-4xl text-gray-800 mb-8`}>Create new account</Text>
          <View>

          </View>

          <View style={tw` py-2`}>
            <View style={tw`block text-xs font-semibold text-gray-400 uppercase`}>E-mail</View>
            <TextInput
              style={tw`block w-full py-3 px-1 mt-2 
        text-gray-800 appearance-none 
        border-b-2 border-gray-100
        focus:text-gray-500 focus:outline-none focus:border-gray-200`}
              placeholder='Enter email'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={tw` py-2`}>

            <View style={tw`block text-xs font-semibold text-gray-400 uppercase mt-2`}>Password</View>
            <TextInput
              style={tw`block w-full py-3 px-1 mt-2 
         text-gray-800 appearance-none 
         border-b-2 border-gray-100
         focus:text-gray-500 focus:outline-none focus:border-gray-200`}
              placeholder='Enter password'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={true}
              textContentType='password'
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View style={tw`block w-full   p-2 mt-5 `}>
            <Button onPress={onSignup} title='Create' />
          </View>
          <View style={tw`block w-full  p-2`}>
            <Button
              color='#f57c00'
              onPress={() => navigation.navigate('login')}
              title='Go to Login'
            /></View>
        </View></View></View>
  );
}
