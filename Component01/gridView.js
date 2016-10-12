import React, {Component} from "react";
import {Text, View,Image,TouchableOpacity} from "react-native";
import GridView from "react-native-easy-grid-view";
import { Actions } from 'react-native-router-flux';

class gridView extends Component {
   constructor(props) {
       super(props);
       var ds = new GridView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
       this.state = {
           dataSource: ds.cloneWithCells([
               {
                   text: 1,
                   img: 'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
               }
               , {
                   text: 2,
                   img:'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',

               }, {
                   text: 3,
                   img:'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',

               }, {
                   text: 4,
                   img:'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',

               }, {
                   text: 5,
                   img:'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',

               }, {
                   text: 6,
                   img:'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',

               }], 3),
           cellWidth: 0,
           cellHeight: 0
       };
   }
   showImage(img){
     Actions.showImage({img: img});
   }
   _renderCell(cell) {
       return (
          <TouchableOpacity onPress={()=>{this.showImage(cell.img)}}>
       <View onLayout={event => {
         var width = event.nativeEvent.layout.width;
        if(this.state.cellWidth!=width){
        this.setState({cellWidth:width})
        }
        if(this.state.cellHeight!=width){
        this.setState({cellHeight:width})
        }
       }}>


           <View style={{flex:1,justifyContent:'center'}}>
                <Text style={{backgroundColor:'#0004',textAlign:'center',color:'#fff'}}>{cell.text}</Text>
                <Image
                style={{width:this.state.cellWidth,height:this.state.cellHeight}}
                 source={{uri: cell.img} }/>

           </View>
           </View>
        </TouchableOpacity>
     )
   }

   render() {
       return (
         <View style={{marginTop:50}}>
           <GridView dataSource={this.state.dataSource}
                     spacing={8}
                     style={{padding:16}}
                     renderCell={this._renderCell.bind(this)}

           />
       </View>
     )
   }
}

module.exports = gridView;
