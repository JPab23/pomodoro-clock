import { View, Text , StyleSheet } from "react-native"
import React from 'react';

interface TimerProps {
    time: number
}
const Timer = ({ time }: TimerProps) => {
    const formattedTime = `${Math.floor(time/60).toString().padStart(2,"0")}:${Math.floor(time%60).toString().padStart(2,"0")}`
    return (
        <View style={styles.container}>
            <Text style={styles.time}>{formattedTime}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        borderRadius:10,
        flex:0.3,
        justifyContent:"center",
        marginTop:15
    },
    time:{
        fontSize:80,
        fontWeight:"bold",
        textAlign:"center",
        color: "#333333"
    }
})
export default Timer