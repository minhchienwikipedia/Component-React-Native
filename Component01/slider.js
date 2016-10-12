'use strict';
import React, {Component} from 'react';
var Slider = require('react-native-slider');
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  NativeModules,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
var deviceWidth = Dimensions.get('window').width;
export default class SliderExample extends Component{

  constructor(props) {
    super(props);
    this.state = ({
      value : 16,
      disabled: true,
      check: 'Enable',
      backgroundColor: 'black'
    });

  }
  onClick(){
    if(this.state.disabled){
      this.setState({
        disabled: false,
        check: 'Disabled',

      });
    }else {
      this.setState({
        disabled: true,
        check: 'Enable'
      });
    }

  }

  changeColor(color){
    switch (color) {
      case 'blue':
        this.setState({
          backgroundColor: '#337ab7'
        });
      break;
      case 'green':
        this.setState({
          backgroundColor: '#4dff4d'
        });
      break;
      case 'yellow':
        this.setState({
          backgroundColor: '#f0ad4e'
        });
      break;
      case 'pink':
        this.setState({
          backgroundColor: '#ff4d94'
        });
      break;


    }
  }
  reset(){
    this.setState({
        backgroundColor: 'black'
    });
  }
  render() {
    return (

      <View style={styles.container}>
        <Text style={{fontSize:this.state.value,
          color: this.state.backgroundColor}}>
          HELLO
        </Text>
        <Slider
          disabled = {this.state.disabled}
          trackStyle={{
            height:10,
            backgroundColor: '#e7e7e7'
          }}
          value={this.state.value}
          minimumValue={10}
          maximumValue={30}
          onValueChange={(value) => this.setState({value})} />
        <Text>Value: {this.state.value}</Text>
        <TouchableOpacity style={styles.button} onPress={()=>{this.onClick()}}>
          <Text style={styles.text}>
            {this.state.check}
          </Text>
        </TouchableOpacity>
        <View style={styles.changeBackground}>
        <TouchableOpacity style={styles.pickColor} onPress={()=>{this.changeColor('blue')}}>
        <Text style={{flex:1, backgroundColor:'#337ab7'}}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pickColor} onPress={()=>{this.changeColor('green')}}>
        <Text style={{flex:1, backgroundColor:'#4dff4d'}}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pickColor} onPress={()=>{this.changeColor('yellow')}}>
        <Text style={{flex:1, backgroundColor:'#f0ad4e'}}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pickColor} onPress={()=>{this.changeColor('pink')}}>
        <Text style={{flex:1, backgroundColor:'#ff4d94'}}></Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>{this.reset()}}>
          <Text style={styles.text}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>

    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',

  },
  pickColor: {
    marginTop:10,
    width:40,
    height:40,
  },
  button: {
    marginTop:10,
    width:150,
    backgroundColor: '#f44336',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    color: 'white',
  },
  changeBackground: {
    width: deviceWidth,
    flexDirection: 'row'
  }
});
