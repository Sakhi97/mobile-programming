import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState("");

  const addButton = () => {
    const num1 = parseFloat(input1); 
    const num2 = parseFloat(input2);
    if (!isNaN(num1) && !isNaN(num2)) {
      setResult(num1 + num2);
    } else {
      setResult("Error: Invalid Input");
    }
   
  }

  const substractButton = () => {
    const num1 = parseFloat(input1); 
    const num2 = parseFloat(input2);
    if (!isNaN(num1) && !isNaN(num2)) {
      setResult(num1 - num2);
    } else {
      setResult("Error: Invalid Input");
    }
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput
        style={{ width: 200, borderColor: 'black', marginBottom: 10, padding: 5, borderWidth: 1 }}
        onChangeText={text => setInput1(text)}
        value={input1}
        keyboardType="numeric"
      />

      <TextInput
        style={{ width: 200, borderColor: 'black',marginBottom: 10, padding: 5, borderWidth: 1 }}
        onChangeText={text => setInput2(text)}
        value={input2}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <Button
          title="+"
          onPress={addButton}
          
        />
        <Button
          title="-"
          onPress={substractButton}
       
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row', 
    marginTop: 10,
  },
});