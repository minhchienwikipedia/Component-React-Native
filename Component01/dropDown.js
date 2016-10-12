import React, {Component} from 'react';
import{
  View, Text,
} from 'react-native';
import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';
export default class dropDown extends Component{
  constructor(props){
    super(props);
    this.state = ({
      name: ''
    });
  }
  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }


  _name(value) {

  this.setState({
      name: value
    });
  }

  render() {
    return (
      <View style={{ flex: 1,
        justifyContent: 'center',
        alignItems: 'center' }}>
          <Select
            width={250}
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Select a Name ..."
            onSelect={this._name.bind(this)}>
            <Option>Chien</Option>
            <Option>Minh</Option>
            <Option>Nam</Option>
            <Option>Hoang</Option>
            <Option>Thanh</Option>
            <Option>Chien</Option>
            <Option>Toan</Option>
            <Option>Ha</Option>
            <Option>Hung</Option>
            <Option>Tai</Option>

          </Select>

          <Text>Selected name: {this.state.name}</Text>

          <OptionList ref="OPTIONLIST"/>
      </View>
    );
  }
}
