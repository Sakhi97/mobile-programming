import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const API_URL = 'https://api.apilayer.com/exchangerates_data/latest';
const API_KEY = 'x3JWMCk9MgWhdfJ4X13IGigDV0vglb3R'; 

export default function App() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('');
  const [result, setResult] = useState(0);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(API_URL, { headers: { 'apikey': API_KEY } });
      const data = await response.json();
      setRates(data.rates);
    } catch (err) {
      setError('Failed to fetch rates.');
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const rateConversion = () => {
    const rate = rates[currency];
    if (rate && amount) {
      setResult((Number(amount) / rate).toFixed(2));
    } else {
      setResult(0);
    }
};


  return (
    <View style={styles.container}>
        <StatusBar hidden={true} />

        <Text style={{ fontSize: 24, marginBottom: 20 }}>{result} €</Text>

        

        <TextInput
            style={styles.input}
            placeholder='Enter Amount'
            keyboardType="numeric"
            onChangeText={text => setAmount(text)}
        />

        <View style={styles.pickerButtonContainer}>
            <TouchableOpacity style={styles.convertButton} onPress={rateConversion}>
                <Text style={styles.buttonText}>Convert</Text>
            </TouchableOpacity>

            <Picker
                style={styles.picker}
                selectedValue={currency}
                onValueChange={value => setCurrency(value)}
            >
                <Picker.Item label="Select Currency" value="" />
                {Object.keys(rates).map(item => (
                    <Picker.Item key={item} label={item} value={item} />
                ))}
            </Picker>
        </View>
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  input: {
    fontSize: 20,
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  pickerButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between', 
    },
    picker: {
        flex: 0.7,
        height: 50,
        marginLeft: 10,
        marginBottom: 30
    },
    convertButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 130
    },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
