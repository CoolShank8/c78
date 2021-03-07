import *as React from 'react'
import LottieView from 'lottie-react-native'

export default class SantaImage extends React.Component {
    render()
    {
        return(
            <LottieView
                style= {{
                    width: '10%',
                    height: '50%'
                }}

                source = {require('../assets/SantaThumbnail.json')}
                loop
                autoPlay
            >

            </LottieView>
        )
    }
}


