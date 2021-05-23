import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Card(props) {
  return (
    <View style={[styles.card, { height: height / 1.6, width: width / 1.25 }]}>
      {props.willLike && (
        <View style={styles.likeBox}>
          <Text style={styles.yum}>YUM</Text>
        </View>
      )}
      {props.willPass && (
        <View style={styles.nopeBox}>
          <Text style={styles.nah}>Nope</Text>
        </View>
      )}
      <Text style={styles.name}>{props.restaurant.name}</Text>
    </View>
  );
}

const boxStyle = {
  position: "absolute",
  top: "50%",
  paddingTop: 10,
  paddingBottom: 10,
  paddingHorizontal: 20,
  borderWidth: 3,
  borderRadius: 10,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    padding: 20,
    alignSelf: "center",
    marginTop: "20%",
    borderRadius: 10,
  },
  name: {
    fontSize: 22,
    textAlign: "center",
  },
  likeBox: {
    ...boxStyle,
    left: 40,
    borderColor: "#64EDCC",
  },
  nopeBox: {
    ...boxStyle,
    right: 40,
    borderColor: "#F06795",
  },
  nah: {
    color: "#F06795",
  },
  yum: {
    color: "green",
  },
});
