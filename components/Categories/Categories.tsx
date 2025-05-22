import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export function Categories() {
  const [selectedIcon, setSelectedIcon] = useState('creditcard');
  const [selectedCategory, setSelectedCategory] = useState<
    'Dépenses' | 'Revenus'
  >('Dépenses');
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const validIcons = Object.keys(AntDesign.glyphMap);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(
    (cat) => cat.type === selectedCategory
  );

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <View style={styles.categorieContainer}>
      <View style={styles.buttonContainer}>
        {['Dépenses', 'Revenus'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.button,
              selectedCategory === type && styles.buttonSelected,
            ]}
            onPress={() => setSelectedCategory(type as 'Dépenses' | 'Revenus')}
          >
            <Text
              style={[
                styles.buttonText,
                selectedCategory === type && styles.buttonTextSelected,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id_category.toString()}
        numColumns={4}
        columnWrapperStyle={
          filteredCategories.length >= 4 ? styles.row : undefined
        }
        contentContainerStyle={styles.grid}
        renderItem={({ item: cat }) => {
          const iconName =
            typeof cat.icon?.name_icon === 'string' &&
            validIcons.includes(cat.icon.name_icon)
              ? cat.icon.name_icon
              : 'questioncircleo';

          return (
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() => setSelectedIcon(iconName)}
            >
              <View
                style={[
                  styles.iconWrapper,
                  { backgroundColor: cat.color?.hex || '#ccc' },
                ]}
              >
                <AntDesign name={iconName} size={28} color='#fff' />
              </View>
              <Text style={styles.categoryText}>{cat.name_category}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categorieContainer: {
    marginLeft: 0,
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
  grid: {
    paddingHorizontal: 10,
    gap: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    width: '23%',
    marginBottom: 0,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
});
