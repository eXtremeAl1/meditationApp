import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user !== null) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Greška pri provjeri stanja prijave:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginState();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Redirect href={isLoggedIn ? "/home" : "/signup"} />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});