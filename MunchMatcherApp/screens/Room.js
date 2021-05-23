import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenContainer from "../components/ScreenTemplate";
import Toast from "react-native-toast-message";
import { useSocket } from "../hooks/useSocket";

let socket;
export default function Room(props) {
  useEffect(() => {
    socket = useSocket();

    socket.emit("joinRoom", {
      roomID: props.route.params.roomID,
      userID: props.route.params.userID,
      username: props.route.params.username,
    });

    socket.on("newJoin", (message) =>
      Toast.show({ text1: message, position: "bottom" })
    );

    return () => socket.disconnect();
  }, []);

  return (
    <ScreenContainer>
      <View>
        <Text style={styles.title}>
          Welcome to Room: {props.route.params.roomID}
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
  },
});
