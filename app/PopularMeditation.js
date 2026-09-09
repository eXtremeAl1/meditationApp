import { useState } from "react";
import { useRouter } from "expo-router";
import {COLORS, FONT, SHADOWS, SIZES} from '../constants/theme'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import useFetch from "../hook/useFetch";


const PopularMeditation = () => {
    const router = useRouter();
    const { data, isLoading, error } = useFetch("search", {
      query: "React developer",
      num_pages: "1",
    });
  
    const [selectedMeditation, setselectedMeditation] = useState();
    const renderMeditationCard = ({ item }) => (
        <TouchableOpacity
          style={styles.container(selectedMeditation, item)}
          onPress={() => handleCardPress(item)}
        >
          <TouchableOpacity style={styles.logoContainer(selectedMeditation, item)}>
            <Image
              source={{ uri: item?.image }}
              resizeMode="cover"
              style={styles.logoImage}
            />
          </TouchableOpacity>
          <View style={styles.tabsContainer}>
            <Text style={styles.companyName} numberOfLines={1}>
              {item.target}
            </Text>
          </View>
    
          <View style={styles.infoContainer}>
            <Text
              style={styles.meditationName(selectedMeditation, item)}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <View style={styles.infoWrapper}>
              <Text style={styles.publisher(selectedMeditation, item)}>
                {item?.shortDescription}
              </Text>
            </View>
          </View>
          <Text style={styles.location}> {item.duration}</Text>
        </TouchableOpacity>
      );

      const handleCardPress = (item) => {
        router.push(`/meditation-details/${item.id}`);
        setselectedMeditation(item.id);
      };
    
    
  
   return(
    <View style={styles.container} testID="popularContainer">
        <View style={styles.header} testID="popularHeader">
            <Text style={styles.headerTitle}>Popular Meditations</Text>
            <TouchableOpacity></TouchableOpacity>
        </View>
        <View style={styles.cardsContainer}>
            {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
            ) : error ? (
            <Text>Something went wrong</Text>
            ) : (
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderMeditationCard}
                contentContainerStyle={{ columnGap: SIZES.medium }}
                horizontal
            />
            )}
        </View>

    </View>
   )
  };
  
  export default PopularMeditation;
