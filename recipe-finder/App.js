import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchIng, setSearchIng] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFind = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchIng}`);
      const data = await response.json();
      if(data && data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    } catch(err) {
      setError('Failed to fetch recipes.');
    } finally {
      setIsLoading(false);
    }
  }, [searchIng]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Recipe Finder</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={searchIng}
          onChangeText={setSearchIng}
          placeholder="Enter ingredient"
        />
        <Button title="Find" onPress={handleFind} />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : recipes.length === 0 ? (
        <Text style={styles.errorText}>No recipes found.</Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <View style={styles.recipeContainer}>
              <Image source={{ uri: item.strMealThumb }} style={styles.thumbnail} />
              <Text style={styles.title}>{item.strMeal}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  inputContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  recipeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  thumbnail: {
    width: 80,
    height: 70,
    borderRadius: 20,
    marginRight: 10,
  },
  title: {
    fontSize: 17,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default App;
