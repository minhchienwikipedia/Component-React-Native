import React, {Component} from 'react';
import{
  View,
  Text,
  Navigator,
  TouchableHighlight
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
class Component02 extends Component{
  render() {
    return (
      <View style={{flex:1}}>
      <View style={{flex:1}}>
      <ScrollableTabView
      style={{marginTop: 20, }}
      initialPage={0}
      renderTabBar={() => <DefaultTabBar />}
    >
      <Text tabLabel='Tab #1'>My</Text>
      <Text tabLabel='Tab #2'>favorite</Text>
      <Text tabLabel='Tab #3'>project</Text>
      <Text tabLabel='Tab #4'>favorite</Text>
      <Text tabLabel='Tab #5'>project</Text>
    </ScrollableTabView>
    </View>
    <View style={{flex:1}}>
    <ScrollableTabView
    style={{marginTop: 20, }}
    initialPage={0}
    renderTabBar={() => <ScrollableTabBar />}
  >
  <Text tabLabel='Tab #1'>My</Text>
  <Text tabLabel='Tab #2 '>favorite</Text>
  <Text tabLabel='Tab #3 xxxx'>project</Text>
  <Text tabLabel='Tab #4 xxxxxxxx'>favorite</Text>
  <Text tabLabel='Tab #5 xxxxxxxxx'>project</Text>
    </ScrollableTabView>
    </View>
    </View>
  );
  }
}

module.exports = Component02;
