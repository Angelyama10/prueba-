import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MoreOptionsModal from './../screens/MoreOptionsModal';

const NavigationBarComponent = ({ navItems, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleMorePress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.navigationContainer}>
        {navItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navButton}
            onPress={item.text === 'Más' ? handleMorePress : item.onPress}
          >
            {item.iconName && <Icon name={item.iconName} size={28} color="#5A9BD3" />}
            <Text style={styles.navText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <MoreOptionsModal
        visible={modalVisible}
        onClose={handleCloseModal}
        navigation={navigation}
      />
    </>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    color: '#5A9BD3',
  },
});

export default NavigationBarComponent;
