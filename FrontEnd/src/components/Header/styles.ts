import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 5,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
    img: {
      width: 20,
      height: 20,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-start',
    },
    modalView: {
      backgroundColor: 'white',
      width: '60%',
      marginTop: 50,
      marginLeft: 20,
      borderRadius: 10,
      paddingVertical: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    menuItem: {
      paddingVertical: 12,
      paddingHorizontal: 20,
    },
    menuText: {
      fontSize: 16,
    },
});

export default styles;