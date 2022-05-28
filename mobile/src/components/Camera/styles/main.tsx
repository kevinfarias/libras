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
    // greenSquare: {
    //     width: 120,
    //     height: 120,
    //     border: "2px solid green",
    //     position: "absolute",
    //     background: "green",
    //     left: 20,
    //     bottom: 200,
    //     zIndex: 999 
    // },
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
    },
    resultDisplay: {
        width: "100%",
        fontSize: 30,
        color: 'green',
        bottom: 100,
        textAlign: 'center',
        justifyContent: "center",
        alignItems: "center",
        size: 30,
    },
    resultDisplayText: {
        fontSize: 90,
        size: 90,
    }
}); 

export default styles;