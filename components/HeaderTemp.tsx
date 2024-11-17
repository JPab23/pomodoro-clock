import { View, Text, TouchableOpacity,StyleSheet } from "react-native"
interface Props{
setTime: (time: number)=>void,
selectedTime: number,
setSelectedTime:(selectedTime: number)=>void

}
const Header = ({setTime, selectedTime , setSelectedTime}:Props) => {
    const options = ["Pomodoro", "Break", "Long break"]
    const changeTime = (index : number)=>{
        const newTime = index ===0? 25 : index === 1 ? 5 : 10
        setTime(newTime*60)
        setSelectedTime(index)
    }
    return (
        <View style={{flexDirection:"row", marginTop:15}}>
            { options.map((option, index) => (
                    <TouchableOpacity 
                    key={index}
                    style={[styles.itemStyle  , selectedTime !== index && {borderColor:"transparent"}]}
                    onPress={()=>{changeTime(index)}}>
                        <Text style={{fontWeight:"bold"}}>{option}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default Header


const styles = StyleSheet.create({
    itemStyle:{
        borderWidth:3,
        padding:5,
        margin:2,
        width:"30%",
        borderRadius:8,
        borderColor:"white",
        alignItems:"center",

        
    }
});