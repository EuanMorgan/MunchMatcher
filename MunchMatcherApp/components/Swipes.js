import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import Card from "./Card";

function Swipes(props) {
  const [willLike, setWillLike] = useState(false);
  const [willPass, setWillPass] = useState(false);
  const renderLeftActions = () => (
    <RectButton style={styles.container}>
      <Card restaurant={props.restaurants[props.currentIndex + 1]} />
    </RectButton>
  );

  const renderRightActions = () => (
    <RectButton style={styles.container}>
      <Card restaurant={props.restaurants[props.currentIndex + 1]} />
    </RectButton>
  );

  const updateIndexHandler = () => {
    const nextIndex =
      props.restaurants.length - 2 === props.currentIndex
        ? 0
        : props.currentIndex + 1;

    props.setIndex(nextIndex);
  };

  const swipeLikeHandler = () => {};

  const swipeNopeHandler = () => {};

  return (
    <Swipeable
      ref={props.swipesRef}
      friction={1}
      leftThreshold={40}
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableLeftOpen={() => {
        updateIndexHandler();
        swipeLikeHandler();
        setWillLike(false);
      }}
      onSwipeableRightOpen={() => {
        updateIndexHandler();
        swipeNopeHandler();
        setWillPass(false);
      }}
      onSwipeableLeftWillOpen={() => {
        console.log("will like");
        setWillLike(true);
      }}
      onSwipeableRightWillOpen={() => {
        setWillPass(true);
      }}
    >
      <Card
        restaurant={props.restaurants[props.currentIndex]}
        willLike={willLike}
        willPass={willPass}
      />
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.forwardRef((props, ref) => (
  <Swipes swipesRef={ref} {...props}></Swipes>
));
