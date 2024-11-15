import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const HomeAgenda = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="close" size={24} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Agenda</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AgendaScreen')}>
                    <Icon name="plus" size={24} color="#ffffff" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Icon name="notebook-outline" size={80} color="#5A9BD3" />
                <Text style={styles.title}>Anotar</Text>
                <Text style={styles.description}>
                    Documente sus síntomas, problemas de salud y cualquier información médica importante.
                </Text>
            </View>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AgendaScreen')}
            >
                <Text style={styles.addButtonText}>Añadir una nota</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        paddingVertical: height * 0.05,
        backgroundColor: '#5A9BD3',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    headerText: {
        fontSize: width * 0.05,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 20,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
    },
    addButton: {
        backgroundColor: '#5A9BD3',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 25,
        marginBottom: 30,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeAgenda;
