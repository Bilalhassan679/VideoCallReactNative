import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CallingActionBox from '../../components/CallingActionBox';
import useCallingScreen from './useCallingScreen';

import {Voximplant} from 'react-native-voximplant';

const CallingScreen = ({route, navigation}) => {
  const {user_display_name, callStatus, hangOnPress, localVideoStreamId} =
    useCallingScreen(navigation, route);
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
            style={styles.reciever}
            videoStreamId={localVideoStreamId}
          />
          <View style={styles.flexDirection}>
            <View style={styles.topContainer}>
              <Text style={styles.title}>{user_display_name}</Text>
              <Text style={styles.phone}>{callStatus}</Text>
            </View>
            <View></View>
          </View>
        </View>
        <CallingActionBox hangOnPress={hangOnPress} />
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
  reciever: {
    backgroundColor: 'yellow',
    borderRadius: 10,
    height: 150,
    width: 100,
    // right: 10,
    // top: 20,
  },
  flexDirection: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    marginRight: 20,
  },
});
