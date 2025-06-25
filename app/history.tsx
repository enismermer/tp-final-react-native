import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

type BatteryData = {
  id: string;
  timestamp: string;
  level: number;
};

export default function HistoryScreen() {
  const [data, setData] = useState<BatteryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://685ba7df89952852c2da65a5.mockapi.io/api/v1/battery")
      .then((res) => res.json())
      .then((json) => {
        setData(json.reverse()); // Affiche du plus récent au plus ancien
        setLoading(false);
      });
  }, []);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Chargement des données...</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.date}>{formatDate(item.timestamp)}</Text>
          <Text style={styles.level}>🔋 {item.level}%</Text>
        </View>
      )}
      // Enverra videment si aucune donnée
      ListEmptyComponent={
        <Text style={styles.emptyText}>Aucune donnée à afficher.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  date: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  level: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
