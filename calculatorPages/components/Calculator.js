import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Calculator() {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [result, setResult] = useState(0);
    const [history, setHistory] = useState([]);
    const navigation = useNavigation();
  
    const addButton = () => {
        const num1 = parseFloat(input1); 
        const num2 = parseFloat(input2);
        if (!isNaN(num1) && !isNaN(num2)) {
        const sum = num1 + num2;
        setResult(sum);
        const newHistoryItem = { key: Date.now(), value: `${num1} + ${num2} = ${sum}` };
        setHistory([...history, newHistoryItem]);
        } else {
        setResult("Error: Invalid Input");
      }
      };
      
      const subtractButton = () => {
        const num1 = parseFloat(input1); 
        const num2 = parseFloat(input2);
        if (!isNaN(num1) && !isNaN(num2)) {
        const subtraction = num1-num2;
        setResult(subtraction);
        const newHistoryItem = { key: Date.now(), value: `${num1} - ${num2} = ${subtraction}` };
        setHistory([...history, newHistoryItem]);
        } else {
        setResult("Error: Invalid Input");
      }
      };
      
  const navigateToHistory = () => {
    navigation.navigate('History', { history });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>  
        <Text style={{fontSize: 20, marginBottom: 10}} >Result: {result}</Text>

        <TextInput 
          style={styles.inputStyle}
          value={input1} 
          onChangeText={(text) => setInput1(text)}
          keyboardType="numeric"
        />

        <TextInput 
          style={styles.inputStyle}
          value={input2} 
          onChangeText={(text) => setInput2(text)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={addButton} title="+" />
        <Button onPress={subtractButton} title="-" />    
        <Button onPress={navigateToHistory} title="History" />
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'column' 
    },
    inputContainer: {
      marginTop: 70,
      alignItems: 'center',
      flexDirection: 'column' 
    },
    buttonContainer: {
      justifyContent: 'space-around',
      marginHorizontal: 60,
      marginTop: 20,
      flexDirection: 'row' 
    },
    inputStyle:{
      width: 200,
      borderColor: "blue",
      borderWidth: 1,
      marginBottom: 10,
      padding: 10
    },
  });
  