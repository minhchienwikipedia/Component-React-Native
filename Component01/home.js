import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Home extends Component {
  render(){
    return(
      <View style={{marginTop:120, alignItems:'center'}}>
        <TouchableOpacity style={styles.button}>
        <Text style={styles.text} onPress={Actions.viewPager}> Click to View Pager
        </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
        <Text style={styles.text} onPress={Actions.view1}> Click to ListView
        </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
        <Text style={styles.text} onPress={Actions.slider}> Click to Slider
        </Text>
        </TouchableOpacity>
      </View>
    );
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
