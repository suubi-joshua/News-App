import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Button } from 'react-native';

const API_KEY = "fbabcbff94d64fe884d9cdae7bbef553";
const API_URL = `https://newsapi.org/v2/everything?q=comic&sortBy=publishedAt&apiKey=${API_KEY}`;

export default function App() {
  const [items, setItems] = useState([]);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setItems(data.articles);
        setFetchingData(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setFetchingData(false);
      });
  }, []);

  if (fetchingData) {
    return <Loading />;
  } else {
    return <Home data={items} />;
  }
}

const Home = ({ data }) => {
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={({ item }) => <Item data={item} />}
      />
    </View>
  );
};

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
}

const Item = ({ data }) => {
  return (
    <View style={styles.itemContainer}>
      <Image style={styles.itemImage} source={{ uri: data.urlToImage }} />
      <Text style={styles.itemTitle}>{data.title}</Text>
      <Text style={styles.itemDescription}>{data.description}</Text>
      
      <View style={styles.itemBtn}>
        <Button onPress={() => { console.log("Button pressed") }} title="Read" />
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
  },

  itemContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    width: '100%',
    padding: 5,
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
    padding: 20,
    color: 'black',
    backgroundColor: 'white',
  },
  itemDescription: {
    fontSize: 16,
    padding: 10,
    color: 'black',
    backgroundColor: 'black',
  },

  itemBtn: {
    flexDirection: 'row',
    backgroundColor: 'white',
  }
});
