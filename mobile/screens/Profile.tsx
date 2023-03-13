import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
    const route = useRoute();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUserData() {
            const userId = await AsyncStorage.getItem('userId');
            console.log(userId);

            try {
                const response = await fetch(`http://192.168.9.30:5000/user/getUserById/${userId}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUserData();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{user.companyName}</Text>
            <Text style={styles.text}>{user.phone}</Text>
            <Text style={styles.text}>{user.address}</Text>
            <Text style={styles.text}>Longitude: {user.longitude}</Text>
            <Text style={styles.text}>Latitude: {user.latitude}</Text>
            <Text style={styles.text}>{user.email}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        marginBottom: 5,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ProfileScreen;
