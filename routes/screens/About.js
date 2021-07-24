import * as React from 'react';
import { Card, Button } from 'react-native-paper';

const MyComponent = ( { navigation } ) =>{
 
const handlePress = () => {
 navigation.goBack();
}

 return ( <Card>
   <Card.Actions>
     <Button>Cancel</Button>
     <Button onPress={handlePress }>Navigate somewhere</Button>
   </Card.Actions>
 </Card>
)} ;

export default MyComponent;