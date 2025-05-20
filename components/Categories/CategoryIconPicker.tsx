import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  icons: string[];
  selectedIcon: string;
  selectedColor: string;
  onSelect: (icon: string) => void;
};

export function CategoryIconPicker({
  icons,
  selectedIcon,
  selectedColor,
  onSelect,
}: Props) {
  const renderItem = ({ item }: { item: string }) => {
    const isSelected = item === selectedIcon;

    return (
      <TouchableOpacity
        style={[
          styles.iconContainer,
          { backgroundColor: isSelected ? selectedColor : '#eee' },
        ]}
        onPress={() => onSelect(item)}
      >
        <MaterialIcons name={item} size={28} color='#fff' />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={icons}
      renderItem={renderItem}
      keyExtractor={(item) => item}
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
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
