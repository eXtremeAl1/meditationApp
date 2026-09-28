import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function DetailScreen() {
  // Preuzimanje podataka iz rutera
  const { title, description } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      
      {/* Dugme za povratak na listu */}
      <Button title="Povratak na listu (Back)" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  description: { fontSize: 18, marginBottom: 30, textAlign: 'center', color: '#444' },
});