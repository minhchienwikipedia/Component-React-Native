import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
var deviceWidth = Dimensions.get('window').width;
export default class ShowImage extends Component{
  render(){
    return(
      <View style={{flex:1}}>
      <Image
        source={{uri: this.props.img}}
        style={styles.page} />
      </View>
    )
  }
}

var styles = StyleSheet.create({

  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  page: {
    flex:1, marginTop:50,
    width: deviceWidth,
  },
});
