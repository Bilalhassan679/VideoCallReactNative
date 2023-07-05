import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, View, Text, PanResponder, Animated} from 'react-native';
const Draggable = () => {
  const [showDraggable, setShowDraggable] = useState(true);
  const [dropAreaValues, setDropAreaValues] = useState(null);
  const [pan] = useState(new Animated.ValueXY());
  const [opacity] = useState(new Animated.Value(1));
  const [val, setVal] = useState({x: 0, y: 0});
  const [panResponder, setPanResponder] = useState(null);

  useEffect(() => {
    pan.addListener(value => setVal(value));

    const createPanResponder = () => {
      const responder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderGrant: (e, gesture) => {
          pan.setOffset({
            x: val.x,
            y: val.y,
          });
          pan.setValue({x: 0, y: 0});
        },
        onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
        onPanResponderRelease: (e, gesture) => {
          if (isDropArea(gesture)) {
            Animated.timing(opacity, {
              toValue: 0,
              duration: 1000,
            }).start(() => setShowDraggable(false));
          }
        },
      });

      setPanResponder(responder);
    };

    createPanResponder();

    return () => {
      pan.removeAllListeners();
    };
  }, [pan, val, opacity]);

  const isDropArea = gesture => {
    return gesture.moveY < 200;
  };

  const renderDraggable = () => {
    const panStyle = {
      transform: pan.getTranslateTransform(),
    };

    if (showDraggable) {
      return (
        <View style={{position: 'absolute'}}>
          <Animated.View
            {...panResponder.panHandlers}
            style={[panStyle, styles.circle, {opacity}]}
          />
        </View>
      );
    }
  };

  return (
    <View style={{width: '20%', alignItems: 'center'}}>
      {renderDraggable()}
    </View>
  );
};

export default Draggable;
