import React from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');

const annotationTypes = [
    { label: 'Alergia', color: '#00ff00' },
    { label: 'Emergencia', color: '#ff0000' },
    { label: 'Humor', color: '#708090' },
    { label: 'General', color: '#008080' },
    { label: 'Efectos secundarios', color: '#4682B4' },
];

const AnnotationTypeModal = ({ modalVisible, setModalVisible, selectType }) => {
    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Tipo</Text>
                    </View>
                    {annotationTypes.map((item) => (
                        <TouchableOpacity
                            key={item.label}
                            style={styles.modalOption}
                            onPress={() => selectType(item)}
                        >
                            <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                            <Text style={styles.modalText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: width * 0.8,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    colorDot: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        marginRight: 15,
    },
    modalText: {
        fontSize: 16,
    },
});

export default AnnotationTypeModal;
