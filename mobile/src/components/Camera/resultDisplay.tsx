import mainStyles from './styles/main';
import styles from './styles/styles.module.css';
import { View, Text } from 'react-native';

export default function ResultDisplay({ letter }) {
    if (!letter) return null;

    return (
        <View style={mainStyles.resultDisplay}>
            <Text style={styles.resultDisplayTextWithGlow}>{letter}</Text>
        </View>
    );
}
