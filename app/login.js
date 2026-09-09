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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Step 2: Form Validation
  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Greška", "Unesite email i lozinku.");
      return false;
    }
    return true;
  };

  // Step 3: Authenticate User
  const handleLogin = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("user");

      if (storedUserData) {
        const user = JSON.parse(storedUserData);

        if (user.email === email && user.password === password) {
          Alert.alert("Uspjeh", `Dobrodošli nazad, ${user.userName}!`);
          router.replace("/home");
        } else {
          Alert.alert("Greška", "Pogrešan email ili lozinka.");
        }
      } else {
        Alert.alert("Greška", "Korisnik nije pronađen. Prvo se registrujte.");
      }
    } catch (error) {
      Alert.alert("Greška", "Greška prilikom autentifikacije.");
    }
  };

  // Step 4: Handle Login Button Press
  const handleLoginPress = () => {
    if (validateForm()) {
      handleLogin();
    }
  };

  // Step 1: Setup UI Components
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.navPrompt}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.linkText}>Sign Up</Text>
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