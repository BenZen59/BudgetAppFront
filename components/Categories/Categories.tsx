import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CategoryIconPicker } from './CategoryIconPicker';

const expensesIcons = [
  { name: 'creditcard', color: '#1abc9c' },
  { name: 'book', color: '#3498db' },
  { name: 'questioncircleo', color: '#9b59b6' },
  { name: 'home', color: '#e67e22' },
  { name: 'laptop', color: '#e74c3c' },
  { name: 'shoppingcart', color: '#f1c40f' },
  { name: 'car', color: '#2ecc71' },
  { name: 'medicinebox', color: '#34495e' },
];

const incomeIcons = [
  { name: 'wallet', color: '#2980b9' },
  { name: 'smileo', color: '#8e44ad' },
  { name: 'gift', color: '#f39c12' },
  { name: 'bank', color: '#27ae60' },
  { name: 'trophy', color: '#d35400' },
  { name: 'like2', color: '#c0392b' },
];

export function Categories() {
  const [selectedIcon, setSelectedIcon] = useState('creditcard');
  const [selectedCategory, setSelectedCategory] = useState<
    'Dépenses' | 'Revenus'
  >('Dépenses');

  const iconsToDisplay =
    selectedCategory === 'Dépenses' ? expensesIcons : incomeIcons;

  return (
    <View style={styles.categorieContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedCategory === 'Dépenses' && styles.buttonSelected,
          ]}
          onPress={() => setSelectedCategory('Dépenses')}
        >
          <Text
            style={[
              styles.buttonText,
              selectedCategory === 'Dépenses' && styles.buttonTextSelected,
            ]}
          >
            Dépenses
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedCategory === 'Revenus' && styles.buttonSelected,
          ]}
          onPress={() => setSelectedCategory('Revenus')}
        >
          <Text
            style={[
              styles.buttonText,
              selectedCategory === 'Revenus' && styles.buttonTextSelected,
            ]}
          >
            Revenus
          </Text>
        </TouchableOpacity>
      </View>

      <CategoryIconPicker
        icons={iconsToDisplay}
        selectedIcon={selectedIcon}
        onSelect={setSelectedIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categorieContainer: {
    marginLeft: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 30,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: '#006F47',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  buttonTextSelected: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
