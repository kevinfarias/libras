import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
    },
    camera: {
        height: '100%',
    },
    text: {
        color: "black",
    },
    mainView: {
        flex: 1,
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    innerView: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        padding: 20,
        justifyContent: 'space-between'
    },
    buttonBar: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center'
    },
    innerButton: {
        width: 70,
        height: 70,
        bottom: 0,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}); 

export default styles;