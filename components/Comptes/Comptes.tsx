import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function Comptes() {
  const [total, setTotal] = useState<number | null>(null);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountsRes, totalRes] = await Promise.all([
          axios.get('http://localhost:3000/bankaccounts'),
          axios.get('http://localhost:3000/bankaccounts/total'),
        ]);

        setAccounts(accountsRes.data);
        setTotal(totalRes.data.total ?? 0);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <View style={styles.accountList}>
        {loading ? (
          <ActivityIndicator size='large' />
        ) : (
          <FlatList
            data={accounts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.accountCard}>
                <Text style={styles.accountName}>{item.account_name}</Text>
                <Text style={styles.accountAmount}>
                  {Number.isInteger(item.amount)
                    ? `${item.amount} €`
                    : `${item.amount.toFixed(2)} €`}
                </Text>
              </View>
            )}
          />
        )}
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
  accountList: {
    width: '90%',
    marginTop: 10,
  },
  accountCard: {
    backgroundColor: '#1E1F14',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  accountName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountAmount: {
    color: '#fff',
    fontSize: 18,
    marginTop: 5,
  },
});
