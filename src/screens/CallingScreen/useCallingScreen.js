import {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {Voximplant} from 'react-native-voximplant';

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];
const useCallingScreen = ({navigate}, {params}) => {
  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');

  const voximplant = Voximplant.getInstance();

  const [permissionGranted, setPermissionGranted] = useState(false);
  const [callStatus, setCallStatus] = useState('Intializing...');
  const call = useRef();
  const {
    user_name,
    user_display_name,
    call: incomingCall,
    isIncomingCall,
  } = params;

  const requestPermissions = async () => {
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    const recordAudioGranted =
      granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
    const cameraGranted =
      granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
    if (!cameraGranted || !recordAudioGranted) {
      Alert.alert('Permissions not granted');
    } else {
      setPermissionGranted(true);
    }
  };
  useEffect(() => {
    if (Platform.OS == 'android') {
      requestPermissions();
    } else {
      setPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    if (!permissionGranted) {
      return;
    }

    //MAKE CALL
    const callSetting = {
      video: {
        sendVideo: true,
        receiveVideo: true,
      },
    };
    const makeCall = async () => {
      call.current = await voximplant.call(user_name, callSetting);
      //   console.log(call, 'sakdl');
      subscribeToCallEvent();
    };

    const answerCall = () => {
      subscribeToCallEvent();
      call.current.answerCall(callSetting);
    };

    //CALL FAILED IF UNAVAILABLE OR NO AVAILABLE IN DATABASE
    const subscribeToCallEvent = () => {
      call.current.on(Voximplant.CallEvents.Failed, callEvent => {
        showCallError(callEvent.reason);
      });

      //RINGING CAll
      call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
        setCallStatus('Calling...');
      });
      //Connected CAll
      call.current.on(Voximplant.CallEvents.Connected, callEvent => {
        setCallStatus('Connected...');
      });
      //RINGING CAll
      call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
        navigate('ContactScreen');
      });
      //OVER SCREEn

      call.current.on(
        Voximplant.CallEvents.LocalVideoStreamAdded,
        callEvent => {
          setLocalVideoStreamId(callEvent.videoStream.id);
        },
      );
    };

    const showCallError = reason => {
      Alert.alert('Call Failed', `Reason : ${reason}`, [
        {text: 'OK', onPress: () => navigate('ContactScreen')},
      ]);
    };
    //CALL FAILED IF UNAVAILABLE OR NO AVAILABLE IN DATABASE END =====>

    if (isIncomingCall) {
      answerCall();
    } else {
      makeCall();
    }

    return () => {
      call.current.off(Voximplant.CallEvents.Failed);
      call.current.off(Voximplant.CallEvents.ProgressToneStart);
      call.current.off(Voximplant.CallEvents.Connected);
      call.current.off(Voximplant.CallEvents.Disconnected);
    };
  }, [permissionGranted]);
  // MAke CALL END

  const hangOnPress = () => {
    console.log('sadjl');
    call.current.hangup();
  };
  return {user_display_name, callStatus, hangOnPress, localVideoStreamId};
};

export default useCallingScreen;
