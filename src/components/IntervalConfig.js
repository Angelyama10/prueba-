import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const IntervalConfig = ({ title, subtitle }) => {
  const [isIntervalActive, setIsIntervalActive] = useState(false);
  const [selectedHours, setSelectedHours] = useState('4'); // Valor predeterminado para horas
  const [intervalType, setIntervalType] = useState('Horas'); // Horas o Días

  return (
    <View>
      {/* Opción Intervalo */}
      <View style={styles.optionContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.optionTitle}>{title}</Text>
          <Text style={styles.optionSubtitle}>{subtitle}</Text>
        </View>
        <Switch
          value={isIntervalActive}
          onValueChange={setIsIntervalActive}
          style={styles.switch}
        />
      </View>

      {isIntervalActive && (
        <View style={styles.intervalConfig}>
          <View style={styles.intervalRow}>
            <TouchableOpacity
              style={[
                styles.intervalButton,
                intervalType === 'Horas' && styles.activeIntervalButton,
              ]}
              onPress={() => setIntervalType('Horas')}
            >
              <Text style={styles.intervalButtonText}>Cada X horas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.intervalButton,
                intervalType === 'Días' && styles.activeIntervalButton,
              ]}
              onPress={() => setIntervalType('Días')}
            >
              <Text style={styles.intervalButtonText}>Cada X días</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.intervalRow}>
            <Text style={styles.intervalLabel}>Recordar cada</Text>
            <TextInput
              style={styles.intervalInput}
              keyboardType="numeric"
              value={selectedHours}
              onChangeText={setSelectedHours}
            />
            <Text style={styles.intervalLabel}>
              {intervalType === 'Horas' ? 'horas' : 'días'}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    paddingVertical: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: width * 0.045,
    color: '#333',
    fontWeight: 'bold',
  },
  optionSubtitle: {
    fontSize: width * 0.038,
    color: '#666',
    marginTop: height * 0.005,
  },
  switch: {
    marginRight: width * 0.02,
  },
  intervalConfig: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
    backgroundColor: '#F0F8FF',
    borderRadius: width * 0.03,
    marginBottom: height * 0.02,
  },
  intervalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.015,
  },
  intervalButton: {
    flex: 1,
    paddingVertical: height * 0.015,
    backgroundColor: '#E0E0E0',
    borderRadius: width * 0.02,
    alignItems: 'center',
    marginRight: width * 0.025,
  },
  activeIntervalButton: {
    backgroundColor: '#3DA2FF',
  },
  intervalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  intervalLabel: {
    fontSize: width * 0.04,
    color: '#333',
  },
  intervalInput: {
    width: width * 0.15,
    height: height * 0.05,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: width * 0.02,
    textAlign: 'center',
    fontSize: width * 0.04,
    marginHorizontal: width * 0.03,
  },
});

export default IntervalConfig;
