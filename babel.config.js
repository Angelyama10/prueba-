module.exports = {
  presets: ['module:metro-react-native-babel-preset'], // Preset principal para React Native
  plugins: [
    [
      'module:react-native-dotenv', // Plugin para manejar variables de entorno
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    'nativewind/babel', // Plugin para Tailwind CSS en React Native
  ],
};
