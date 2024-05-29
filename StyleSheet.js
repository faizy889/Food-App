import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#eaeaea',
   },
   UnderDevContainer: {
      // flex-1 items-center justify-center
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   },
   UnderDevText: {
      // text-26px font-semibold
      fontSize: 26,
      fontWeight: 600
   },
   title: {
      marginTop: 16,
      paddingVertical: 8,
      borderWidth: 4,
      borderColor: '#20232a',
      borderRadius: 6,
      backgroundColor: '#61dafb',
      color: '#20232a',
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
   },
});


export default styles;