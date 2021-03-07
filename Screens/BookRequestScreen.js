import { firebase } from 'firebase'
import * as React from 'react'
import {Alert, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import RequestBookScreenHeader from '../Components/RequestBookScreenHeader'
import database from '../FireBaseConfig'

export default class BookRequestScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            UserID: firebase.auth().currentUser.email,
            BookName: '',
            BookRequestReason: ''
        }
    }

    CreateUniqueID = () =>{
        return Math.random().toString(36).substring(7)
    }

    AddRequest = (BookName, BookRequestReason) =>{
        var UserID = this.state.UserID
        var RandomRequestID = this.CreateUniqueID()

        database.collection("BookRequests").add({
            UserID: UserID,
            RequestID: RandomRequestID,
            BookName: this.state.BookName,
            BookRequestReason: this.state.BookRequestReason
        })

        this.setState({BookName: "", BookRequestReason: ''})
        return Alert.alert('Book request was sucessfull')
    }

    render()
    {
        return(        
            <View>
                <RequestBookScreenHeader title = 'RequestBook'/>
                <KeyboardAvoidingView style = {styles.keyBoardStyle}>
                    <TextInput
        
                    onChangeText = {(text)=> {
                        this.setState({BookName: text})
                    }}
                    style = {styles.formTextInput} placeholder = 'What book do you want to request?'>
                    value = {this.state.BookName}
                    </TextInput>

                    <TextInput
                    
                        onChangeText = {(text)=> {
                            this.setState({BookRequestReason: text})
                        }}
                        style = {styles.formTextInput} placeholder = 'Why do you want to request this book?'>
                        value = {this.state.BookRequestReason}
                        multiline
                        numberOfLines = {5}
                    </TextInput>

                    <TouchableOpacity 
                        onPress= {()=>{
                            this.AddRequest();
                        }}
                        style = {styles.button}> 
                        <Text>Submit</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>

            </View>
        )
    }
}


const styles = StyleSheet.create({ keyBoardStyle : { flex:1, alignItems:'center', justifyContent:'center' }, formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10, }, button:{ width:"75%", height:50, justifyContent:'center', alignItems:'center', borderRadius:10, backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop:20 }, } )