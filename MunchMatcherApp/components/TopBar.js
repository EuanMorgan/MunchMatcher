import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

export default function TopBar() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Munch</Text>
      <FontAwesome5
        name="hamburger"
        size={27}
        color="red"
        style={styles.logo}
      />
      <Text style={styles.text}>Matcher</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5.46,
    elevation: 9,
  },
  text: {
    color: "black",
    fontFamily: "lobster-regular",
    textAlign: "center",
    textAlignVertical: "center",
    paddingHorizontal: 10,
    top: 5,
    fontSize: 20,
  },
  logo: {
    alignSelf: "center",
  },
});
