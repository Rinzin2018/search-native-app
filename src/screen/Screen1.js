import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SearchBar from "../common/Search";
import { characterServices } from "../services/CharacterServices";

const Screen1 = ({ navigation }) => {
  const [artists, setArtists] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [querySearch, setQuerySearch] = useState("");
  const [appearanceFilter, setAppearanceFilter] = useState(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    await characterServices().then((response) => {
      setArtists(response);
      setRefreshing(false);
    });
  };

  const imageUrl = (imageData) => {
    return imageData ? { uri: imageData } : null;
  };

  const filterData = () => {
    if (appearanceFilter) {
      return (
        artists
          .filter((val) =>
            val.name.toLowerCase().includes(querySearch.toLowerCase()),
          )
          .filter((val) => val.appearance.includes(appearanceFilter)) || []
      );
    } else {
      return (
        artists.filter((val) =>
          val.name.toLowerCase().includes(querySearch.toLowerCase()),
        ) || []
      );
    }
  };

  const onRefresh = () => {
    setArtists([]);
    setRefreshing(true);
    fetchCharacters();
  };

  const handleNavigate = (characterData) => {
    navigation.navigate("Screen2", { character: characterData });
  };

  const handleQuerySearch = (value) => {
    setQuerySearch(value);
  };

  return (
    <SafeAreaView style={{ marginTop: 15 }}>
      <View style={{ marginBottom: 10 }}>
        <SearchBar placeholder={"Search..."} onChange={handleQuerySearch} />
      </View>
      {artists?.length > 0 && (
        <FlatList
          style={{ marginBottom: 40 }}
          data={filterData()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={item?.id}
              onPress={() => handleNavigate(item)}
            >
              <View style={styles.artistSubContainer}>
                <Image
                  style={styles.imageArtist}
                  source={imageUrl(item?.img)}
                />
                <Text style={styles.artistName}>{item?.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={3}
          columnWrapperStyle={styles.row}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  artistSubContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  imageArtist: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "#F3F3F338",
  },
  artistName: {
    flex: 1,
    width: 110,
    fontSize: 14,
    color: "#fff",
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default Screen1;
