/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {PropsWithChildren} from 'react';
import { GEOGRAPHY } from 'sequelize';
import { getWeather, dailyForecast, showWeather, getLocation } from 'react-native-weather-api';
import SelectDropdown from 'react-native-select-dropdown'
import Pdf from 'react-native-pdf';

import {spring} from './images/spring.jpg';
import {summer} from './images/summer.jpg';
import {fall}   from './images/fall.jpg';
import {winter} from './images/winter.jpg';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();






function Link(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={App}/>
        <Stack.Screen name="Weather" component={Weather}/>
        <Stack.Screen name="Dice" component={Dice}/>
        <Stack.Screen name="ToDo" component={ToDo}/>
        <Stack.Screen name="News" component={News}/>
        <Stack.Screen name="CheatSheet" component={CheatSheet}/> 
        <Stack.Screen name="Currency" component={Currency}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App({navigation}){

  var daynames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var tempday = new Date();
  var day = daynames[tempday.getDay()];

  var daynumber = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
    var date = daynumber + '/' + month + '/' + year;

  var hour = new Date().getHours();
  var minutes = new Date().getMinutes();
    var time = hour + ':' + minutes;


  return (
    <SafeAreaView>
      <StatusBar/>
        <ScrollView >
          <View style={styles.navCont}>
            <View style={styles.btnCont}>
              <TouchableOpacity onPress={() => navigation.navigate("Weather")} style={styles.navBtn}>
                <Text style={styles.btnText}>Weather</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Dice")} style={styles.navBtn}>
                <Text style={styles.btnText}>Dice</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("ToDo")} style={styles.navBtn}>
                <Text style={styles.btnText}>To-Do</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("News")} style={styles.navBtn}>
                <Text style={styles.btnText}>News</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Currency")} style={styles.navBtn}>
                <Text style={styles.btnText}>Currency</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("CheatSheet")} style={styles.navBtn}>
                <Text style={styles.btnText}>Cheatsheet</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dateBox}>
              <Text style={styles.homeInfo}> {day} </Text>
              <Text style={styles.homeInfo}> {date} </Text>
              <Text style={styles.homeInfo} > {time} </Text>
              <Text style={styles.homeInfo}> Stockholm </Text>
            </View>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

