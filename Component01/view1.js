import React, { Component } from 'react';
import { View, Text ,
  ListView,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var PAGES = [
  'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
    'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
    'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
    'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
    'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
    'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
];

export default class View1 extends Component {
  constructor(props){
    super(props);
     this.dataSource = new ListView.DataSource({rowHasChanged: (r1,r2) => r1!==r2});
  }

  render() {
    return (
      <ListView style={{flex:1, marginTop:50}}
        dataSource={this.dataSource.cloneWithRows(PAGES)}
        renderRow={this.renderRow}/>
    )
  }

  renderRow(data: Object){
    return (
      <Image
      style={{width:deviceWidth, height: deviceHeight,flex:1}}
        source={{uri: data}}
        />
    );
  }
}

var styles = StyleSheet.create({

  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});
