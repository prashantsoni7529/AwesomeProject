import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import  Logo from './logoSvgComp';

const Login = ({ logInData }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  //Login creds
  // username: "singhsourabh074@gmail.com",
  // pass: "sourabhsingh282"

  const handleLogin = async () => {
    // Handle login logic here
    console.log("Email is ", email, "Pass is ", password);
    if (!email.trim() || !password.trim()) {
      alert("Email and password can't be empty");
    }
    else {
      try {
        let response = await fetch(
          'http://54.82.231.80:3117/affivo/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: email,
            pass: password

          }
          )
        });
        let json = await response.json();
        console.log("json  returned is ", json);
        if (json.hasOwnProperty('data') && json['data'] !== "") {
          alert("You are logged in");
          logInData(json);

        }
        else {
          alert("Username and password are not correct");
        }

        // return json.movies;
      } catch (error) {
        console.log("Error coming in login ",error);
        alert("Please check your network connection");
      }
    }

  };

  return (
    <View style={styles.container}>
      <Logo/>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        required
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    flex: 1,
    backgroundColor: '#ffffcc',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0080ff',
    width: '40%',
    height: 35,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Login;
