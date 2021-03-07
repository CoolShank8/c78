import * as React from 'react'
import {StyleSheet, ScrollView, Text, View, TextInput, TouchableOpacity, Modal, _ScrollView, KeyboardAvoidingView, Alert} from 'react-native'
import firebase from 'firebase'
import Database from '../FireBaseConfig'
import SantaImage from '../Components/Santa'
import DonateScreen from './DonateScreen'


export default class WelcomeScreen extends React.Component {
   constructor()
   {
       super()
       this.state = {

           InputEmail: '',
           InputPassword: '',
           InputConfirmPassword: '',

           Address: '',
           UserName: '',
           PhoneNumber: '',
           FirstName: '',
           LastName: '',


           ModalVisibility: false
       }
   }

   ReturnModal = () =>{

        return (
            <Modal 
                animationType =  'fade' 
                transparent =  {true} 
                visible =  {this.state.ModalVisibility} >

                <View style = {Style.modalContainer}>
                    <ScrollView style = {{width: 100}}>
                        <KeyboardAvoidingView style = {Style.KeyboardAvoidingView}>
                            <Text style = {Style.modalTitle}>Details form</Text>
                            <TextInput
                                style = {Style.formTextInput} 
                                placeholder = 'type you first name'
                                maxLength =  {20}
                                onChangeText = {(CurrentText) =>{
                                    this.setState({FirstName: CurrentText})
                                }}
                            />

                            <TextInput 
                                style = {Style.formTextInput} 
                                placeholder = 'type you Last name'
                                maxLength =  {20}
                                onChangeText = {(CurrentText) =>{
                                    this.setState({LastName: CurrentText})
                                }}
                            />

                            <TextInput 
                                style = {Style.formTextInput} 
                                placeholder = 'type a username MAX: 15'
                                maxLength =  {15}
                                onChangeText = {(CurrentText) =>{
                                    this.setState({UserName: CurrentText})
                                }}
                            />
                            
                            <TextInput 
                                style = {Style.formTextInput} 
                                placeholder = 'type you phone number'
                                maxLength =  {10}
                                onChangeText = {(CurrentText) =>{
                                    this.setState({PhoneNumber: CurrentText})
                                }}
                                keyboardType =  {'numeric'}
                            />

                            <TextInput 
                                style = {Style.formTextInput} 
                                placeholder = 'type your adress'
                                multiline =  {true}
                                onChangeText = {(CurrentText) =>{
                                    this.setState({Address: CurrentText})
                                }}
                            />

                            <TextInput 
                                style = {Style.formTextInput} 
                                placeholder = 'type your email'
                                keyboardType = {'email-address'}
                                onChangeText = {(CurrentText) =>{
                                    this.setState({InputEmail: CurrentText})
                                }}
                            />

                            <TextInput 
                                style = {Style.formTextInput} 
                                placeholder = 'enter a password'
                                secureTextEntry = {true}
                                onChangeText = {(CurrentText) =>{
                                    this.setState({InputPassword: CurrentText})
                                }}
                            />        

                             <TextInput 
                                style = {Style.formTextInput} 
                                placeholder = 'confirm ur password here'
                                secureTextEntry = {true}
                                onChangeText = {(CurrentText) =>{
                                    this.setState({InputConfirmPassword: CurrentText})
                                }}
                            />          

                            <View style = {{width: 100, paddingBottom: 20}}>
                                <TouchableOpacity
                                    style = {Style.registerButton}
                                    onPress = {() =>{
                                        this.SignUp()
                                    }}
                                > 
                                <Text style = {Style.registerButtonText}>Register an account</Text>
                                </TouchableOpacity>
                            </View>

                             <View>
                                <TouchableOpacity
                                    style = {Style.cancelButton}
                                    onPress = {() =>{
                                        this.setState({ModalVisibility: false})
                                    }}
                                > 
                                <Text>Cancel</Text>
                                </TouchableOpacity>
                            </View>

                        </KeyboardAvoidingView>

                    </ScrollView>
                </View>

            </Modal>
        )
   }

   Login = async() => {
    var Email = this.state.InputEmail
    var Password = this.state.InputPassword 

    firebase.auth().signInWithEmailAndPassword(Email, Password)
        .then((Response) => {
            this.props.navigation.navigate('DonateScreen')
        })
        .catch((error) => {
            var errorMessage = error.message;
            return alert(errorMessage)
        });
   }

   SignUp  = async() =>{
        var Email = this.state.InputEmail
        var Password = this.state.InputPassword
        var ConfirmPassword = this.state.ConfirmPassword

        if (ConfirmPassword !== Password)
        {
            return (
                Alert.alert("your confirm password didn't match")
            )
        }

        else {     
            firebase.auth().createUserWithEmailAndPassword(Email, Password)
            .then((Response) => {
                Database.collections("Users").add(
                    {
                        Email: Email, 
                        FirstName: this.state.FirstName, 
                        LastName: this.state.LastName,
                        PhoneNumber: this.state.PhoneNumber,
                        Address: this.state.Address
                    }
                )


                return (
                    Alert.alert(
                        'User made an account',
                         ' ', 
                         [
                            {text: 'Ok', onPress: () =>{
                                this.setState({ModalVisibility: false})
                            }}
                         ]
                    )
                ) 
            })
            .catch((error) => {
                var errorMessage = error.message;
                return alert(errorMessage)
            });
        }
   }

   render()
   {
       return(
            <View style = {Style.container}>
                
                <View>
                    {this.ReturnModal()}
                </View>

                <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                  <SantaImage/>
                  <Text style = {Style.title}>Book Santa App</Text>  
                </View>

                <View>
                    <TextInput style = {Style.loginBox} keyboardType = 'email-address' placeholder = 'Enter ur email' onChangeText = {(InputText) =>{
                        this.setState({InputEmail: InputText})
                    }}>    
                    </TextInput>

                    <TextInput style = {Style.loginBox} secureTextEntry = {true} placeholder = 'enter the password' onChangeText = {(InputText) =>{
                        this.setState({InputPassword: InputText})
                    }}>
                    </TextInput>

                    <TouchableOpacity style = {Style.SignInOrLoginButton} onPress = {() => {
                        this.Login();
                    }}>
                    <Text>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {Style.SignInOrLoginButton} onPress = {() => {
                        this.SignUp();
                    }}>
                    <Text>SignUp</Text>
                    </TouchableOpacity>
                </View>

            </View>


           
       )
   }
}


const Style = StyleSheet.create({
    SignInOrLoginButton: {
        width:300, height:50, justifyContent:'center', alignItems:'center', borderRadius:25, backgroundColor:"#ff9800", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.30, shadowRadius: 10.32, elevation: 16
    },
    container:{
        flex:1,
        backgroundColor:'#F8BE85',
        alignItems: 'center',
        justifyContent: 'center'
      },
      profileContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
      },
      title :{
        fontSize:65,
        fontWeight:'300',
        paddingBottom:30,
        color : '#ff3d00'
      },
      loginBox:{
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor : '#ff8a65',
        fontSize: 20,
        margin:10,
        paddingLeft:10
      },
      KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#ff5722',
        margin:50
      },
      modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffff",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
      },
      registerButtonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold'
      },
      cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
      },
     
      button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#ff9800",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10
      },
      buttonText:{
        color:'#ffff',
        fontWeight:'200',
        fontSize:20
      }
})