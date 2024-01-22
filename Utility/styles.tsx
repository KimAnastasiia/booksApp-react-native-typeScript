/* eslint-disable prettier/prettier */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imgLogin:{
    width: 300, 
    height: 100, 
    marginTop:70 
  },
  containerLogin: {
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
    backgroundColor: "#F0A741",
    width: "100%"
  },
  loginInput: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: "white",
    width: "80%",
    marginBottom: 30,
    paddingBottom: 10
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: '#004832',
    width: '90%',
    marginTop: 26,
    height: 50,
    borderRadius: 30
  },
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
    width: "100%",
    alignItems: "center"
  },
  author: {
    fontSize: 20,
    color: "gray"
  },
  tinyLogo: {
    width: 50,
    height: 70,
    marginRight: 20
  },
  binLogo: {
    width: 20,
    height: 20,
  },
  deleteBookButton: {
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
    marginBottom: 20
  },
  containerCreateBook: {
    alignContent: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    marginTop: 10
  },
  containerDetails: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F08841',
    width: '90%',
    marginTop: 26,
    height: 50,
    borderRadius: 30
  },
  createButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: '#F08841',
    width: '90%',
    marginTop: 26,
    height: 50,
    borderRadius: 30
  },
  editButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: '#E8BB61',
    width: '100%',
    marginTop: 26,
    height: 70
  },
  textInButton: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  containerCreateButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    color: "#F06A41",
    fontWeight: 'bold',
  },
  containerInputs: {
    width: "100%",
    justifyContent: "flex-start"
  },
  containerEdit: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 30
  },
  bookTitle: {
    fontSize: 22,
    color: 'balck',
    marginBottom: 3,
    fontWeight: "bold"
  },
  containerDescriptions: {
    width: "100%",
    height: 600,
    alignItems: "center"
  },
  photoBook: {
    width: 300,
    height: 350,
    marginTop: 20,
    borderColor: "black",
    borderWidth: 0.5
  },
  bookAuthor: {
    fontSize: 19
  },
  editPressable: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F08841',
    width: '20%',
    marginTop: 20,
    marginRight: 10,
    borderRadius: 40
  },
  textInButtonEdit: {
    color: "white",
    fontSize: 15
  },
  containerEditButton: {
    width: "100%",
    alignItems: "flex-end"
  }
});

export default styles;
