import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // Para la navegación
import FrascoImage from '../../assets/images/frasco.png';  // Asegúrate de que la ruta sea correcta
import medicamentos from '../../assets/mockData/medicamentos.json'; // Importación del archivo JSON

const { width } = Dimensions.get('window');

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMedicamentos, setFilteredMedicamentos] = useState([]);
  const navigation = useNavigation(); // Hook de navegación

  useEffect(() => {
    if (searchQuery.length >= 3) {
      // Filtra los medicamentos cuando la consulta tiene 3 o más caracteres
      const filteredData = medicamentos.filter((medicamento) =>
        medicamento.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMedicamentos(filteredData);
    } else {
      setFilteredMedicamentos([]);
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Navega a la pantalla de Medicamentos si se selecciona uno
  const handleNavigateToMedication = (medicamento) => {
    navigation.navigate('MedicationScreen', { medicamentoNombre: medicamento.nombre });
  };
  

  const handleNavigateToPresentation = () => {
    navigation.navigate('PresentationScreen', { medicamentoNombre: searchQuery });
  };

  const renderMedicamento = ({ item }) => (
    <TouchableOpacity onPress={() => handleNavigateToMedication(item)}>
      <View style={styles.medicamentoContainer}>
        <Text style={styles.medicamentoName}>{item.nombre}</Text>
        <Text style={styles.medicamentoDetails}>{`${item.presentacion}, ${item.contenido} mg`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Contenedor Azul */}
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Agrega tus medicamentos</Text>
        <Text style={styles.subHeaderText}>¿Qué medicamento quiere agregar?</Text>

        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar medicamento"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* Contenedor Blanco con bordes redondeados */}
      <View style={styles.bottomContainer}>
        {/* Ocultar imagen cuando se empieza a buscar */}
        {filteredMedicamentos.length === 0 && searchQuery.length < 3 ? (
          <View style={styles.imageContainer}>
            <Image source={FrascoImage} style={styles.image} />
            <Text style={styles.infoText}>
              Ingresa los detalles de tu medicamento para mantener un control adecuado y recibir recordatorios
            </Text>
          </View>
        ) : (
          <>
            {/* Mostrar resultados filtrados */}
            <FlatList
              data={filteredMedicamentos}
              keyExtractor={(item) => item.id.toString()}  // Usar el id como clave
              renderItem={renderMedicamento}
              contentContainerStyle={styles.resultsContainer}
              ListEmptyComponent={
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsText}>No se encontraron medicamentos.</Text>
                  {/* Texto interactivo si no hay resultados */}
                  <Text style={styles.noResultsInfoText}>
                    ¿No encuentra el medicamento?
                    <TouchableOpacity onPress={handleNavigateToPresentation}>
                      <Text style={styles.createCustomNameText}> Pulse aquí para crear un nombre personalizado</Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              }
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  topContainer: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: '5%',
    backgroundColor: '#B5D6FD', // Color azul claro
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',  // Texto blanco
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#FFFFFF',  // Texto blanco
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 30,
    elevation: 5,  // Agrega una sombra para darle un efecto flotante
    width: '90%',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 16,
    marginLeft: 10,
    color: '#000',  // Texto negro
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',  // Fondo blanco
    paddingVertical: '10%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,  // Ajuste para que se superponga ligeramente al contenedor azul
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  resultsContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  medicamentoContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  medicamentoName: {
    fontSize: 18,
    color: '#333',
  },
  medicamentoDetails: {
    fontSize: 14,
    color: '#666',
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  noResultsInfoText: {
    fontSize: 16,
    color: '#000',  // Texto negro
    textAlign: 'center',
  },
  createCustomNameText: {
    color: '#1E90FF',  // Texto azul para el enlace
    fontWeight: 'bold',
  },
});

export default SearchScreen;
