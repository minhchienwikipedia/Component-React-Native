import React, {Component} from 'react';
import {
  View,
  Text,
  Navigator
} from 'react-native';
import Login from './components/loginView';
import Register from './components/registerView';
import Root from './components/rootView';
class Mangacha extends Component{
  // declare navigator and condition navigator
    renderScene(route, navigator){
      if(route.name == 'root'){
        return <Root navigator = {navigator}/>
      }
      if(route.name == 'register'){
        return <Register navigator = {navigator} {...route.passProps}/>
      }
      if(route.name == 'login'){
        return <Login navigator = {navigator} {...route.passProps}/>
      }
    }
  render(){
    return(
      <Navigator
        initialRoute={{name: 'root'}}
        renderScene={this.renderScene.bind(this)}
      />
      )
  }
}

module.exports = Mangacha;
