import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Slider, TouchableOpacity, TextInput } from 'react-native';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [textSize, setTextSize] = useState(16);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedThemeColor, setSelectedThemeColor] = useState('#2196f3');
  const [username, setUsername] = useState('');

  const handleNotificationsSwitch = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleDarkModeSwitch = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  const handleTextSizeSlider = (value) => {
    setTextSize(value);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleThemeColorSelect = (color) => {
    setSelectedThemeColor(color);
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Notifications</Text>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleNotificationsSwitch}
        />
      </View>

      <Text style={styles.sectionTitle}>Appearance</Text>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={handleDarkModeSwitch}
        />
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Text Size</Text>
        <Slider
          value={textSize}
          minimumValue={12}
          maximumValue={24}
          onValueChange={handleTextSizeSlider}
          step={1}
          style={styles.slider}
        />
        <Text style={styles.sliderValue}>{textSize}</Text>
      </View>
      <Text style={styles.sectionTitle}>Language</Text>
      <View style={styles.languageRow}>
        <TouchableOpacity
          style={[
            styles.languageButton,
            selectedLanguage === 'en' && styles.selectedLanguageButton,
          ]}
          onPress={() => handleLanguageSelect('en')}
        >
          <Text style={styles.languageButtonText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.languageButton,
            selectedLanguage === 'ar' && styles.selectedLanguageButton,
          ]}
          onPress={() => handleLanguageSelect('ar')}
        >
          <Text style={styles.languageButtonText}>العربية</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.languageButton,
            selectedLanguage === 'fr' && styles.selectedLanguageButton,
          ]}
          onPress={() => handleLanguageSelect('fr')}
        >
          <Text style={styles.languageButtonText}>Français</Text>
        </TouchableOpacity>

      </View>
      <Text style={styles.sectionTitle}>Theme Color</Text>
      <View style={styles.themeColorRow}>
        <TouchableOpacity 
          style={[
            styles.themeColorButton,
            { backgroundColor: '#2196f3' },
            selectedThemeColor === '#2196f3' && styles.selectedThemeColorButton,
          ]}
          onPress={() => handleThemeColorSelect('#2196f3')}
        />
        <TouchableOpacity
          style={[
            styles.themeColorButton,
            { backgroundColor: '#f44336' },
            selectedThemeColor === '#f44336' && styles.selectedThemeColorButton,
          ]}
          onPress={() => handleThemeColorSelect('#f44336')}
        />
        <TouchableOpacity
          style={[
            styles.themeColorButton,
            { backgroundColor: '#ffeb3b' },
            selectedThemeColor === '#ffeb3b' && styles.selectedThemeColorButton,
          ]}
          
          onPress={() => handleThemeColorSelect('#ffeb3b')}
        />
        <TouchableOpacity
          style={[
            styles.themeColorButton,
            { backgroundColor: '#4caf50' },
            selectedThemeColor === '#4caf50' && styles.selectedThemeColorButton,
          ]}
          onPress={() => handleThemeColorSelect('#4caf50')}
        />
        <TouchableOpacity
          style={[
            styles.themeColorButton,
            { backgroundColor: '#673ab7' },
            selectedThemeColor === '#673ab7' && styles.selectedThemeColorButton,
          ]}
          onPress={() => handleThemeColorSelect('#673ab7')}
        />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },

  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  settingLabel: {
    fontSize: 16,
  },
  slider: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  sliderValue: {
    fontSize: 16,
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  languageButton: {
    padding: 10,
    backgroundColor: '#eee',

    borderRadius: 5,
  },
  selectedLanguageButton: {

    backgroundColor: '#2196f3',
  },
  languageButtonText: {
    fontSize: 16,
  },
  themeColorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  themeColorButton: {

    width: 40,
    height: 40,
    borderRadius: 20,
  },
  selectedThemeColorButton: {
    borderWidth: 2,
    borderColor: '#fff',
  },


});


