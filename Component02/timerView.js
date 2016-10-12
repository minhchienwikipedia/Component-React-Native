import React, {Component} from 'react';
import{
  View,Text,TouchableOpacity,StyleSheet
} from 'react-native';

const timer = require('react-native-timer');

export default class Foo extends Component {
  state = {
    showMsg: false
  };

  componentWillUnmount() {
    timer.clearTimeout(this);
  }

  showMsg() {
    this.setState({showMsg: true}, () => timer.setTimeout(
      this, 'hideMsg', () => this.setState({showMsg: false}), 2000
    ));
  }
  do_alert(){
    timer.setTimeout(this,'',()=>
        alert("Hello World")
    ,2000);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity style={styles.button} onPress={() => requestAnimationFrame(() => this.showMsg())}>
          <Text style={styles.text}>Press Me</Text>
        </TouchableOpacity>

        {this.state.showMsg ? ( <Text>Hello!! .. Auto Hide </Text>) : (null)}
        <TouchableOpacity style={styles.button} onPress={() => requestAnimationFrame(() => this.do_alert())}>
          <Text style={styles.text}>Timer - 2s show alert</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

var styles = StyleSheet.create({
  button: {
    marginTop:10,
    width:150,

    backgroundColor: '#4CAF50',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    color: 'white',
  }
});
