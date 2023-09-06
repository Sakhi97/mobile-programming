import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';

export default function History({ route }) {
  const { history } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <Text style={{fontSize: 20}}>{item.value}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold', 
    marginBottom: 20,    
  },
});
