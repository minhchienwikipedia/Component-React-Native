import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';
var s = 10;
var m = 10;
var getdate = new Date();
var eventdate = new Date('2017-01-28');
var date = eventdate.getTime() - getdate.getTime();
var s = Math.floor(date/1000);
var m = Math.floor(s/60);
var h = Math.floor(m/60);
var d = Math.floor(h/24);
s %= 60;
m %= 60;
h %= 24;
export default class Democountdown extends Component {
  constructor(props){
    super(props);
    this.state = ({
      seconds: s,
      minute: m,
      hour: h,
      day: d,
    });
  }
  componentWillMount(){
    this.countdown();
  }
  componentDidMount(){

  }
  countdown(){
    setInterval( ()=>this.loop(), 1000);

  }
  loop(){
    if(this.state.seconds > 0 || this.state.minute >0)
    {

      if(this.state.seconds == 0)
      {
        this.setState({
          minute: this.state.minute - 1,
          seconds: 59,
        })
      }else {
        this.setState({
          seconds: this.state.seconds-1,
        });
      }
    }
  }
  render() {
    return (
      <Image style={{flex:1}} source={{uri: 'http://previews.123rf.com/images/xuanhuongho/xuanhuongho1502/xuanhuongho150200019/36325658-Amazing-background-on-Tet-holiday-in-Vietnam-banh-tet-banh-chung-or-glutinous-rice-cake-make-handmad-Stock-Photo.jpg'}}>
        <View style={styles.container}>

        <Text style={styles.title}>
            TET HOLIDAY
        </Text>
        <Text style={styles.desciption}>
            COUNTDOWN
        </Text>

        <View style={{flexDirection:'row'}}>
        <Text style={styles.welcome}>
        {this.state.day}
        </Text>
        <Text style={styles.welcome}>
        :
        </Text>
        <Text style={styles.welcome}>
        {
          this.state.hour<10?
          "0"+this.state.hour
          :
          this.state.hour
        }
        </Text>
        <Text style={styles.welcome}>
        :
        </Text>
        <Text style={styles.welcome}>
        {
          this.state.minute<10?
          "0"+this.state.minute
          :
          this.state.minute
        }
        </Text>
        <Text style={styles.welcome}>
        :
        </Text>
        <Text style={styles.welcome}>
        {
          this.state.seconds<10?
          "0"+this.state.seconds
          :
          this.state.seconds
        }
        </Text>
        </View>



        </View>
      </Image>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:-150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0, 0, 0, 0.5)'
  },
  title:{
    fontSize: 40,
    color: 'white',
    padding:10,
    marginTop:50
  },
  top:{
    alignItems:'center',
    justifyContent:'center',
        backgroundColor:'rgba(0, 0, 0, 0.5)'
  },
  welcome: {
    fontSize: 30,
    margin: 5,
    color:'white',
  },
  desciption: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
});

module.exports = Democountdown;
