import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const [mileageEntries, setMileageEntries] = useState([]);
  const [startMileage, setStartMileage] = useState('');
  const [endMileage, setEndMileage] = useState('');
  const [tripName, setTripName] = useState('');
  const [editId, setEditId] = useState(null);

  const handleAddOrEditTrip = () => {
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

    if (editId) {
      // Editing existing entry
      setMileageEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === editId ? { ...entry, tripName, distance } : entry
        )
      );
      setEditId(null);
    } else {
      
      // Adding new entry
      const newEntry = {
        id: Math.random().toString(),
        tripName,
        distance,
      };
      setMileageEntries([...mileageEntries, newEntry]);
    }

    setStartMileage('');
    setEndMileage('');
    setTripName('');
  };

  const handleEdit = (id) => {
    const entry = mileageEntries.find((item) => item.id === id);
    if (entry) {
      setTripName(entry.tripName);
      setStartMileage(entry.distance.toString());
      setEndMileage('');
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    setMileageEntries((prevEntries) =>
      prevEntries.filter((entry) => entry.id !== id)
    );
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

      <Button
        title={editId ? 'Update Trip' : 'Add Trip'}
        onPress={handleAddOrEditTrip}
      />

      <FlatList
        data={mileageEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text style={styles.entryText}>
              {item.tripName}: {item.distance} miles
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(item.id)}
              >
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#ffc107',
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 5,
    borderRadius: 5,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
