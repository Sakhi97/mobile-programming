import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("shoppingList.db");

export default function App() {
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, product text, amount text);"
      );
    });

    updateList();
  }, []);

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql("select * from items", [], (_, { rows }) => {
        setShoppingList(rows._array);
      });
    });
  };

  const addItem = () => {
    if (product !== "" && amount !== "") {
      db.transaction(tx => {
        tx.executeSql("insert into items (product, amount) values (?, ?)", [product, amount]);
      }, null, updateList);
      setProduct("");
      setAmount("");
    }
  }

  const clearList = () => {
    db.transaction(tx => {
      tx.executeSql("delete from items");
    }, null, updateList);
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql("delete from items where id = ?", [id]);
    }, null, updateList);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping List</Text>

      <TextInput
        style={styles.input}
        placeholder="Product"
        onChangeText={text => setProduct(text)}
        value={product}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount"
        onChangeText={text => setAmount(text)}
        value={amount}
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
      <FlatList
        style={styles.listContainer}
        data={shoppingList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={{ fontSize: 20 }}>{item.product} ({item.amount})</Text>
            <Button title="Bought" onPress={() => deleteItem(item.id)} />
          </View>
        )}
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
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
