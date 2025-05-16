import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function Accueil() {
  const [total, setTotal] = useState<number | null>(null);

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
});
