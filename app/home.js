import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Home() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.userName);
      }
    };
    getUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Dobrodošli, {userName || "Korisnik"}!</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Odjavi se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});