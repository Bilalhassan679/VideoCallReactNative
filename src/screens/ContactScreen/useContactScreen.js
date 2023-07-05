import {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Voximplant} from 'react-native-voximplant';

const useContactScreen = ({navigate}) => {
  const voximplant = Voximplant.getInstance();
  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      navigate('IncomingCallScreen', {call: incomingCallEvent.call});
    });
    return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
    };
  }, []);

  return {};
};

export default useContactScreen;
