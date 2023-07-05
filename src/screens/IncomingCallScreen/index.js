import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import bg from '../../../assets/images/ios_bg.png';
import useIncomingCallScreen from './useIncomingCallScreen';
const IncomingCallScreen = ({navigation, route}) => {
  const {Decline, onAccept, callerName} = useIncomingCallScreen(
    navigation,
    route,
  );
  const item = route.params;
  return (
    <>
      <ImageBackground source={bg} style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>{callerName}</Text>
          <Text style={styles.phone}>ringing +92 125 252 4645</Text>
        </View>
        <View style={styles.topImageContainer}>
          <View style={styles.inerImageContainer}>
            <View style={styles.imageContainer}>
              <Ionicons
                name={'alarm'}
                size={30}
                color={'white'}
                style={{marginBottom: 10}}
              />
              <Text style={styles.text}>Remind Me</Text>
            </View>
            <View style={styles.imageContainer}>
              <Entypo
                name={'message'}
                size={30}
                color={'white'}
                style={{marginBottom: 10}}
              />
              <Text style={styles.text}>Remind Me</Text>
            </View>
          </View>
          <View style={styles.inerImageContainer}>
            <Pressable
              onPress={Decline}
              style={[styles.imageContainer, {marginLeft: 5}]}>
              <Feather
                name={'x'}
                size={30}
                color={'white'}
                style={styles.imageCircle}
              />
              <Text style={styles.text}>cancel</Text>
            </Pressable>
            <Pressable
              onPress={onAccept}
              style={[styles.imageContainer, {marginRight: 5}]}>
              <Feather
                name={'check'}
                size={30}
                color={'white'}
                style={[styles.imageCircle, {backgroundColor: '#2e7bff'}]}
              />
              <Text style={styles.text}>Accept</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default IncomingCallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 50,
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
  topImageContainer: {
    marginHorizontal: 30,
    marginBottom: 20,
    marginTop: 'auto',
  },
  inerImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  imageCircle: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 20,
    marginBottom: 10,
  },
  text: {
    color: 'white',
  },
});
