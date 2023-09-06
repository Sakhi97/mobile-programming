import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ScrollView } from 'react-native';

export default function App() {
  const [inputItem, setInputItem] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  const addItem = () => {
    if (inputItem !== "") {
      setShoppingList([...shoppingList, inputItem]);
      setInputItem("");
    }
  }

  const clearList = () => {
    setShoppingList([]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping List</Text>

      <TextInput
        style={styles.input}
        onChangeText={text => setInputItem(text)}
        value={inputItem}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Add Item"
          onPress={addItem}
          style={styles.button}
        />

        <Button
          title="Clear List"
          onPress={clearList}
          style={styles.button} 
        />
      </View>

      <Text style={styles.listHeader}>Shopping List:</Text>
      <ScrollView style={styles.listContainer}>
        <FlatList
          data={shoppingList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={{ fontSize: 20 }}>{item}</Text>}
        />
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 20,
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
    justifyContent: 'space-between', 
    width: '100%', 
    paddingHorizontal: 40, 
  },
  button: {
    flex: 1, 
    marginHorizontal: 5, 
    backgroundColor: 'blue', 
  },
  listHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  listContainer: {
    maxHeight: 200,
    padding: 10,
  },
});
