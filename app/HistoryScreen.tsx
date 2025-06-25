import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';

export default function HistoryScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://685ba7df89952852c2da65a5.mockapi.io/api/v1/battery')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Text>{item.timestamp} - {item.level}%</Text>
      )}
    />
  );
}
