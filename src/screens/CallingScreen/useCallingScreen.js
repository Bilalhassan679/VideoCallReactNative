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
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [callStatus, setCallStatus] = useState('Intializing...');
  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');

  const voximplant = Voximplant.getInstance();

  const {user, call: incomingCall, isIncomingCall} = params;

  console.log(user, incomingCall, isIncomingCall, 'esfdasdeeeeee');

  const call = useRef(incomingCall);
  const endpoint = useRef(null);
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
      call.current = await voximplant.call(user?.user_name, callSetting);
      //   console.log(call, 'sakdl');
      subscribeToCallEvent();
    };

    const answerCall = async () => {
      subscribeToCallEvent();
      endpoint.current = call.current.getEndpoints()[0];
      subscribeToEndpointEvent();
      call.current.answer(callSetting);
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
      //OVER SCREEN

      call.current.on(
        Voximplant.CallEvents.LocalVideoStreamAdded,
        callEvent => {
          setLocalVideoStreamId(callEvent.videoStream.id);
        },
      );

      call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
        endpoint.current = callEvent.endpoint;
        subscribeToEndpointEvent();
      });
    };

    const subscribeToEndpointEvent = async () => {
      endpoint.current.on(
        Voximplant.EndpointEvents.RemoteVideoStreamAdded,
        endpointEvent => {
          setRemoteVideoStreamId(endpointEvent.videoStream.id);
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

  const onHangupPress = () => {
    call.current.hangup();
  };
  return {
    user,
    callStatus,
    localVideoStreamId,
    remoteVideoStreamId,
    onHangupPress,
  };
};

export default useCallingScreen;
