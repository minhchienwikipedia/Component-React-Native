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
      value : 2,
      disabled: true,
      check: 'Enable',
    });

  }
  onClick(){
    if(this.state.disabled){
      this.setState({
        disabled: false,
        check: 'Disabled',
        backgroundColor: 'white'
      });
    }else {
      this.setState({
        disabled: true,
        check: 'Enable'
      });
    }

  }

  changeColor(color: string){
    if(this.state.backgroundColor=='white')
    {
      this.setState = ({
          backgroundColor: color
      });
    }
    else {
      this.setState = ({
          backgroundColor: color
      });
    }
  }

  render() {
    return (
      <View style={{backgroundColor: this.state.backgroundColor, flex:1}}>
      <View style={styles.container}>
        <Slider
          disabled = {this.state.disabled}
          trackStyle={{
            height:10,
            backgroundColor: '#e7e7e7'
          }}
          value={this.state.value}
          minimumValue={1}
          maximumValue={5}
          onValueChange={(value) => this.setState({value})} />
        <Text>Value: {this.state.value}</Text>
        <TouchableOpacity style={styles.button} onPress={()=>{this.onClick()}}>
          <Text style={styles.text}>
            {this.state.check}
          </Text>
        </TouchableOpacity>
        <View style={styles.changeBackground}>
        <TouchableOpacity style={styles.button} onPress={()=>{this.changeColor('blue')}}>
          <Text style={styles.text}>
            Change to Blue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{this.changeColor('white')}}>
          <Text style={styles.text}>
            Change to White
          </Text>
        </TouchableOpacity>

        </View>
      </View>
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
