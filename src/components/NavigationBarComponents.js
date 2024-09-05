import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MasIcon from '../../assets/images/mas.svg';
import MedicineIcon from '../../assets/images/medicine.svg'

const IconComponent = ({ name, size }) => {
  switch (name) {
    case 'home':
      return <Icon name="home-heart" size={size} color="#5A9BD3" />;  // Icono de vector importado
    case 'progreso':
      return <Icon name="chart-bar" size={size} color="#000" />;  // Usando 'chart-bar' de MaterialCommunityIcons
    case 'medicine':
      return <MedicineIcon width={size} height={size} />;
    case 'mas':
      return <MasIcon width={size} height={size} />;
    default:
      return null;
  }
};

const NavigationBarComponent = ({ navItems }) => {
  return (
    <View style={styles.navigationContainer}>
      {navItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.navButton} onPress={item.onPress}>
          {item.iconName && <IconComponent name={item.iconName} size={30} />}
          <Text style={styles.navText}>{item.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
     navigationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      backgroundColor: '#FFFFFF',
      paddingVertical: '3%',
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
    },
    navButton: {
      alignItems: 'center',
    },
    navText: {
      fontSize: 12,
      marginTop: 5,
    },
  });

  export default NavigationBarComponent;