function Weather(){

  const[info,setInfo] = useState([]);
  const[imgSrc,setSeason] = useState([]);

  useEffect(()=>{

    getWeather({
        
      key: "bf096125e829dd8ef1cbee5efbc1440d",
      city: "Stockholm",
      country: "SE",
      unit:"metric"
    
    }).then(() => {
      let data = new showWeather();
      setInfo(data)
    });

  },[])

  var month = new Date().getMonth() + 1;
  var season;

  if( month < 3 || month == 12){
    console.log('spring');
    season = "./images/spring.jpg";
    useEffect(()=>{ setSeason(season);}, [])
  }

  else if( 3 <= month < 5 ){
    console.log('summer');
    season = "./images/summer.jpg";
    useEffect(()=>{ setSeason(season);}, [])
  }

  else if( 5 <= month < 9){
    console.log('fall');
    season = "./images/fall.jpg";
    useEffect(()=>{ setSeason(season);}, [])
  }

  else if( 9 <= month < 12){
    console.log('winter');
    season = "./images/winter.jpg";
    useEffect(()=>{ setSeason(season);}, [])
  }

  console.log(season);

  return(
    <SafeAreaView>
      <StatusBar/>
        <ScrollView>
          <View style={styles.weatherBox}>
            <View style={styles.weatherNav}>
              <Image style={styles.weatherBall} source={{uri: `${info.icon}`}}></Image>
              <Text style={styles.weatherLocation}>{info.name}</Text>
            </View>
            <View style={styles.weatherInfoBox}>
              <Text style={styles.weatherInfo}> Min: {info.temp_min} °C </Text>
              <Text style={styles.weatherInfo}> Max: {info.temp_max} °C</Text>
              <Text style={styles.weatherInfo}> Wind: {info.wind} kmh</Text>
              <Text style={styles.weatherInfo}> Humidity: {info.humidity} gm³</Text>
            </View>
            <Image style={styles.weatherImg} source={{uri: `${imgSrc}`}}></Image>
            <Image style={styles.weatherImg} source={{uri: spring}}></Image>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

function Dice(){

  const [img,setImg] = useState(require("./images/dice-1.png"));

  const randomNumber=() =>{

    var roll = Math.floor(Math.random() * 6) + 1 ;

    // setImg(require('./images/dice-' + roll.toString() + '.png'));
    // return img;

    if(roll == 1){
      setImg(require("./images/dice-1.png"));
      console.log(roll);
      return img;
    } 
  
    else if(roll == 2){
      setImg(require("./images/dice-2.png"));
      console.log(roll);
      return img;
    } 
  
    else if(roll == 3){
      setImg(require("./images/dice-3.png"));
      console.log(roll);
      return img;
    } 
  
    else if (roll == 4) {
      setImg(require("./images/dice-4.png"));
      console.log(roll);
      return img;
    } 
  
    else if (roll == 5){
      setImg(require("./images/dice-5.png"));
      console.log(roll);
      return img;
    } 
  
    else if (roll == 6) {
      setImg(require("./images/dice-6.png"));
      console.log(roll);
      return img;

    }

  }

  return(
    <SafeAreaView>
      <StatusBar/>
        <ScrollView>
          <View style={styles.center}>
            <TouchableOpacity style={styles.dice} onPress={randomNumber}>
              <Image style={styles.diceImg} source={img}></Image>
            </TouchableOpacity>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

function ToDo(){

  return(
    <SafeAreaView>
    <StatusBar/>
      <ScrollView>
        <View style={styles.todoCont}>
          <View style={styles.todoBox}>
            <Text style={styles.todoTitle}>Todo</Text>
            <TextInput style={styles.todoInput} placeholder="Write a ToDo"></TextInput>
            <TouchableOpacity style={styles.todoBtn} pointerEvents={'box-none'}>
              <Text style={styles.todoBtnText}>Add Todo</Text>
            </TouchableOpacity>
          </View>



        </View>
      </ScrollView>
  </SafeAreaView>
  );
}

function News(){

  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNewsAPI = () => {
        return fetch('https://newsapi.org/v2/top-headlines?country=se&apiKey=087daf67be4e42369a5e4cea91cbd54a')
        .then(response => response.json())
        .then(response => {
            return response.articles; 
        });
    };

    getNewsAPI().then(articles => {
        setNews(articles);
    });
  }, []);


  return(
    <ScrollView>
    {
        news.map((item , index) =>{
            return (
              <SafeAreaView>
                <StatusBar/>
                <ScrollView>
                  <View style={styles.newsBox}>
                    <TouchableOpacity index={index} onPress={() => Linking.openURL(item.url)}>
                        <View style={styles.newsCard}>
                            <Text  style={styles.newsTitle}>{item.title}</Text>
                            <Text  style={styles.newsAuth}>{item.author}</Text>
                            <Image style={styles.newsImage} source={{uri: `${item.urlToImage}`}}></Image>
                            <Text  style={styles.newsDesc}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </SafeAreaView>
            )
        })
    }
    </ScrollView>
  );

}

function CheatSheet(){


  const handleOpenPdf = () => {
    setPdfPath('./pdf/HTML5-Cheat-Sheet.pdf');
  }

  return(
    <View>
      <Button title="Open PDF" onPress={handleOpenPdf} />
      {pdfPath ? (
        <PDFView
          resource={require(pdfPath)}
          onError={(error) => console.log('PDF Error:', error)}
        />
      ) : null}
    </View>
  );

}

function Currency(){

  const currencies = ["US Dollar", "Euro", "Swedish Crown", "British Pound"]


  return(
    <SafeAreaView>
      <StatusBar/>
        <ScrollView>
          <View style={styles.crcBox}>
            <View style={styles.currencyForm}>
              <Text style={styles.crcHeader}>Amount</Text>
              <TextInput style={styles.crcTextinput}></TextInput>
              <Text style={styles.crcHeader}>From</Text>
              <SelectDropdown
                style={styles.crcDropdown}
                data={currencies}
                onSelect={(selectedItem, index) => { console.log(selectedItem, index) }}
                buttonTextAfterSelection={(selectedItem, index) => { return selectedItem }}
                rowTextForSelection={(item, index) => { return item }}
              />
              <Text style={styles.crcHeader}>To</Text>
              <SelectDropdown
                style={styles.crcDropdown}
                data={currencies}
                onSelect={(selectedItem, index) => { console.log(selectedItem, index) }}
                buttonTextAfterSelection={(selectedItem, index) => { return selectedItem }}
                rowTextForSelection={(item, index) => { return item }}
              />
              <TouchableOpacity style={styles.crcBtn}><Text>Convert</Text></TouchableOpacity>
            </View>
          </View>
        </ScrollView>
    </SafeAreaView>
  );  
}


export default Link;







const styles = StyleSheet.create({

  //Main Page

  navCont: {
    backgroundColor: Colors.white,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  btnCont: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

  },

  navBtn: {
    width: 100,
    height: 100,
    margin: 15,
    backgroundColor: 'gray',
    borderRadius: 20,
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 100,
  },

  btnText:{
    width: 100,
    height: 100,
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 100,
  },


  dateBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: 360,
    height: 400,
    margin: 15,
    borderRadius: 20,
    backgroundColor: 'lightgray',
  },

  homeInfo: {
    margin: 10,
    fontSize: 25,
  },



  center: {
    height: 700,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dice: {
    width: 200,
    height: 200,
    margin: 10,
  },

  diceImg: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 40,

  },

  
  weatherBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFE9E9'
  },

  weatherNav: {
    width: '100%',
    height: 100,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  weatherBall: {
    width: 100,
    height: 100,
    backgroundColor: 'gray',
    color: 'white',
    textAlign: 'center',
    lineHeight: 100,
    fontSize: 30,
    border: '1px solid black',
    overflow: 'hidden',
    borderRadius: 50,
  },

  weatherLocation: {
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    lineHeight: 100,
    fontSize: 40,
    fontWeight: 'bold',
  },

  weatherInfoBox: {
    width: '100%',
    height: 300,
    padding: 30,
    paddingLeft: '10%',
    display: 'flex',
    justifyContent: 'space-around',
  },

  weatherInfo: {
    fontSize: 40,
  },

  weatherImg: {
    width: '80%',
    height: 200,
    margin: 50,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "black",
    backgroundColor: 'white',
  },




  todoCont: {
    display: 'flex',
    alignItems: 'center',
  },

  todoBox: {
    width: 300,
    height: 200,
    margin: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  todoTitle: {
    width: 250,
    height: 50,
    fontSize: 30,
    fontWeight: 'bold',
  },

  todoInput: {
    width: 250,
    height: 50,
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },

  todoBtn: {
    width: 250,
    height: 30,
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },

  todoBtnText: {
    textAlign: 'center',
    lineHeight: 30,
  },




  currencyForm: {
    margin: 'auto',
    width: '80%',
    height: 'auto',
    backgroundColor: 'green',
  },

  crcHeader: {
    fontWeight: 'bold',
    fontSize: 25,
  },

  crcTextinput: {
    backgroundColor: 'white',
    width: '90%',
    height: 30,
  },

  crcDropdown: {
    backgroundColor: 'white',
    width: '90%',
    height: 30,
  },

  crcBtn: {
    backgroundColor: 'blue',
    width: '90%',
    height: 30,
  },




  newsBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  newsCard: {
    width: 350,
    height: 'auto',
    padding: 30,
    margin: 10,
    borderRadius: 20,
    backgroundColor: 'white',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  newsTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  newsAuth: {
    fontSize: 15,
    margin: 5,
    color: 'gray',
  },

  newsImage: {
    width: 300,
    height: 200,
  },

  newsDesc: {
    padding: 5,
  },


});









