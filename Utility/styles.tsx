/* eslint-disable prettier/prettier */

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    heading: {
      fontSize:35,
      fontWeight:'bold',
      textAlign:"left",
      margin:20
    },
    title: {
      fontWeight:'bold',
      fontSize:25,
    },
    shellBook: {
       borderBottomWidth:2,
       margin:8,
       borderRadius:10,
       padding:10,
       flexDirection: 'row',
       borderColor:"#EAEAEA"
    },
    author:{
      fontSize:20,
      color:"gray"
    },
    tinyLogo: {
      width: 50,
      height: 50,
      marginRight:20
    },
});

export default styles;
