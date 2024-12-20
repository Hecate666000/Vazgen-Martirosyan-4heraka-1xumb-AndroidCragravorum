// Mileage Tracker App using React Native
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

const App = () => {
  const [mileageEntries, setMileageEntries] = useState([]);
  const [startMileage, setStartMileage] = useState('');
  const [endMileage, setEndMileage] = useState('');
  const [tripName, setTripName] = useState('');

  const handleAddTrip = () => {
    if (!startMileage || !endMileage || !tripName) {
      alert('Please fill all fields');
      return;
    }

    const start = parseFloat(startMileage);
    const end = parseFloat(endMileage);

    if (end <= start) {
      alert('End mileage must be greater than start mileage');
      return;
    }

    const distance = end - start;
    const newEntry = {
      id: Math.random().toString(),
      tripName,
      distance,
    };

    setMileageEntries([...mileageEntries, newEntry]);
    setStartMileage('');
    setEndMileage('');
    setTripName('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mileage Tracker</Text>

      <TextInput
        style={styles.input}
        placeholder='Trip Name'
        value={tripName}
        onChangeText={setTripName}
      />

      <TextInput
        style={styles.input}
        placeholder='Start Mileage'
        value={startMileage}
        onChangeText={setStartMileage}
        keyboardType='numeric'
      />

      <TextInput
        style={styles.input}
        placeholder='End Mileage'
        value={endMileage}
        onChangeText={setEndMileage}
        keyboardType='numeric'
      />

      <Button title='Add Trip' onPress={handleAddTrip} />

      <FlatList
        data={mileageEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text style={styles.entryText}>
              {item.tripName}: {item.distance} miles
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  entry: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  entryText: {
    fontSize: 16,
  },
});

export default App;
