import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

type IconItem = {
  name: string;
  color: string;
};

type Props = {
  icons: IconItem[];
  selectedIcon: string;
  onSelect: (iconName: string) => void;
};

export function CategoryIconPicker({ icons, selectedIcon, onSelect }: Props) {
  function renderItem({ item }: { item: IconItem }) {
    const isSelected = item.name === selectedIcon;

    return (
      <TouchableOpacity
        style={[
          styles.iconContainer,
          { backgroundColor: isSelected ? item.color : '#eee' },
        ]}
        onPress={() => onSelect(item.name)}
      >
        <AntDesign name={item.name as any} size={28} color='#fff' />
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      data={icons}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
      numColumns={4}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
    justifyContent: 'center',
  },
  iconContainer: {
    margin: 8,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
