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
var DATA  = [
  'ABC1','ABC2','ABC3'
]
export default class DemoList extends Component {
  constructor(props){
    super(props);
    this.state = ({
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      modalVisible: false,
      refreshing: false,
    })
  }
  setModalVisible(){
    if(this.state.modalVisible == true)
    {
      this.setState({
        modalVisible: false,
      })
    }else {
      this.setState({
        modalVisible: true,
      })
    }
  }
  componentDidMount(){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(DATA)
    })
  }
  onDelete(data){
    DATA = DATA.filter(item => item !== data);
    // for(var i in DATA){
    //     if(DATA[i]==data){
    //         DATA.splice(i,1);
    //         break;
    //         }
    // }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(DATA)
    })

  }
  onAdd(){
    DATA.push(this.state.value);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(DATA)
    })
  }
  onEdit(data){
    this.setModalVisible();
    this.setState({
      data: data
    })
  }
  onUpdate(){
    for(var i=0; i < DATA.length; i++) {
     DATA[i] = DATA[i].replace(this.state.data, this.state.value_edit);
    }
    this.setModalVisible();

  }
  _onRefresh() {
    this.setState({refreshing: true});
    setTimeout(() => {
      // prepend 10 items
      this.setState({
        refreshing: false,
        dataSource: this.state.dataSource.cloneWithRows(DATA)
      });
    }, 1000);
  }
  _renderRow(data){
    return(
    <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:'space-between'}} >
      <View style={{flexDirection:'row'}}>
        <Text>
        {data}
        </Text>
      </View>
      <TouchableOpacity onPress={()=>this.onEdit(data)}>
      <Text>
      EDIT
      </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.onDelete(data)}>
      <Text>
      DELETE
      </Text>
      </TouchableOpacity>
    </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={{flexDirection:'row'}}>
        <TextInput style={{width:200}}
        placeholder="Value.."
        onChangeText={(value)=>this.setState({value: value})}
        />
        <TouchableOpacity onPress={()=>this.onAdd()}>
          <Text>
            Add
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <TouchableOpacity activeOpacity={1}
                onPress={() => {
                      this.setModalVisible()
                    }}
                style={{backgroundColor: 'rgba(0,0,0,.8)',flex:1,justifyContent:'center',alignItems:'center'}} >
            <TouchableOpacity activeOpacity={1} style={{
              width:300,

              backgroundColor:'white',
            }}>
          <TextInput style={{width:200}}
          placeholder="Value edit.."
          onChangeText={(value)=>this.setState({value_edit: value})}
          />
          <TouchableOpacity onPress={()=>this.onUpdate()}>
            <Text>
              Update
            </Text>
          </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
     </Modal>

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
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        enableEmptySections={true}
      />
      </View>
    );
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
