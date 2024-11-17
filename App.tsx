import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import Header from './components/HeaderTemp';
import Timer from './components/Timer';
export default function App() {


    
  const bgColor = ["#68BA7f", "#88BDF2", "#A2574F"]

  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState<number>(1500)
  const [selectedTime, setSelectedTime] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);

  const handleBtnStart = ()=>{
    playSoundClick()
    setIsActive(!isActive);
  }

  const playSoundClick =async ()=>{
    const {sound} = await Audio.Sound.createAsync(
      require("./assets/audios/click.mp3")
    )
    await sound.playAsync()
  }
  
  const playSoundFinish=async()=>{
    const {sound} = await Audio.Sound.createAsync(
      require("./assets/audios/finish.mp3")
    )
    await sound.playAsync()
  }

useEffect(()=>{
  let interval : NodeJS.Timeout | number = 0
  if(isActive && time !==0){
    interval = setInterval(()=>{
      setTime(time-1)
    },1000)
  }else{
    clearInterval(interval)
  }

  if(time===0){
    playSoundFinish()
    setIsActive(false)
    setIsWorking( prev => !prev)
    setTime(selectedTime ===0 ?  1500 : selectedTime ===1 ? 300 : 600 )
  }

  return ()=> clearInterval(interval)

}, [ isActive,time])

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor[selectedTime] }]} >
      <StatusBar style="auto" />
      <View
        style={{
          paddingTop: Platform.OS === "android" ? 30 : 0,
          paddingHorizontal: 15,
          flex: 1
        }}>
        <Text style={styles.titleText}>Pomodoro</Text>
        <Header
          setTime={setTime}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
        <Timer
          time={time} />
        <TouchableOpacity 
          style={styles.btnStart}
          onPress={handleBtnStart}>
          <Text style={{color:"white", textAlign:"center"}}>{`${isActive ? "STOP" : "START"}`}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  },
  btnStart: {
    alignItems:"center",
    borderWidth: 2,
    backgroundColor:"#333333",
    borderRadius:10,
    padding:8,
    marginTop:15
  }

});
