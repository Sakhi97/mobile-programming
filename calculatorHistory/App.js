import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ScrollView } from 'react-native';

export default function App() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const addButton = () => {
    const num1 = parseFloat(input1); 
    const num2 = parseFloat(input2);
    if (!isNaN(num1) && !isNaN(num2)) {
      const calculation = `${num1} + ${num2} = ${num1 + num2}`;
      const result = num1 + num2;
      setResult(result);
      setHistory([...history, calculation]);
    } else {
      setResult("Error: Invalid Input");
    }
  }

  const subtractButton = () => {
    const num1 = parseFloat(input1); 
    const num2 = parseFloat(input2);
    if (!isNaN(num1) && !isNaN(num2)) {
      const calculation = `${num1} - ${num2} = ${num1 - num2}`;
      const result = num1 + num2;
      setResult(result);
      setHistory([...history, calculation]);
    } else {
      setResult("Error: Invalid Input");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calculator</Text>

      <Text style={styles.result}>Result: {result}</Text>

      <TextInput
        style={styles.input}
        onChangeText={text => setInput1(text)}
        value={input1}
        keyboardType="numeric"
        placeholder="Enter number 1"
      />

      <TextInput
        style={styles.input}
        onChangeText={text => setInput2(text)}
        value={input2}
        keyboardType="numeric"
        placeholder="Enter number 2"
      />

      <View style={styles.buttonContainer}>
         <Button
          title="+"
          onPress={addButton}
          />
          <Button
            title="-"
            onPress={subtractButton}
            />
      </View>

      <Text style={styles.historyHeader}>History</Text>
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={{fontSize: 20}}>{item}</Text>}
        />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 70,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  input: {
    width: 200,
    borderColor: 'black',
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },

  historyHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
});

