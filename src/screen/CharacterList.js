import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SearchBar from "../common/Search";
import { characterServices } from "../services/CharacterServices";

const CharacterList = ({ navigation }) => {
  const [artists, setArtists] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ last_page: 1 });
  const [refreshing, setRefreshing] = useState(false);
  const [querySearch, setQuerySearch] = useState("");

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    await characterServices().then((response) => {
      alert(JSON.stringify(response));
    });
  };

  const imageUrl = (imageData) => {
    return imageData ? { uri: imageData } : null;
  };

  const onRefresh = () => {
    setArtists([]);
    setRefreshing(true);
    setPage(1);
  };

  const handleNavigate = (characterData) => {
    navigation.navigate("CharacterDetail", { character: characterData });
  };

  const handleQuerySearch = (value) => {
    setArtists([]);
    setPage(1);
    setQuerySearch(value);
  };

  return (
    <SafeAreaView style={{ marginTop: 15 }}>
      <View style={{ marginBottom: 10 }}>
        <SearchBar placeholder={"Search..."} onChange={handleQuerySearch} />
      </View>
      {artists?.length > 0 && (
        <FlatList
          data={artists}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={(e) => {
            if (meta.last_page > page) {
              setPage(page + 1);
            }
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={item?.id}
              onPress={() => handleNavigate(item?.id)}>
              <View style={styles.artistSubContainer}>
                <Image
                  style={styles.imageArtist}
                  source={imageUrl(item?.attributes?.avatar)}
                />
                <Text style={styles.artistName}>{item?.attributes?.name}</Text>
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

export default CharacterList;
