import * as Battery from "expo-battery";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const [batteryLevel, setBatteryLevel] = useState(null);

  const getBatteryLevel = async () => {
    const level = await Battery.getBatteryLevelAsync();
    setBatteryLevel((level * 100).toFixed(0));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Afficher le niveau de batterie" onPress={getBatteryLevel} />
      {batteryLevel && <Text>Niveau de batterie : {batteryLevel}%</Text>}
    </View>
  );
}
