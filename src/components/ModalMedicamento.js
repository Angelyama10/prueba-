import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ModalMedicamento = ({ visible, onClose, nombre, hora, unidad, cantidad, momentoComida, icono }) => {
  const navigation = useNavigation(); // Hook para obtener el objeto de navegación

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                {/* Icono del medicamento */}
                <Icon name={icono} size={48} color="#5A9BD3" />
                <Text style={styles.medicamentoNombre}>{nombre}</Text>
              </View>

              {/* Botones de eliminar y editar */}
              <View style={styles.actionIcons}>
                <TouchableOpacity onPress={() => console.log("Eliminar")}>
                  <Icon name="trash-can-outline" size={24} color="#333333" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditMedicationScreen', { medicamentoNombre: nombre })}
                  style={{ marginLeft: 15 }}
                >
                  <Icon name="pencil-outline" size={24} color="#333333" />
                </TouchableOpacity>
              </View>

              <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                  <Icon name="calendar-clock" size={24} color="#5A9BD3" style={styles.infoIcon} />
                  <Text style={styles.infoText}>Agendado para {hora}, hoy</Text>
                </View>
                <View style={styles.infoItem}>
                  <Icon name="pill" size={24} color="#5A9BD3" style={styles.infoIcon} />
                  <Text style={styles.infoText}>
                    {`Tomar ${cantidad} ${unidad}${momentoComida ? ` (${momentoComida})` : ''}`}
                  </Text>
                </View>
              </View>

              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={() => console.log("Pasar")}>
                  <Icon name="close-circle-outline" size={32} color="#5A9BD3" />
                  <Text style={styles.actionText}>Pasar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => console.log("Tomar")}>
                  <Icon name="check-circle" size={32} color="#5A9BD3" />
                  <Text style={styles.actionText}>Tomar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => console.log("Reprogramar")}>
                  <Icon name="clock-outline" size={32} color="#5A9BD3" />
                  <Text style={styles.actionText}>Reprogramar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: '#ffffff', // Fondo claro
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  medicamentoNombre: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
  },
  actionIcons: {
    flexDirection: 'row',
    position: 'absolute',
    top: 15,
    right: 15,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333333',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#5A9BD3',
    marginTop: 5,
  },
});

export default ModalMedicamento;
