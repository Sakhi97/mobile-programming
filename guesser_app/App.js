import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

export default function App() {

  const [input, setInput] = useState("");
  const [randomNum, setRandomNum] = useState(generateRandomNumber());
  const [guesses, setGuesses] = useState(0);
  const [message, setMessage] = useState("Guess a number between 1-100");

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  useEffect(() => {
    setRandomNum(generateRandomNumber());
    setGuesses(0);
    setMessage("Guess a number between 1-100");
  }, []);

  const checkGuess = () => {
    const num = parseFloat(input);

    if (isNaN(num)) {
      Alert.alert("Invalid Input", "Please enter a valid number between 1 and 100.");
    } else {
      setGuesses(guesses + 1);

      if (num === randomNum) {
        Alert.alert("Congratulations!", `You guessed the number in ${guesses} guesses.`);
        setInput("");
        setRandomNum(generateRandomNumber());
        setGuesses(0);
        setMessage("Guess a number between 1-100");
      } else if (num < randomNum) {
        setMessage("Too Low");
        setInput("");
      } else {
        setMessage("Too High");
        setInput("");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>{message}</Text>

      <StatusBar style="auto" />

      <TextInput
        style={{ width: 200, borderColor: 'black', marginBottom: 10, marginTop: 10, padding: 5, borderWidth: 1 }}
        onChangeText={text => setInput(text)}
        value={input}
        keyboardType="numeric"
      />

      <Button title="Guess" onPress={checkGuess} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
