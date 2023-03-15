import React, { useState, useEffect } from 'react';
import { View, Text, Button, Linking, Permissions, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  // const [permissionStatus, setPermissionStatus] = useState(null);

  // useEffect(() => {
  //   checkPermission();
  // }, []);

  // const checkPermission = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   setPermissionStatus(status);
  // };

  // const handleSettingsPress = () => {
  //   Linking.openSettings();
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Permissions</Text>
        <View style={styles.permissionRow}>
          <Text style={styles.permissionLabel}>Localisation</Text>
          <Text style={styles.permissionStatus}>{permissionStatus}</Text>
        </View>
        <Button title="Open Settings" onPress={handleSettingsPress} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  permissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  permissionLabel: {
    fontSize: 16,
  },
  permissionStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
  },
});
