import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Voximplant} from 'react-native-voximplant';

const LocalVideoContainer = ({videoStreamId}) => {
  return (
    <Voximplant.VideoView
      videoStreamId={videoStreamId}
      style={styles.localVideo}
    />
  );
};

export default LocalVideoContainer;

const styles = StyleSheet.create({
  localVideo: {
    width: 100,
    height: 150,
    backgroundColor: '#ffff6e',

    borderRadius: 10,
    position: 'absolute',
    right: 10,
    bottom: 0,
    zIndex: 99999,
  },
});
