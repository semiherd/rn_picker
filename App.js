import React, { useState} from 'react'
import { View } from 'react-native';

import Picker from './src/Picker'
import styles from './src/style/style';
import data from './src/data/data';

const App = () => {
   const [defaultSelected,setDefaultSelected]=useState(null)
   return (   
        <View style={styles.container}>
            <Picker
                    options={data}
                    search={true} 
                    multiple={true} 
                    placeholder={"Search"}
                    placeholderTextColor={'#757575'}
                    returnValue={"label"} 
                    rowBackgroundColor={"#eee"}
                    rowHeight={40}
                    rowRadius={5}
                    searchIconName="ios-checkmark"
                    searchIconColor="red"
                    searchIconSize={30}
                    iconColor={"#00a2dd"}
                    iconSize={30}
                    selectedIconName={"ios-checkbox-outline"}
                    unselectedIconName={"square-outline"}
                    defaultSelected={defaultSelected}
                    callback={(i)=>{ console.log(i) }}
                />       
        </View>
    );
  };

  export default App;