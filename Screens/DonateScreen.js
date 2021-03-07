import {firebase} from firebase
import * as React from 'react'
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native'
import database from '../FireBaseConfig'
import BookRequestScreenHeader from '../Components/RequestBookScreenHeader'

export default class DonateScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            AllBookRequests: [],
        }

        this.BookRequestCollectionReference = null
    }


    componentDidMount = () =>{
        this.GetAllBookRequests()
    }

    componentWillUnmount = () =>{
        this.BookRequestCollectionReference()
    }

    GetAllBookRequests = async() =>{
        this.BookRequestCollectionReference = database.collection('BookRequests').onSnapshot(
            (Data) =>{
                var RequestedBookList = Data.docs.map((Document) =>{
                    Document.data()
                })

                this.setState({AllBookRequests: RequestedBookList})
            }

        )


    }

    render()
    {
        return(
            <View>
                <BookRequestScreenHeader title = "Donate Books"/>
                <View>
                    {this.state.AllBookRequests.length === 0? (
                        <View stlye = {styles.subContainer}> 
                            <Text>All Boooks Requested</Text>
                        </View>
                    ): (
                    <FlatList 
                        renderItem = {(Item, KeyName) =>{
                            return (<ListItem key = {KeyName} title = {Item.BookName} subtitle = {Item.BookRequestReason} titleStyle = {{
                                color: 'black',
                                fontWeight: 'bold'
                            }}
                            rightElement = {
                            <TouchableOpacity style = {styles.button}>
                                <Text>Expand</Text>
                            </TouchableOpacity>}
                            
                            bottomDivider
                
                            />)
                        }}

                        data = {this.state.AllBookRequests}

                        keyExtractor =  {(Item,Index) =>{
                            Index.toString()
                        }} 
                        
                        />
                    )}
                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({ 
    subContainer:{ flex:1, fontSize: 20, justifyContent:'center', alignItems:'center' }, button:{ width:100, height:30, justifyContent:'center', alignItems:'center', backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8 } } })