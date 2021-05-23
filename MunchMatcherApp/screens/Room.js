import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenContainer from "../components/ScreenTemplate";
import Toast from "react-native-toast-message";
import { useSocket } from "../hooks/useSocket";
import Card from "../components/Card";
import BottomBar from "../components/BottomBar";
import Swipes from "../components/Swipes";

let socket;
export default function Room(props) {
  const [restaurants, setRestaurants] = useState();
  const [index, setIndex] = useState(0);
  const swipesRef = useRef(null);
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

    socket.on("data", (message) => {
      //Restaruant data sent from server
      console.log(message);
      setRestaurants(message);
    });

    return () => socket.disconnect();
  }, []);

  const handleLikePress = () => {
    swipesRef.current.openLeft();
  };
  const handlePassPress = () => {
    swipesRef.current.openRight();
  };

  return (
    <ScreenContainer>
      <View>
        <Text style={styles.title}>
          Welcome to Room: {props.route.params.roomID}
        </Text>
        {restaurants &&
          restaurants.map((u, i) =>
            index == i ? (
              <Swipes
                restaurants={restaurants}
                ref={swipesRef}
                currentIndex={index}
                setIndex={setIndex}
                key={index}
              />
            ) : null
          )}
        <BottomBar
          handleLikePress={handleLikePress}
          handlePassPress={handlePassPress}
        />
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
