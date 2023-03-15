import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Icon } from "react-native-elements";

interface User {
  id: number;
  companyName: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: number;
  email: string;
}

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadUsers = async () => {
    try {
      const response = await fetch(
        "http://192.168.0.171:5000/user/allUsers"
      );
      const text = await response.text();
      const data = JSON.parse(text) as User[];
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/dash.png")}
        style={styles.bgImage}
      >
        {isLoading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListEmptyComponent={() => (
              <View
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Text>No items to display</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          >
            {users.map((user, index) => (
              <UserCard key={`${index}-${user.id}`} user={user} />
            ))}
          </ScrollView>
        )}
      </ImageBackground>
    </View>
  );
};

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const handleCall = () => {
    Linking.openURL(`tel:${user.phone}`);
  };

  return (
    <Card
      containerStyle={{
        borderRadius: 10,
        backgroundColor: "#fff",
        padding: 20,
        margin: 20,
      }}
    >
      <Card.Title>{user.companyName}</Card.Title>
      <Card.Divider />
      <Text style={styles.cardText}>{user.address}</Text>
      <Text style={styles.cardText}>{user.latitude}</Text>
      <Text style={styles.cardText}>{user.longitude}</Text>
      <Text style={styles.cardText}>{user.phone}</Text>
      <Text style={styles.cardText}>{user.email}</Text>
      <TouchableOpacity style={styles.reserveButton}
        onPress={handleCall}
      >
        <Text style={styles.buttonText}>Call Now</Text>
      </TouchableOpacity>
    </Card>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#0E8388",

    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  cardText: {
    marginBottom: 10,
  },
  cardBattery: {
    marginBottom: 10,
    color: "#3ED400",
  },
  success: {
    marginBottom: 10,
    color: "#3ED400",
  },
  failed: {
    marginBottom: 10,
    color: "#FF0000",
  },
  reserveButton: {
    backgroundColor: "#0E8388",
    borderRadius: 10,

    padding: 10,

    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",

    fontSize: 16,
  },
  loadingText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",

    fontSize: 20,
  },
});

export default DashboardScreen;


