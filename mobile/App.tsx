import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import mainStyles from './styles/main';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType(CameraType.front)
    } else {
      setCameraType(CameraType.back)
    }
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={mainStyles.container}>
      <Camera style={mainStyles.camera} type={cameraType}>
        <View style={mainStyles.mainView}>
            <View style={mainStyles.innerView}>
                <View style={mainStyles.buttonBar}>
                    <TouchableOpacity
                        onPress={__switchCamera}
                        style={mainStyles.innerButton}>
                        <MaterialIcons name="flip-camera-android" size={48} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      </Camera>
    </View>
  );
}