import * as React from 'react';
import { Card, Button } from 'react-native-paper';

const MyComponent = ( { navigation } ) =>{
 
const handlePress = () =>{
 navigation.navigate('Review');
}

 return ( <Card>
   <Card.Actions>
     <Button>Cancel</Button>
     <Button onPress={handlePress }>Go To Review</Button>
   </Card.Actions>
 </Card>
)} 

;

export default MyComponent;