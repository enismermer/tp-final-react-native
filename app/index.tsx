import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Battery from "expo-battery";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [batteryLevel, setBatteryLevel] = useState<string | null>(null);
  const router = useRouter()

  const getBatteryLevel = async () => {
    const level = await Battery.getBatteryLevelAsync();
    setBatteryLevel((level * 100).toFixed(0));
  };

  const sendBatteryToAPI = async () => {
    const level = await Battery.getBatteryLevelAsync();
    const payload = {
      level: (level * 100).toFixed(0),
      timestamp: new Date().toISOString()
    };

    await fetch('https://685ba7df89952852c2da65a5.mockapi.io/api/v1/battery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/login');
  };

  const goToHistory = () => {
    router.push('/history');
  };

  return (
    <View style={styles.container}>
      {/* Bouton Se déconnecter en haut à droite */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>

      {/* Contenu principal */}
      <View style={styles.centerContent}>

        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Choissisez un bouton (ce que vous voulez)</Text>

        <TouchableOpacity style={styles.button} onPress={getBatteryLevel}>
          <Text style={styles.buttonText}>Afficher le niveau de batterie</Text>
        </TouchableOpacity>

        {batteryLevel && (
          <Text style={styles.batteryText}>🔋 {batteryLevel}%</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={sendBatteryToAPI}>
          <Text style={styles.buttonText}>Envoyer à l'API</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={goToHistory}>
          <Text style={styles.buttonText}>Voir l'historique</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  logoutButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#ff4d4d",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    zIndex: 1,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    width: 250,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  batteryText: {
    fontSize: 20,
    marginVertical: 10,
  },
});