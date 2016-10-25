'use strict';
import React, {Component} from 'react';
var ReactNative = require('react-native');
const {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ListView
} = ReactNative;
var DrawerLayout = require('react-native-drawer-layout');

var DrawerLockModeSwitches = React.createClass({

  render: function() {
    const {
      value,
      onValueChange,
    } = this.props;

    return (
      <View>
        <View style={[styles.container, styles.split]}>
          <Switch onValueChange={value => value ? onValueChange('unlocked') : onValueChange('unlocked')} value={value === 'unlocked'} />
          <Text style={styles.spacedLeft}>Unlocked</Text>
        </View>
        <View style={[styles.container, styles.split]}>
          <Switch onValueChange={value => value ? onValueChange('locked-closed') : onValueChange('unlocked')} value={value === 'locked-closed'} />
          <Text style={styles.spacedLeft}>locked-closed</Text>
        </View>
        <View style={[styles.container, styles.split]}>
          <Switch onValueChange={value => value ? onValueChange('locked-open') : onValueChange('unlocked')} value={value === 'locked-open'} />
          <Text style={styles.spacedLeft}>locked-open</Text>
        </View>
      </View>
    );
  }
});


class Component03 extends Component{

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1!==r2});
    this.state=({
        drawerLockMode: 'unlocked',
        dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    })
  }
  renderRow(rowData){
    return(
      <Text>{rowData}</Text>
    )
  }

  render() {
    const {
      drawerLockMode,
    } = this.state;

    const navigationView = (
      <View style={[styles.container]}>
        <Text>Hello there! This is navigationView</Text>
        <DrawerLockModeSwitches value={drawerLockMode} onValueChange={value => this.setState({drawerLockMode: value})} />
        <TouchableHighlight onPress={() => this.drawer.closeDrawer()}>
          <Text>Close drawer</Text>
        </TouchableHighlight>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );


    return (
      <DrawerLayout
        onDrawerSlide={(e) => this.setState({drawerSlideOutput: JSON.stringify(e.nativeEvent)})}
        onDrawerStateChanged={(e) => this.setState({drawerStateChangedOutput: JSON.stringify(e)})}
        drawerBackgroundColor="#F2F2F2"
        drawerWidth={300}
        drawerLockMode={drawerLockMode}
        ref={(drawer) => { return this.drawer = drawer  }}
        keyboardDismissMode="on-drag"
        statusBarBackgroundColor="#F2F2F2"
        renderNavigationView={() => navigationView}>
        <View style={styles.container}>
          <Text style={styles.welcome}>Content!</Text>
          <DrawerLockModeSwitches value={drawerLockMode} onValueChange={value => this.setState({drawerLockMode: value})} />
          <Text>{this.state.drawerStateChangedOutput}</Text>
          <Text>{this.state.drawerSlideOutput}</Text>
          <TouchableHighlight onPress={() => this.drawer.openDrawer()}>
            <Text>Open drawer</Text>
          </TouchableHighlight>
          <TextInput style={styles.inputField} />
          <View>

      </View>
        </View>
      </DrawerLayout>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  inputField: {
    backgroundColor: '#F2F2F2',
    height: 40,
  },
  split: {
    flexDirection: 'row',
  },
  spacedLeft: {
    paddingLeft: 10,
  }
});

module.exports = Component03;
