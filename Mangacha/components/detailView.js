import React, {Component} from 'react';
import {
  View, Text,
  Dimensions
} from 'react-native';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
class Detail extends Component {

  onBack(routeName){
    this.props.navigator.pop({
      name: routeName,
      passProps: {

      }
    })
  }

  render(){
    return(
      <Image style={{flex:1, width: null, height: null}} source={require('./img/bgr.png')}>
      <ScrollView style={{flex:1}} vertical= {true}>
      <View style={styles.toolbar}>
      <TouchableOpacity style={styles.back} onPress={this.onBack.bind(this,'root')}>
        <Image style={{height:20,width:25}} source={require('./img/btn_back_blue.png')}/>
      </TouchableOpacity>
      </View>
      <View style={styles.container}>

      </View>
     </ScrollView>
     </Image>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flex:9.3,
      margin:10,
    },
    toolbar: {
      flex:0.7
    },
    back: {
      marginTop: 15,
      marginLeft:10,
      height:20,
      width:20
    },
    input:{
      width:deviceWidth - 30,
    },
    button: {
      marginTop:10,
      width:deviceWidth - 30,
      backgroundColor: '#0057a7',
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    register: {
      width:deviceWidth - 30,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textButton: {
      fontSize: 12,
      color: '#0057a7',
    },
    title: {
      color:'#48bbec',
      fontSize: 30,
      marginBottom:20
    },
    text: {
      fontSize: 16,
      color: 'white',
    }
});
module.exports = Detail;
