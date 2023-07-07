import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Voximplant} from 'react-native-voximplant';

const useIncomingCallScreen = ({navigate}, {params}) => {
  const [callerName, setCallerName] = useState(null);
  const {call} = params;

  useEffect(() => {
    setCallerName(call.getEndpoints()[0].displayName);
    call.on(Voximplant.CallEvents.Disconnected, callEvent => {
      navigate('ContactScreen');
    });
    return () => call.off(Voximplant.CallEvents.Disconnected);
  }, [call]);

  const Decline = () => {
    call.decline();
  };
  const onAccept = () => {
    navigate('CallingScreen', {
      call: call,
      isIncomingCall: true,
    });
  };
  return {Decline, onAccept, callerName};
};

export default useIncomingCallScreen;
