import {StyleSheet,Dimensions} from 'react-native';

export default styles= StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'ghostwhite',
        width: '100%',
        height: '80%',
        borderRadius: 20,
        padding: '1%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5
        },
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        top:'10%',
       
    },
    pickerTitle:{
        padding: 10,
        marginBottom: 0,
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf:'center',
        color: 'teal',
        fontWeight:'bold',
    }
  });


  
