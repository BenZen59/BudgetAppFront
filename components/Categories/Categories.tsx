import React, { useState } from 'react';
import { View } from 'react-native';
import { CategoryIconPicker } from './CategoryIconPicker';

const iconData = [
  { name: 'creditcard', color: '#1abc9c' },
  { name: 'book', color: '#3498db' },
  { name: 'questioncircleo', color: '#9b59b6' },
  { name: 'home', color: '#e67e22' },
  { name: 'laptop', color: '#e74c3c' },
  { name: 'shoppingcart', color: '#f1c40f' },
  { name: 'car', color: '#2ecc71' },
  { name: 'medicinebox', color: '#34495e' },
];

export function Categories() {
  const [selectedIcon, setSelectedIcon] = useState('creditcard');

  return (
    <View>
      <CategoryIconPicker
        icons={iconData}
        selectedIcon={selectedIcon}
        onSelect={setSelectedIcon}
      />
    </View>
  );
}
