import * as Battery from "expo-battery";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const [batteryLevel, setBatteryLevel] = useState(null);

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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Afficher le niveau de batterie" onPress={getBatteryLevel} />
      {batteryLevel && <Text>Niveau de batterie : {batteryLevel}%</Text>}

      <Button title="Envoyer à l'API" onPress={sendBatteryToAPI} />
    </View>
  );
}
