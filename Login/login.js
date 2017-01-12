import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ListView,
  RefreshControl
} from 'react-native';
window.navigator.userAgent = "react-native";
// npm install socket.io-client
import io from 'socket.io-client/dist/socket.io';
var socket;
var arrayData = [];
var arrayMsg = [];
var s;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const msg = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      dataSourceMsg: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      refreshing: false,
      refreshingMsg: false,
      register: true,
    });
    socket = io("http://192.168.1.4:3000");
    socket.on("server-send-register-fail",this.onFail.bind(this));
    socket.on("server-send-register-success",this.onSuccess.bind(this));
    socket.on("server-send-msg",this.onMessage.bind(this));
  }
  onFail(data){
      alert("User '"+data+"' not availble");
      this.setState({
        register:true,
      })
  }
  onSuccess(data){
      arrayData.push(data);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(arrayData),
      })
  }
  onMessage(data){
       arrayMsg.push(data);
       this.setState({
         dataSourceMsg: this.state.dataSourceMsg.cloneWithRows(arrayMsg),
       })
  }
  componentWillMount(){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(arrayData),
      dataSourceMsg: this.state.dataSourceMsg.cloneWithRows(arrayMsg),
    })
  }
  onRegister(){
    this.clearText('txtUsername');
    socket.emit("client-send-username",this.state.username);
    this.setState({
      register:false,
    })
  }
  _onRefresh() {
    this.setState({refreshing: true});
    setTimeout(() => {
      // prepend 10 items
      this.setState({
        refreshing: false,
        dataSource: ds.cloneWithRows(arrayData),
      });
    }, 1000);
  }
  _onRefreshMsg() {
    this.setState({refreshingMsg: true});
    setTimeout(() => {
      // prepend 10 items
      this.setState({
        refreshingMsg: false,
        dataSourceMsg: msg.cloneWithRows(arrayMsg),
      });
    }, 1000);
  }
  clearText(fieldName) {
    this.refs[fieldName].setNativeProps({text: ''});
  }
  _renderRow(data){
    return(
      <TouchableOpacity>
        <Text>{data.username}</Text>
      </TouchableOpacity>

    )
  }
  _renderRowMsg(data){
    return(
      <TouchableOpacity style={{flexDirection:'row'}}>
        <Text>{data.username}  : </Text>
        <Text> {data.msg}</Text>
      </TouchableOpacity>

    )
  }
  onChat(){
    this.clearText('txtChat');
    socket.emit("client-send-msg",this.state.msg)
  }
  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:1}}>
          <View style={{flex:1,backgroundColor:'#ec8e8e',justifyContent:'space-between'}}>
            <View style={{flex:1}}>
            <View style={{alignItems:'center'}}>
              <Text style={{color:'white',fontWeight:'bold'}}>
               USER ONLINE
              </Text>
            </View>
              <ListView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                    tintColor="#ff0000"
                    title="Loading..."
                    titleColor="#00ff00"
                    colors={['#ff0000', '#00ff00', '#0000ff']}
                    progressBackgroundColor="#ffffff"
                  />
                }
                 style={{flex:1}}
                 enableEmptySections
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
              />
            </View>

            {
              this.state.register==true?
              <View style={{flexDirection:'row',padding:10}}>
                <TextInput style={{flex:1}}
                ref={'txtUsername'}
                onChangeText={(val) => this.setState({username: val})}
                 placeholder="Username"/>
                <TouchableOpacity onPress={()=>this.onRegister()} style={{width:100,alignItems:'center',justifyContent:'center',width:100,height:40,backgroundColor:'#4584e3'}}>
                  <Text style={{color:'white'}}>
                    Register
                  </Text>
                </TouchableOpacity>
                </View>
              :
              <Text></Text>
            }


          </View>
          <View style={{flex:2,backgroundColor:'#8eec91'}}>
            <View style={{backgroundColor:'#ffffff',flex:1,}}>
            <View style={{alignItems:'center'}}>
              <Text style={{color:'black',fontWeight:'bold'}}>
               CHAT
              </Text>
            </View>

            <ListView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshingMsg}
                  onRefresh={this._onRefreshMsg.bind(this)}
                  tintColor="#ff0000"
                  title="Loading..."
                  titleColor="#00ff00"
                  colors={['#ff0000', '#00ff00', '#0000ff']}
                  progressBackgroundColor="#ffffff"
                />
              }
               style={{flex:1}}
               enableEmptySections
              dataSource={this.state.dataSourceMsg}
              renderRow={this._renderRowMsg.bind(this)}
            />
            </View>
            <View style={{flexDirection:'row',padding:10}}>
              <TextInput
              ref={'txtChat'}
              onChangeText={(val) => this.setState({msg: val})}
              style={{flex:1}}
              placeholder="Message.."/>
              <TouchableOpacity onPress={()=>this.onChat()} style={{width:100,alignItems:'center',justifyContent:'center',width:100,height:40,backgroundColor:'#4584e3'}}>
                <Text style={{color:'white'}}>
                  Chat
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </View>
    )
  }
};

module.exports = Login;
