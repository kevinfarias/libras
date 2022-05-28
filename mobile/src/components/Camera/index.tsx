import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import mainStyles from './styles/main';
import { MaterialIcons } from '@expo/vector-icons';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { useApi } from '../../contexts/ApiContext';
import ResultDisplay from './resultDisplay';

export default function CameraComponent() {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [socket, _setSocket, letterResult, _setLetterResult] = useApi();
  const [cameraObject, setCameraObject] = useState();

  const debug: boolean = true;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
        if (!cameraObject) {
            if (debug) console.log("sem cameraObject");
            return;
        }
        try {
            const imageFrame = await cameraObject.takePictureAsync({ base64: true });

            const manipResult = await manipulateAsync(
                imageFrame.uri,
                [
                  { resize: {
                      width: 64,
                      height: 64
                  } },
                ],
                { compress: 1, format: SaveFormat.PNG, base64: true }
              );
    
            if (!socket) {
                console.log("sem socket", socket);
            } else {
                socket.send(manipResult.base64 as any);
            }
        } catch (e) {
            console.log("error taking picture", e);
        }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [cameraObject, socket]);

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
      <Camera style={mainStyles.camera} type={cameraType} ref={(r) => {
        setCameraObject(r)
      }}>
        <View style={mainStyles.mainView}>
            <View style={mainStyles.innerView}>
                <View style={mainStyles.buttonBar}>
                    <ResultDisplay letter={letterResult} />
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