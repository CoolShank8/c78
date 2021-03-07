import *as React from 'react'
import {Header, Text} from 'react-native'


const RequestBookScreenHeader = (Prop) =>{
    
     return(
        <Header 
             placement = 'center'
             centerComponent = {{text: Prop.title, style = {color: 'black'}}}
         >
         </Header>
     )
    
}

export default RequestBookScreenHeader