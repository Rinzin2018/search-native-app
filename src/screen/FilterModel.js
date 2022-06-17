import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

const FilterModel = ({ open, handleAction }) => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        fullScreen={true}
        visible={open}
      >
        <View style={styles.centeredView}>
          {[null, 1, 2, 3, 4, 5].map((val, index) =>
            val ? (
              <Pressable
                key={index}
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleAction(val)}
              >
                <Text style={styles.textStyle}>Season - {val}</Text>
              </Pressable>
            ) : (
              <Pressable
                key={index}
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleAction(val)}
              >
                <Text style={styles.textStyle}>Select - All</Text>
              </Pressable>
            ),
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "#000",
    opacity: 0.88,
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "transparent",
  },
  textStyle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default FilterModel;
