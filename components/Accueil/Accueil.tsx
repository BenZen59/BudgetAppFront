import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function Accueil() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue sur l&apos;écran Accueil !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
