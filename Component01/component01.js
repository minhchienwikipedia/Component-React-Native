
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ToastAndroid,
  Platform,
  AlertIOS,
  Image,
} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import viewPager from './viewPager.js';
import Home from './home.js';
import View1 from './view1.js';
import Slider from './slider.js';
class Component01 extends Component {
  render() {
    return (
        <Router>
          <Scene key='root'>
            <Scene key="home" component={Home} title="Home"  initial={true}/>
            <Scene key="viewPager" component={viewPager} title="viewPager"/>
            <Scene key="view1" component={View1} title="ListView"/>
            <Scene key="slider" component={Slider} title="Slider"/>
          </Scene>
        </Router>
    );
  }
}
var styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },

});

module.exports = Component01;
