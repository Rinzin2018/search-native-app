import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  artistImage: (scrollA) => ({
    width: "100%",
    height: 200,
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-100, 0, 10, 100 + 1],
          outputRange: [-10 / 3, 0, 10 * 0.75, 10 * 0.9],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-100, 0, 100, 100 + 0.5],
          outputRange: [1, 1, 0.5, 0.5],
        }),
      },
    ],
  }),
  artistTitle: {
    fontSize: 18,
    fontWeight: "700",
    textShadowOffset: { width: 2, height: 2 },
    color: "#fff",
    textShadowColor: "#000000",
    textShadowRadius: 10,
    textTransform: "capitalize",
  },
  artistNickname: {
    fontSize: 14,
    color: "#fff",
    textShadowColor: "#000000",
    textShadowRadius: 10,
    textTransform: "capitalize",
  },
  artistOccupation: {
    flex: 1,
    fontSize: 14,
    color: "#fff",
    textShadowColor: "#000000",
    textShadowRadius: 10,
    textAlign: "center",
  },
  artistStatus: {
    fontSize: 14,
    marginLeft: 7,
    textShadowOffset: { width: 2, height: 2 },
    textShadowColor: "#000000",
    textShadowRadius: 10,
    textTransform: "capitalize",
  },
  artistAppearance: {
    fontSize: 15,
    marginTop: 6,
    textShadowOffset: { width: 2, height: 2 },
    color: "#fff",
    textShadowColor: "#000000",
    textShadowRadius: 10,
    textTransform: "capitalize",
    // width: Dimensions.get("screen").width / 3,
  },
  titlePlaylist: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 12,
  },
  containerArtist: {
    position: "absolute",
    bottom: -50,
    left: 10,
    right: 10,
  },
  artistContent: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
  },
  containerOtherSongs: {
    backgroundColor: "#1a2837",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  likeIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    backgroundColor: "#ffffff",
    borderRadius: 100,
    marginRight: 15,
  },
  aboutContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 25,
    paddingLeft: 15,
    paddingRight: 15,
  },
  artist: {
    marginLeft: 12,
    marginRight: 12,
  },
  titleArtist: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
  },
  descriptionArtist: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 12,
  },
});
