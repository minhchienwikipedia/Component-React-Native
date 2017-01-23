import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  TouchableOpacity,
  Modal,
  RefreshControl
} from 'react-native';

export default class DemoList extends Component {
  constructor(props){
    super(props);
    this.state=({
      value:'',
      value_convert:'',
    })
  }
  onConvert(){
    if(this.state.value!='')
    {
      this.setState({
        value_convert: this.state.value.toUpperCase()
      });
    }else {
      alert("Bạn cần nhập dữ liệu");
    }
  }
  render(){
    return(
      <View style={{padding:10}}>

      <View style={{flexDirection:'row'}}>
        <TextInput style={{width:200}} onChangeText={(val) => this.setState({value: val})}
         placeholder="input"/>
        <TouchableOpacity style={{width:100,height:40,backgroundColor:'#2c9ffc',alignItems:'center',justifyContent:'center',borderRadius:10}} onPress={()=>this.onConvert()}>
          <Text style={{color:'white',fontWeight:'bold'}}>
            Convert
          </Text>
        </TouchableOpacity>

      </View>
      <Text>
      {this.state.value_convert}
      </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = DemoList;
