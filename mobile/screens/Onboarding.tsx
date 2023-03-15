import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import Swiper from "react-native-swiper";

type OnboardingItem = {
  id: number;
  title: string;
  subtitle: string;
  image: number;
};

type Props = {
  navigation: any;
};

export default function Onboarding({ navigation }: Props) {
  const onboarding: OnboardingItem[] = [
    {
      id: 1,
      title: "Bienvenue sur MFN",
      subtitle: "Transitaire Marocain",
      image: require("../assets/container1.png"),
    },
    {
      id: 2,
      title: "Votre transitaire au Maroc",
      subtitle: "Votre partenaire logistique",
      image: require("../assets/container2.png"),
    },
    {
      id: 3,
      title: "Choisissez votre destination",
      subtitle: "Vos biens et marchandises trouveront leur chemin vers la destination de votre choix ",
      image: require("../assets/container3.png"),
    },
  ];

  return (
    <>
    <View style={styles.container}>
   
      <Swiper
        paginationStyle={{
          position: "absolute",
          bottom: 50,
        }}
        activeDotColor="#3F497F"
        activeDotStyle={{ width: 20, height: 8 }}
        dotColor="gray"
        loop={false}
      >
        {onboarding.map((item) => (
          <View style={styles.slide} key={item.id}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        ))}
      </Swiper>

      <TouchableOpacity
        style={{
          backgroundColor: "#0E8388",
          paddingVertical: 15,
          borderRadius: 10,
          marginHorizontal: 20,
          marginBottom: 20,
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Get Started
        </Text>
      </TouchableOpacity>
      </View>
    </>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
});
