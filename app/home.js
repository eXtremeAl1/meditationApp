import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS, SIZES } from "../constants/theme";

import ScreenHeaderBtn from "./ScreenHeaderBtn";
import Welcome from "./Welcome";
import PopularMeditation from "./PopularMeditation";
import DailyMeditation from "./DailyMeditation";


const Home = () => {

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      const user = await AsyncStorage.getItem("userDetails");

      console.log("user", user);

      setUserDetails(user);
    } catch (error) {
      console.log("Error loading user details:", error);
    }
  };


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
      }}
    >

      {/* HEADER */}
      <ScreenHeaderBtn />


      {/* SCROLLABLE CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
          testID="screensDisplay"
        >

          {/* WELCOME */}
          <Welcome
            userDetails={
              userDetails
                ? JSON.parse(userDetails)
                : null
            }
          />


          {/* POPULAR MEDITATIONS */}
          <PopularMeditation />


          {/* DAILY MEDITATION */}
          <DailyMeditation />

        </View>

      </ScrollView>

    </SafeAreaView>
  );
};


export default Home;