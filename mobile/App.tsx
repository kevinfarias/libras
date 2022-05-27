import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import mainStyles from './styles/main';
import { MaterialIcons } from '@expo/vector-icons';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

function connectToSocket() {
    const socket = new WebSocket('ws://ec2-52-54-91-133.compute-1.amazonaws.com:9999');
    socket.addEventListener('open', function (event) {
        socket.send('Connection Established');
    });

    return socket;
}

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(CameraType.back);

  let socket: WebSocket;
  let camera: Camera | null = null;
  let takeImageInterval: any;
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    socket = connectToSocket();
    socket.addEventListener('message', function (event) {

        const str = event.data;
        const parts = str.split(" Data received as: ");
        const result = parts[parts.length - 1];
        console.log("result", str);
        
        // resultData.innerHTML = result;
    });
    if (takeImageInterval) clearInterval(takeImageInterval);

    takeImageInterval = setInterval(async () => {
        if (!camera) {
            console.log("sem camera");
            return;
        }
        const imageFrame = await camera.takePictureAsync({ base64: true });

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

        console.log("manipResult", manipResult.base64?.substring(0, 100));
        // socket.send(manipResult.base64 as any);
    }, 1000);
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
      <Camera style={mainStyles.camera} type={cameraType} ref={(r) => {
        camera = r
      }}>
        <View style={mainStyles.mainView}>
            <View style={mainStyles.innerView}>
                {/* <View style={mainStyles.greenSquare}><Text>ae</Text></View> */}
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