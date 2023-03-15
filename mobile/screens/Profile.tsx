import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = (): JSX.Element => {
    const route = useRoute();
    const navigation = useNavigation();
    const [user, setUser] = useState<null | { companyName: string, phone: string, address: string, longitude: number, latitude: number, email: string }>(null);
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

    const handleLogout = async () => {
        // Clear the user ID from async storage
        await AsyncStorage.removeItem('userId');
        // Navigate to the login screen
        navigation.navigate('Login');
    }

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

            {user ? (
                <>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>

                    <Text style={styles.title}>{user.companyName}</Text>
                    <Text style={styles.text}>{user.phone}</Text>
                    <Text style={styles.text}>{user.address}</Text>
                    <Text style={styles.text}>{user.longitude}</Text>
                    <Text style={styles.text}>{user.latitude}</Text>
                    <Text style={styles.text}>{user.email}</Text>
                </>
            ) : (
                <>
                    <Text style={styles.text}>Your profile is empty.</Text>
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerButtonText}>Register now</Text>
                    </TouchableOpacity>
                </>
            )}
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
        fontSize: 16,
        marginBottom: 10,
    },
    registerButton: {
        backgroundColor: '#0000ff',
        padding: 10,
        borderRadius: 5,
    },
    registerButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: '#0000ff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    logoutButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },


});

export default ProfileScreen;
