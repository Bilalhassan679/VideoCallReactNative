import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const CallingActionBox = ({hangOnPress}) => {
  //Toggle Camera
  const [toggleCamera, setToggleCamera] = useState(false);
  const toggleCameraFunction = () => {
    setToggleCamera(prev => !prev);
  };

  //Toggle Mic
  const [toggleMic, setToggleMic] = useState(false);
  const toggleMicFunction = () => {
    setToggleMic(prev => !prev);
  };

  return (
    <View style={styles.bottomContainer}>
      <Pressable style={styles.iconButton}>
        <Ionicons name="ios-camera-reverse" size={30} color={'white'} />
      </Pressable>
      <Pressable onPress={toggleCameraFunction} style={styles.iconButton}>
        <MaterialCommunityIcons
          name={toggleCamera ? 'camera' : 'camera-off'}
          size={30}
          color={'white'}
        />
      </Pressable>
      <Pressable onPress={toggleMicFunction} style={styles.iconButton}>
        <MaterialCommunityIcons
          name={toggleMic ? 'microphone' : 'microphone-off'}
          size={30}
          color={'white'}
        />
      </Pressable>

      <Pressable
        onPress={() => hangOnPress()}
        style={[styles.iconButton, {backgroundColor: 'red'}]}>
        <MaterialCommunityIcons name="phone-hangup" size={30} color={'white'} />
      </Pressable>
    </View>
  );
};

export default CallingActionBox;

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    flex: 0.2,
    backgroundColor: '#333333',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: 'space-between',
  },
  iconButton: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#4a4a4a',
    marginTop: 20,
    marginHorizontal: 15,
  },
});
