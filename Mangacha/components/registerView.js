import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel}
from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
var radio_props = [
  {label: 'Nam  ', value: 0 },
  {label: 'Nữ', value: 1 }
];
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var getdate = new Date();


class registerView extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      name: "",
      email: "",
      phone: "",
      gender: "",
      dateofbirth: "",
      password: "",
      repassword: "",
      errors: [],
      date: getdate,
      radiochecked: require('./img/ico_radio_checked.png'),
      radio: require('./img/ico_radio.png'),
      check:  require('./img/ico_radio_checked.png'),
      value: this.props.data
    }
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
  async onRegisterPressed(){

    if(this.state.password == this.state.repassword)
    {
      let formdata = new FormData();
      formdata.append("username", this.state.name);
      formdata.append("password", this.state.password);
      formdata.append("email", this.state.email);
      formdata.append("phone", this.state.phone);
      formdata.append("gender", this.state.gender);
      formdata.append("dateofbirth", this.state.date);
      try {
        let response = await fetch('http://mangacha.esy.es/api/register.php',{
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
           result: jsonResponse['result']

        });


        if (response.status >= 200
          && response.status < 300
          && jsonResponse['code']==0) {
            // show alert & moving screen
            alert(this.state.message);

            this.redirect('home',this.state.result, this.state.message);
        } else {
            //Handle error
            alert(this.state.message);
            let error = res;
            throw error;
        }
      }
      catch(error)
      {
        alert("Bạn chưa điền thông tin.!");
      }
    }else{
      alert("Bạn nhập lại sai mật khẩu.!");
    }


  }


  onChecked(value){
    if(value==0&&this.state.radiochecked==this.state.check)
    {
      this.setState({radiochecked:this.state.radiochecked, radio: this.state.radio})
    }else
    if(value==1&&this.state.radio==this.state.check)
    {
      this.setState({radiochecked:this.state.radiochecked, radio: this.state.radio})
    }
    else{
      this.setState({radiochecked:this.state.radio, radio: this.state.radiochecked})
    }

  }


  render(){
    return(
      <Image style={{flex:1, width: null, height: null}} source={require('./img/bgr.png')}>
      <ScrollView style={{flex:1,}} >
      <View style={styles.toolbar}>
      <TouchableOpacity style={styles.back} onPress={this.onBack.bind(this,'root')}>
        <Image style={{height:20,width:25}} source={require('./img/btn_back_blue.png')}/>
      </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={{flex:0.7}}>
          <Image style={{flex: 1, width:120, height:105, marginTop:10}} source={require('./img/ico_logo.png')}/>
        </View>
        <View style={{flex:2.3}}>
          <TextInput onChangeText={(val) => this.setState({name: val})}
          style={styles.input} placeholder={this.state.value['0'].username}/>
          <TextInput onChangeText={(val) => this.setState({password: val})}
          style={styles.input} secureTextEntry= {true} placeholder={this.state.value['0'].password}/>
          <TextInput onChangeText={(val) => this.setState({repassword: val})}
          style={styles.input} secureTextEntry= {true} placeholder={this.state.value['0'].repassword}/>
          <TextInput onChangeText={(val) => this.setState({email: val})}
          style={styles.input} placeholder="Email"/>
          <TextInput onChangeText={(val) => this.setState({phone: val})}
          style={styles.input} placeholder={this.state.value['0'].phone}/>
          <View style={{flexDirection: 'row', width:300}}>
            <View style={{margin: 10}}>
             <Text style={{color: '#1a75ff'}}>
             {this.state.value['0'].gender}
             </Text>
            </View>
            <View style={{marginTop: 10,flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => {this.onChecked(0)}}>
                  <Image source={this.state.radiochecked} style={{width:20,height:20}}/>

                </TouchableOpacity>
                <Text style={{marginLeft: 5, color:'#232323'}}>{this.state.value['0'].male}</Text>
              </View>
              <View style={{flexDirection: 'row', marginLeft: 20}}>
                <TouchableOpacity onPress={() => {this.onChecked(1)}}>
                <Image source={this.state.radio} style={{width:20,height:20}}/>

                </TouchableOpacity>
                <Text style={{marginLeft: 5, color:'#232323'}}>{this.state.value['0'].female}</Text>
              </View>

            </View>
          </View>
          <View style={{flexDirection: 'row', width:300}}>
            <View style={{margin: 10}}>
             <Text style={{color: '#1a75ff'}}>
             {this.state.value['0'].dateofbirth}
             </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
            <DatePicker
            style={{width: 200,marginLeft: -60 }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon= {false}
            customStyles={{
              dateInput: { borderWidth:0}
              }}
              onDateChange={(date) => {this.setState({date: date})}}
            />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.onRegisterPressed.bind(this)}>
          <Text style={styles.text}>
            {this.state.value['0'].register}
          </Text>
          </TouchableOpacity>
          </View>
      </View>
     </ScrollView>
     </Image>
    )
  }
}
registerView.propType = {
  data: React.PropTypes.arrayOf(React.PropTypes.object)
}
var styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    flex:9.3,
    margin:10,

  },
  toolbar: {
    flex:0.7
  },
  title: {
    fontSize: 22,
  },
  back: {
    marginTop: 15,
    marginLeft:10,
    height:20,
    width:20
  },
  input: {
    width: deviceWidth - 30,
  },
  inputdate: {
    width:40,
    paddingBottom: 0,
    paddingTop:0,
    marginBottom:10

  },
  inputyear: {
    width:60,
    paddingBottom: 0,
    paddingTop:0,
    marginBottom:10

  },
  button: {
    marginTop:10,
    width:deviceWidth - 30,

    backgroundColor: '#0057a7',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  }
});
module.exports = registerView;
