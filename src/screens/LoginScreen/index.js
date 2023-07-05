import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Voximplant} from 'react-native-voximplant';
import {ACC_NAME, APP_NAME} from '../../constant';

const LoginScreen = ({navigation}) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const voximplant = Voximplant.getInstance();
  const login = async () => {
    try {
      await voximplant.login(
        `${user}@${APP_NAME}.${ACC_NAME}.voximplant.com`,
        pass,
      );
      navigation.reset({index: 0, routes: [{name: 'ContactScreen'}]});
    } catch (e) {
      Alert.alert(e.name, `Error code: ${e.code}`);
    }
  };
  useEffect(() => {
    const connectVoximplant = async () => {
      let clientState = await voximplant.getClientState();
      console.log(clientState, 'ald;');
      if (clientState === Voximplant.ClientState.DISCONNECTED) {
        await voximplant.connect();
      } else if (clientState === Voximplant.ClientState.LOGGED_IN) {
        navigation.reset({index: 0, routes: [{name: 'ContactScreen'}]});
        return;
      }
    };

    connectVoximplant();
  }, []);

  //   const redirectHome = () => {
  //     navigation.reset({
  //       index: 0,
  //       routes: [
  //         {
  //           neme: 'ContactScreen',
  //         },
  //       ],
  //     });
  //   };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInput}
        placeholder="user name"
        onChangeText={text => setUser(text)}
        value={user}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="Password"
        onChangeText={text => setPass(text)}
        value={pass}
      />
      <Text onPress={() => login()} style={styles.butn}>
        LoginScreen
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput: {
    backgroundColor: 'white',
    height: 40,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  butn: {
    color: 'white',
    backgroundColor: 'blue',
    height: 40,
    width: '90%',
    padding: 10,
    textAlign: 'center',
  },
});
