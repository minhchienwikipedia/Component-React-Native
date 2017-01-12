import React, {Component} from 'react';
import {
  View,
  Text,
  Navigator,
  StyleSheet
} from 'react-native';
import Root from './components/rootView.js';
import Login from './components/loginView.js';
import Register from './components/registerView.js';
import Detail from './components/detailView.js';
class Mangacha extends Component{
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
    if(route.name == 'detail'){
      return <Detail navigator = {navigator} {...route.passProps}/>
    }
  }

  render(){
    return(
      <View style={style.container}>
        <Navigator
          initialRoute={{name: 'root'}}
          renderScene={this.renderScene.bind(this)}
        />
      </View>
    );
  }
}
var style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
})
module.exports = Mangacha;
