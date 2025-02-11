import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';

export default function TabOneScreen() {
  const [posts, setPosts] = useState<{ id: number; title: string; body: string }[]>([]);

  
useEffect(() => {
  fetch('https://gorest.co.in/public/v2/posts')
  .then(response => response.json())
  .then( 
    (response) =>{
      setPosts(response)
      console.log('its a me mario')
      console.log(response)
    })
  .catch(
    (error) => {console.error(error)}
    )

},[])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Syngery</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      {posts.length > 0 ? (
          posts.map((post) => (
            <View key={post.id} style={styles.postContainer}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postBody}>{post.body}</Text>
            </View>
          ))
        ) : (
          <Text>Loading posts...</Text>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  postContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: '100%',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postBody: {
    fontSize: 14,
  },
});
