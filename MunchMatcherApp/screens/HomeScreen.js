import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import ScreenContainer from "../components/ScreenTemplate";
import "react-native-get-random-values";
import uuid from "react-native-uuid";
import Animated, { Easing, EasingNode } from "react-native-reanimated";
export default function HomeScreen(props) {
  const [opacity, setOpacity] = useState(new Animated.Value(1));

  const [name, setName] = useState("");
  const [enteredName, setEnteredName] = useState(false);

  const [chosenRoomID, setChosenRoomID] = useState("");
  const [roomIDButtonDisabled, setRoomIDButtonDisabled] = useState(true);

  const [nameButtonDisabled, setNameButtonDisabled] = useState(true);

  const createRoomHandler = () => {
    //Generate room ID between 1000 and 9999
    const roomID = Math.floor(Math.random() * 8999) + 1000;

    //Gen random user ID
    const userID = uuid.v4();

    props.navigation.navigate("Room", {
      roomID: roomID.toString(),
      userID: userID,
      username: name,
    });
  };

  const joinRoomHandler = () => {
    const userID = uuid.v4();

    props.navigation.navigate("Room", {
      roomID: chosenRoomID,
      userID: userID,
      username: name,
    });
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      easing: EasingNode.elastic(),
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      easing: EasingNode.elastic(),
    }).start();
  };

  return (
    <ScreenContainer>
      {enteredName ? (
        <Animated.View style={[styles.container, { opacity }]}>
          <Text style={styles.title}>Hi {name} 👋</Text>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={createRoomHandler}
            >
              <Text style={styles.btnText}>CREATE NEW ROOM</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <Text style={[styles.btnText, { color: "black" }]}>OR</Text>
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Room Code"
              onChangeText={(value) => {
                setChosenRoomID(value);
                console.log(value);
                if (value.replace(" ", "").length != 4) {
                  setRoomIDButtonDisabled(true);
                } else {
                  setRoomIDButtonDisabled(false);
                }
              }}
              keyboardType="number-pad"
              maxLength={4}
            />
            <TouchableOpacity
              style={
                roomIDButtonDisabled
                  ? [styles.primaryButton, styles.disabledButton]
                  : styles.primaryButton
              }
              onPress={joinRoomHandler}
            >
              <Text style={styles.btnText}>JOIN A ROOM</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : (
        <Animated.View style={[styles.container, { opacity }]}>
          <Text style={styles.title}>Hello 👋 What's your name?</Text>

          <TextInput
            style={styles.input}
            placeholder="Name: "
            onChangeText={(value) => {
              setName(value);
              if (value.replace(" ", "").length < 1) {
                setNameButtonDisabled(true);
              } else {
                setNameButtonDisabled(false);
              }
            }}
          />
          <TouchableOpacity
            style={
              nameButtonDisabled
                ? [styles.primaryButton, styles.disabledButton]
                : styles.primaryButton
            }
            onPress={() => {
              fadeOut();
              setTimeout(() => {
                setEnteredName(true);
                fadeIn();
              }, 500);
            }}
            disabled={nameButtonDisabled}
          >
            <Text style={styles.btnText}>ENTER</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: "#ff9f43",
    paddingVertical: 5,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5.46,
    elevation: 9,
  },
  secondaryButton: {},
  btnText: { color: "white", fontWeight: "bold", fontSize: 25 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    // backgroundColor: "rgba(0,0,0,0.2)",
    padding: 10,
    // width: "80%",
    alignSelf: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 2,
    padding: 5,
    paddingLeft: 10,
    backgroundColor: "white",
    fontSize: 20,
    marginBottom: 10,
    width: 200,
  },
  title: {
    fontSize: 24,
    color: "black",
    paddingBottom: 15,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
});
