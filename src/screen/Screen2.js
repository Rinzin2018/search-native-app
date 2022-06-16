import React, { useRef } from "react";
import { styles } from "./Style";
import { Animated, Image, SafeAreaView, Text, View } from "react-native";

const Screen2 = ({ route, navigation }) => {
  const { character } = route.params;
  const scrollA = useRef(new Animated.Value(0)).current;
  const imageUrl = (imageData) => {
    return imageData ? { uri: imageData } : null;
  };

  return (
    <SafeAreaView>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      >
        <View style={{ position: "relative" }}>
          <Animated.Image
            style={styles.artistImage(scrollA)}
            source={imageUrl(character?.img)}
          />
          <View style={styles.containerArtist}>
            <View
              style={{
                width: 100,
                height: 100,
                padding: 2,
                borderRadius: 100,
                backgroundColor: "#101727",
              }}
            >
              <Image
                style={{ width: "auto", height: 100, borderRadius: 100 }}
                source={imageUrl(character?.img)}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={{ marginLeft: "32%", marginTop: 5 }}>
            <Text style={styles.artistTitle}>{character?.name || "---"}</Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Text style={styles.artistNickname}>
                {character?.nickname || "---"}
              </Text>
              <Text
                style={[
                  styles.artistStatus,
                  {
                    color:
                      character?.status?.toLowerCase() === "alive" ? "#41cc0e" : "#e10925",
                  },
                ]}
              >
                ({character?.status || "---"})
              </Text>
            </View>
          </View>
          <View
            style={{
              marginLeft: 10,
              marginRight: 10,
              marginTop: "8%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.artistTitle}>Season appearance</Text>
              <Text style={styles.artistTitle}>Occupation</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.artistAppearance}>
                {character?.appearance?.map((val) => val)?.join("   -   ")}
              </Text>
              <Text style={[styles.artistNickname, { textAlign: "left" }]}>
                {character?.occupation || "---"}
              </Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Screen2;
