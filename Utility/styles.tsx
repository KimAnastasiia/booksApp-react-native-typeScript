/* eslint-disable prettier/prettier */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: "left",
    margin: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  container: {
    borderBottomWidth: 2,
    margin: 8,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    borderColor: "#EAEAEA",
    width:"100%",
    alignItems:"center"
  },
  author: {
    fontSize: 20,
    color: "gray"
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginRight: 20
  },
  binLogo: {
    width: 20,
    height: 20,
  },
  deleteBookButton: {
    backgroundColor: '#EAEAEA',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: 'center',
  },
  textInput: {
    padding: 8,
    fontSize: 20,
    borderBottomWidth: 1,
    borderRadius: 15,
    borderColor: "#EAEAEA",
    width: "100%",
    marginBottom:20
  },
  containerCreateBook: {
    alignContent: "center",
    height: 725,
    backgroundColor: "white",
    justifyContent:"space-between",
    alignItems: "center"
  },
  createButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: '#F08841',
    width: '100%',
    marginTop: 26,
    height:70
  },
  textInButton: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  containerCreateButton:{
    width:"100%",
    alignItems:"center",
    justifyContent:"flex-end"
  },
  label:{
    fontSize:20,
    marginBottom:10,
    color:"#F06A41",
    fontWeight: 'bold',
  },
  containerInputs:{
    width:"100%", 
    height:600,
    justifyContent:"flex-start"
  }
});

export default styles;
