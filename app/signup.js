import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Step 2: Form Validation
  const validateForm = () => {
    if (!userName.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Greška", "Molimo popunite sva polja.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Greška", "Unesite validnu email adresu.");
      return false;
    }

    return true;
  };

  // Step 3: Handle Registration and Navigation
  const handleRegister = async () => {
    if (validateForm()) {
      try {
        const userDetails = { userName, email, password };
        await AsyncStorage.setItem("user", JSON.stringify(userDetails));

        Alert.alert("Uspjeh", "Registracija uspješna!", [
          { text: "OK", onPress: () => router.replace("/login") },
        ]);
      } catch (error) {
        Alert.alert("Greška", "Došlo je do greške pri čuvanju podataka.");
      }
    }
  };

  // Step 1: Set Up UI Components
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={userName}
        onChangeText={setUserName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.navPrompt}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  navPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  linkText: {
    color: "blue",
    fontWeight: "bold",
  },
});