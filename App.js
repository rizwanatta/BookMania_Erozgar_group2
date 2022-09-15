import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { firebase } from './src/services/firebasHelper';


export default function App() {


 onButtonPressed = ()=>{
  firebase
  .firestore()
  .collection('users')
  .doc('374')
  .set({'name': 'saleem', 
  'kam': 'coder', 'present': false, 'rollNumber': 32});
 }


  return (
    <View style={styles.container}>
      <Text>ALl good with project on EXPO</Text>
      <StatusBar style="auto" />
      <Button 
      title={'test firebase'}
      onPress={onButtonPressed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
