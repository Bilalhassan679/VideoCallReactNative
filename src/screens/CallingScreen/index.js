import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CallingActionBox from '../../components/CallingActionBox';
import useCallingScreen from './useCallingScreen';

import {Voximplant} from 'react-native-voximplant';

const CallingScreen = ({route, navigation}) => {
  const {
    user_display_name,
    callStatus,
    hangOnPress,
    user,
    localVideoStreamId,
    remoteVideoStreamId,
    onHangupPress,
  } = useCallingScreen(navigation, route);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name={'arrow-back'}
            size={30}
            color={'white'}
          />

          <Voximplant.VideoView
            videoStreamId={remoteVideoStreamId}
            style={styles.remoteVideo}
          />

          <Voximplant.VideoView
            // videoStreamId={localVideoStreamId}
            style={styles.localVideo}
          />

          <View style={styles.flexDirection}>
            <View style={styles.topContainer}>
              <Text style={styles.title}>{user?.user_display_name}</Text>
              <Text style={styles.phone}>{callStatus}</Text>
            </View>
            <View></View>
          </View>
        </View>
        <CallingActionBox hangOnPress={onHangupPress} />
      </View>
    </>
  );
};

export default CallingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'brown',
  },
  topContainer: {
    alignItems: 'center',
  },
  innerContainer: {flexDirection: 'row', flex: 1, marginTop: 30, padding: 10},
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
  localVideo: {
    width: 100,
    height: 150,
    backgroundColor: '#ffff6e',

    borderRadius: 10,
    position: 'absolute',
    right: 10,
    top: 100,
    zIndex: 99999,
  },
  remoteVideo: {
    backgroundColor: '#7b4e80',
    borderRadius: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 100,
    zIndex: -1,
  },
  flexDirection: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    marginRight: 20,
  },
});
