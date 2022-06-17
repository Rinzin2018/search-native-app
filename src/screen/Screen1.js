import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SearchBar from "../common/Search";
import { characterServices } from "../services/CharacterServices";
import Ionicons from "react-native-vector-icons/Ionicons";
import FilterModel from "./FilterModel";

const Screen1 = ({ navigation }) => {
  const [artists, setArtists] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [querySearch, setQuerySearch] = useState("");
  const [appearanceFilter, setAppearanceFilter] = useState(null);
  const [open, setOpen] = useState(false);

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
    setRefreshing(true);
    setAppearanceFilter(null);
    setQuerySearch("");
    fetchCharacters();
  };

  const handleNavigate = (characterData) => {
    navigation.navigate("Screen2", { character: characterData });
  };

  const handleQuerySearch = (value) => {
    setQuerySearch(value);
  };

  const handleAppearance = (data) => {
    setOpen(false);
    setAppearanceFilter(parseInt(data));
  };

  return (
    <SafeAreaView style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
      <View style={{ marginBottom: 10 }}>
        <SearchBar placeholder={"Search..."} onChange={handleQuerySearch} />
      </View>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{
          marginBottom: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, marginTop: 1 }}>
          {appearanceFilter ? `Season ${appearanceFilter}` : "Select season"}
        </Text>
        <View style={{ marginLeft: 4 }}>
          <Ionicons name="chevron-down" size={25} color="white" />
        </View>
      </TouchableOpacity>
      <FilterModel open={open} handleAction={handleAppearance} />
      {artists?.length > 0 && (
        <FlatList
          style={{ marginBottom: 70 }}
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
