import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { StateContext } from "../store";
import Spinner from "react-native-loading-spinner-overlay";

export default function Loader() {
  const { loader } = useContext(StateContext);
  return (
    <SafeAreaView>
      {loader?.isLoad && (
        <View style={styles.container}>
          <Spinner
            color={"#EA4160FF"}
            overlayColor={"rgba(16,23,39,0)"}
            visible={loader?.isLoad}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#EA4160FF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 10,
    textAlign: "center",
    margin: 2,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 1,
  },
});
