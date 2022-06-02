import React, {Component,PropTypes} from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
let { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';



export default class Picker extends Component {
  constructor(props){
    super(props);
    this.state = {
      pageWidth: width,
      pageHeight: height,
      searchText: null,
      selected: (this.props?.defaultSelected != null) ? this.props.defaultSelected : [],
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.defaultSelected !== prevProps.defaultSelected) {
      this.setState({
        selected: this.props.defaultSelected
      })
    }
  }

  componentDidMount = () => {
    const selected = this.state.selected
    if(typeof selected === "object"){
      selected.map(select => {
        this._onSelect(select)
      })
    } else {
      this._onSelect(selected)
    }
  }

  getNewDimensions(event){
        let pageHeight = event.nativeEvent.layout.height
        let pageWidth = event.nativeEvent.layout.width
        this.setState({
            pageHeight, pageWidth
        })
    }

  _onSelect = (item) => {
    let type;
    let selected = this.state.selected? this.state.selected : [];
    if(this.props.multiple){
      if(!selected){
        selected.push(item)
        this.setState({
          selected: selected
        })
      }
      else if(selected.indexOf(item) == -1){
        selected.push(item)
       
        this.setState({
          selected: selected
        })
      } else {
        selected = selected.filter(i => i != item)
        
        this.setState({
          selected: selected
        })
      }
    } else {
      if(!selected){
        selected.push(item)
        
        this.setState({
          selected: selected
        })
      }
      else if(selected.indexOf(item) == -1){
        selected = [item]
        
        this.setState({
          selected: selected
        })
      } else {
        
        selected = []
        
        this.setState({
          selected: selected
        })
      }
    }
    this.props.callback(selected)
  }

  _onSearch = (text) => {
    this.setState({
      searchText: text.length > 0 ? text.toLowerCase() : null
    })
  }

  _isSelected = (item) => {
    
    let selected = this.state.selected? this.state.selected : null;
    
    if(selected){ 
      if(selected.indexOf(item) == -1){
        return false
      }
    }
    return true
  }

  filterObjectByValue = (obj, predicate) => {
    return Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} )
  }

  render(){
    const { options, returnValue } = this.props;
    const list = this.state.searchText ? this.filterObjectByValue(options, option => option.toLowerCase().includes(this.state.searchText)) : options
    const labels = Object.keys(list).map(i => list[i])
    const values = Object.keys(list)
    return(
      <View onLayout={(evt)=>{this.getNewDimensions(evt)}}>
        <Text style={styles.pickerTitle}>Multi Selection Picker</Text>
        {this.props.search && 
        <View style={{ flexDirection: 'row', height: 50 }}>
          <TextInput
            style={{
              width: this.state.pageWidth * 0.9,
              marginVertical: '3%',
              marginHorizontal: '3%',
              padding: '5%',
              borderColor: this.props.iconColor,
              borderWidth: 1,
              borderRadius: 10,
              alignItems: 'center',
                       
            }}
            onChangeText={(text) => { this._onSearch(text) }}
            clearButtonMode={'always'}
            placeholder={this.props.placeholder}
            placeholderTextColor={this.props.placeholderTextColor}
            underlineColorAndroid={'transparent'}
          />  
        </View>}
        <ScrollView>
          {labels.map((label, index) => {
            const itemKey = returnValue == "label" ? label : values[index]
            return(
              <TouchableOpacity
                key={label}
                style={[{
                  padding: 5,
                  marginTop: 0,
                  marginLeft: 2,
                  marginRight: 2,
                  marginBottom: 6,
                  backgroundColor: this.props.rowBackgroundColor,
                  height: this.props.rowHeight,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 10
                },
                  this.props.itemStyle
                ]}
                onPress={() => {
                  this._onSelect(itemKey,values[index])
                }}
              >
                {React.isValidElement(label)
                  ?
                  label
                  :
                  <Text style={this.props.labelStyle}>{label}</Text>
                }
                {

                  this._isSelected(itemKey) ?
                  <Icon name={this.props.selectedIconName}
                        style={[{
                          color: this.props.iconColor, 
                          fontSize: this.props.iconSize}, 
                          this.props.selectedIconStyle]}
                        />
                  :
                  <Icon name={this.props.unselectedIconName}
                        style={[{
                          color: this.props.iconColor, 
                            fontSize: this.props.iconSize}, 
                          this.props.unselectedIconStyle]}
                  />
                }
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}