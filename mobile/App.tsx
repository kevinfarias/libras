import * as React from 'react';
import { ApiProvider } from './src/contexts/ApiContext';
import CameraComponent from './src/components/Camera';
import {
    useFonts,
    Monoton_400Regular
} from "@expo-google-fonts/monoton";

export default function App() {
    let [fontsLoaded] = useFonts({
        Monoton_400Regular
    });
    
    return (
        <ApiProvider>
            <CameraComponent />
        </ApiProvider>
    );
}