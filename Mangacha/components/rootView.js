'use strict'
import React, {Component} from 'react';
import{
  View,
  Text,
  TouchableOpacity ,
  StyleSheet,
  Alert,
  Image,
  TextInput,
  Dimensions,
  Switch,
  ScrollView
}from 'react-native';

import SplashScreen from './splashscreen.js';
import DrawerLayout from 'react-native-drawer-layout';
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;


class loginView extends Component{
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      drawerLockMode: 'unlocked',
    };
  }

  navigate(routeName, data){
    this.props.navigator.push({
      name: routeName,
      passProps: {
        data: data
      }
    })
  }
  componentWillMount(){
    this.onChangeLanguage('0')
  }
  async onChangeLanguage(language){
      let formdata = new FormData();
      formdata.append("language", language);
      try {
        let response = await fetch('http://mangacha.esy.es/api/changelanguage.php', {
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
           language_id: jsonResponse['result']['0'].id,
           language_password: jsonResponse['result']['0'].password,
           language_repassword: jsonResponse['result']['0'].repassword,
           language_username: jsonResponse['result']['0'].username,
           language_login: jsonResponse['result']['0'].login,
           language_register: jsonResponse['result']['0'].register,
           language_keeplogin: jsonResponse['result']['0'].keeplogin,
           language_phone: jsonResponse['result']['0'].phone,
           language_gender: jsonResponse['result']['0'].gender,
           language_dateofbirth: jsonResponse['result'].dateofbirth
        });


        if (response.status >= 200 && response.status < 300 && jsonResponse['code']==0) {
          console.log(this.state.result['0']);

        } else {
            //Handle error
            alert(this.state.message);
            let error = this.state.message;
            throw error;
        }
      } catch(error) {
        console.log("error " + error);
         alert("Wrong somthing.!");
      }
  }
  render(){
    const {
      drawerLockMode,
    } = this.state;
    // Menu left
    const navigationView = (

      <View style={{flex:1}}>
        <View style={styles.leftTop}>
          <Image style={styles.leftTop_img} source={require('./img/bgr_lefttop.png')}>
            <TouchableOpacity style={{marginLeft:10,marginBottom:10,justifyContent:'center',alignItems:'center'}}>
              <Image style={{width:71, height:105}} source={require('./img/ico_avatar.png')}>
              </Image>
              <Text style={{fontSize:14,color:'white',fontWeight: 'bold',}}>
                Đường Minh Chiến
              </Text>
              <Text style={{fontSize:12,color:'white'}}>
                Khách
              </Text>
            </TouchableOpacity>
            <Image style={{width:45, height:40, marginTop:100,marginRight:10}} source={require('./img/ico_mangacha_name.png')}>
            </Image>
          </Image>
        </View>
        <ScrollView style={styles.leftBot}>
          <View style={{flexDirection: 'row', height:30}}>
            <Image style={styles.ico_menu} source={require('./img/ico_mangacha.png')}/>
            <Text style={styles.text_blue}>TÀI KHOẢN</Text>
          </View>
          <TouchableOpacity onPress={this.navigate.bind(this,'login', this.state.result)} style={styles.border_item}>
            <Image style={styles.ico_item} source={require('./img/ico_user.png')}/>
            <Text>Đăng Nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.border_item}>
            <Image style={styles.ico_item} source={require('./img/ico_napvip.png')}/>
            <Text>Nạp Vip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.border_item}>
            <Image style={styles.ico_item} source={require('./img/ico_phonggiaoluu.png')}/>
            <Text>Phòng Giao Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.none_border}>
            <Image style={styles.ico_item} source={require('./img/ico_friends.png')}/>
            <Text>Bạn Bè</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', height:30}}>
            <Image style={styles.ico_menu} source={require('./img/ico_mangacha.png')}/>
            <Text style={styles.text_blue}>NỘI DUNG</Text>
          </View>
          <TouchableOpacity style={styles.border_item}>
            <Image style={styles.ico_item} source={require('./img/ico_theodoi.png')}/>
            <Text>Theo Dõi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.border_item}>
            <Image style={styles.ico_item} source={require('./img/ico_datai.png')}/>
            <Text>Đã Tải</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.border_item}>
            <Image style={styles.ico_item} source={require('./img/ico_mylibrary.png')}/>
            <Text>Truyện Của Tôi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.border_item}>
            <Image style={styles.ico_item} source={require('./img/ico_thongbao.png')}/>
            <Text>Thông Báo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.none_border}>
            <Image style={styles.ico_item} source={require('./img/ico_hinhnen.png')}/>
            <Text>Hình Nền</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', height:30}}>
            <Image style={styles.ico_menu} source={require('./img/ico_mangacha.png')}/>
            <Text style={styles.text_blue}>THỂ LOẠI</Text>
          </View>
          <TouchableOpacity style={styles.none_border}>
            <Image style={styles.ico_item} source={require('./img/ico_theloai_a.png')}/>
            <Text>Anime</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.none_border}>
            <Image style={styles.ico_item} source={require('./img/ico_theloai_a.png')}/>
            <Text>Anime</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.none_border}>
            <Image style={styles.ico_item} source={require('./img/ico_theloai_a.png')}/>
            <Text>Anime</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
    return(
      <SplashScreen duration={3000} backgroundColor={'blue'}>
      <Image
      style={{flex:1, width: null, height: null}}
        source={require('./img/bgr.png')}
       >
      <DrawerLayout
       onDrawerSlide={(e) => this.setState({drawerSlideOutput: JSON.stringify(e.nativeEvent)})}
       onDrawerStateChanged={(e) => this.setState({drawerStateChangedOutput: JSON.stringify(e)})}
       drawerWidth={300}
       drawerLockMode={drawerLockMode}
       ref={(drawer) => { return this.drawer = drawer  }}
       keyboardDismissMode="on-drag"
       statusBarBackgroundColor="blue"
       renderNavigationView={() => navigationView}>

        <Image style={styles.toolbar} source={require('./img/bgr_toolbar.png')}>
          <View>
          <TouchableOpacity onPress={() => this.drawer.openDrawer()}>
            <Image style={styles.ico} source={require('./img/ico_menu.png')}/>
          </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'center', width:null, alignItems: 'center'}}>
            <Text style={styles.title}>
              MANGACHA
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Image style={styles.icon} source={require('./img/ico_load.png')}/>
            </TouchableOpacity>
            <TouchableOpacity>
            <Image style={styles.icon} source={require('./img/ico_search.png')}/>
            </TouchableOpacity>
          </View>
        </Image>

       <View style={styles.container}>
       <Image style={{width:deviceWidth,height:135}} source={require('./img/bgr_top.png')}/>
        <View style={styles.container_top}>
          <View style={{flex:1,flexDirection:'row',marginTop:10}}>
            <Image style={{width: 30,height:30}} source={require('./img/ico_mangacha.png')}/>
            <Text style={fontWeight: 'bold'}>
              TRUYỆN MỚI
            </Text>
          </View>
          <View>
            <Image style={{width: 80,height:40}} source={require('./img/btn_viewall.png')}/>
          </View>
        </View>
        <View style={styles.container_bot}>
        </View>
       </View>
     </DrawerLayout>
     </Image>
     </SplashScreen>
    );
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,

    },
    container_top:{
      paddingLeft:10,
      paddingTop:10,
      flexDirection:'row',
      justifyContent: 'space-between',
      flex:1,
      backgroundColor:'white'
    },
    container_bot:{
      paddingLeft:10,
      paddingTop:10,
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'space-between',
      flex:1

    },
    toolbar: {
      height:45,
      width: null,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    ico: {
      width:25,
      height:20,
      margin:10
    },
    icon: {
      width:20,
      height:20,
      marginTop:10,
      marginRight:10,
    },
    ico_menu:{
      width:20,
      height:20,
      marginRight:10,
      marginLeft:2,
      marginTop:5
    },
    ico_item:{
      width:25,
      height:25,
      marginRight:10,
    },
    border_item:{
      borderBottomWidth:0.3,
      borderBottomColor:'#c7c7c7',
      flexDirection: 'row',
      height:30,
      marginTop:5
    },
    none_border: {
      flexDirection: 'row',
      height:30,
      marginTop:5
    },
    leftTop_img:{
      width: null,
      height:null,
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    leftTop: {
      flex:2.5,
      width: null,
    },
    text_blue:{
      color:'#0074bd',
      marginTop:5
    },
    leftBot: {
      marginTop:10,
      marginLeft:10,
      width: null,
      flex: 7.5,
    },
    containerButton: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
      padding:30
    },
    input:{
      width:300,
      height: 50,
      marginTop: 10,
      padding: 4,
      borderWidth: 1,
      borderColor: '#48bbec'
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
      marginTop:10,
      width:deviceWidth - 30,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },

    textButton: {
      color: 'white',
      fontFamily: 'Roboto',
    },
    title: {
      color:'white',
      fontSize: 20,

    }
});
module.exports = loginView;
