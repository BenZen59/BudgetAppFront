import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function Accueil() {
  const [total, setTotal] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    'Dépenses' | 'Revenus'
  >('Dépenses');

  useEffect(() => {
    axios
      .get('http://localhost:3000/bankaccounts/total')
      .then((response) => {
        console.log('Réponse API :', response.data);
        setTotal(response.data.total ?? 0);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du total :', error);
      });
  }, []);
  console.log(total);

  return (
    <View style={styles.container}>
      <View style={styles.totalBox}>
        <View style={styles.totalRow}>
          <Icon
            name='account-balance-wallet'
            size={24}
            color='#fff'
            style={styles.icon}
          />
          <Text style={styles.totalLabel}>Total :</Text>
        </View>
        {total === null ? (
          <ActivityIndicator color='#fff' />
        ) : (
          <Text style={styles.totalAmount}>
            {Number.isInteger(total) ? `${total} €` : `${total.toFixed(2)} €`}
          </Text>
        )}
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  totalBox: {
    backgroundColor: '#006F47',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  totalLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%', // même largeur que totalBox
    marginBottom: 20,
    marginTop: 20,
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
    textDecorationLine: 'none',
  },
  buttonTextSelected: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
