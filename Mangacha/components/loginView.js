'use strict'
import React, {Component} from 'react';
import{
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  TextInput,
  Dimensions,
  ScrollView
}from 'react-native';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

class loginView extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: "",
      box: require('./img/ico_box.png'),
      value: this.props.data,
    };
  }
  redirect(routeName, token,message){
    this.props.navigator.replace({
      name: routeName,
      passProps: {
        accessToken: token,
        message: message

      }
    })
  }
  componentDidMount(){
    console.log(this.state.value);
  }
  onBack(routeName){
    this.props.navigator.pop({
      name: routeName,
      passProps: {

      }
    })
  }

  navigate(routeName){
    this.props.navigator.push({
      name: routeName,
      passProps: {
        data: this.state.value
      }
    })
  }

  async onLoginPressed(){

              let formdata = new FormData();
              formdata.append("username", this.state.username);
              formdata.append("password", this.state.password);
              try {
                let response = await fetch('http://mangacha.esy.es/api/login.php', {
                  method: 'post',
                  headers: {
                  'Content-Type': 'multipart/form-data',
                  },
                  body: formdata

                });
                let res = await response.text();
                 var jsonResponse = JSON.parse(res);
                this.setState({
                  code: jsonResponse['code'],
                   message: jsonResponse['message'],
                   result: jsonResponse['result'],
                   id: jsonResponse['result']['id'],
                   errors: jsonResponse['message'],
                   username: jsonResponse['result']['username']
                });

                console.log(this.state.message);

                if (response.status >= 200 && response.status < 300 && jsonResponse['code']==0) {
                    //Handle success
                    let accessToken = res;
                    console.log(this.state.code + " " + this.state.message
                    + " " + this.state.id );
                    //On success we will store the access_token in the AsyncStorage
                  //  this.storeToken(accessToken);
                  // if(this.state.author == 1){
                  //   this.redirect('admin',this.state.username, this.state.message);
                  // }else {
                  //   this.redirect('home',this.state.username, this.state.message);
                  // }
                  alert(this.state.message);

                } else {
                    //Handle error
                    alert(this.state.message);

                    let error = this.state.message;
                    throw error;
                }
              } catch(error) {
                  this.setState({error: error});
                  console.log("error " + error);
                  console.log(this.state.username + " & " + this.state.password);
                 alert("Sai tài khoản hoặc mật khẩu.!");
                  this.setState({showProgress: false});
                  console.log(this.props.result);
              }
  }
  onChecked(){
      if(this.state.box == require('./img/ico_box.png')){
        this.setState({box: require('./img/ico_tick1.png')});
      }else{
        this.setState({box: require('./img/ico_box.png')});
      }
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
        <View style={{flex:0.7}}>
          <Image style={{flex: 1, width:120, height:105, marginTop:10}} source={require('./img/ico_logo.png')}/>
        </View>
        <View style={{flex:2.3, marginTop:30}}>
          <TextInput onChangeText={(val) => this.setState({username: val})}
          style={styles.input} placeholder={this.props.data['0'].username}/>
          <TextInput onChangeText={(val) => this.setState({password: val})}
          style={styles.input} secureTextEntry= {true} placeholder={this.props.data['0'].password}/>

          <TouchableOpacity style={{marginTop:10}} onPress={()=>{this.onChecked()}}>
            <View style={{flexDirection: 'row',margin:5}}>
              <View>
                <Image style={{height:20,width:20}} source={this.state.box}/>
              </View>
              <View>
                <Text style={{marginLeft:5}}>{this.props.data['0'].keeplogin}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.onLoginPressed.bind(this)}>
          <Text style={styles.text}>{this.props.data['0'].login}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigate.bind(this,'register')} style={styles.register}>
            <Text style={styles.textButton}>{this.props.data['0'].register}</Text>
          </TouchableOpacity>

          <View style={{flex:1, flexDirection: 'row', marginTop: 10}}>
          <TouchableOpacity style={{marginRight:5}}>
          <Image style={{width:160,height:35, justifyContent:'center'}} source={require('./img/ico_fb.png')}>
          <Text style={{fontSize:13,color:'white', marginLeft:30}}>
            Đăng nhập Facebook
          </Text>
          </Image>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:5}}>
          <Image style={{width:160,height:37, justifyContent:'center'}} source={require('./img/ico_gg.png')}>
          <Text style={{fontSize:13,color:'white', marginLeft:40}}>
           Đăng nhập Google
          </Text>
          </Image>
          </TouchableOpacity>
          </View>
          </View>
      </View>
     </ScrollView>
     </Image>
    );
  }

}
loginView.propType = {
  data: React.PropTypes.arrayOf(React.PropTypes.object)
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
module.exports = loginView;
