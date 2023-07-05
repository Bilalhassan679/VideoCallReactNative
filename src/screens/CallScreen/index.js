import React, {useRef} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text} from 'react-native';

import CallingActionBox from '../../components/CallingActionBox';
const CallScreen = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topContainer}></View>
        <Animated.View
          style={{
            transform: [{translateX: pan.x}, {translateY: pan.y}],
          }}
          {...panResponder.panHandlers}>
          <View style={styles.reciever}></View>
        </Animated.View>

        <CallingActionBox />
      </View>
    </>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'brown',
  },
  topContainer: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  phone: {
    marginTop: 8,
    color: 'white',
    fontSize: 18,
  },
  reciever: {
    backgroundColor: 'yellow',
    borderRadius: 10,
    height: 150,
    width: 100,
    // right: 10,
    // top: 20,
  },
});
