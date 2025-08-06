import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Save } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ProfileData {
  weight: string;
  height: string;
  birthday: string;
  useMetric: boolean;
}

export default function ProfileFormScreen() {
  const { colors } = useTheme();
  const [profileData, setProfileData] = useState<ProfileData>({
    weight: '65',
    height: '175',
    birthday: '1990-01-15',
    useMetric: true,
  });

  const handleGoBack = () => {
    router.back();
  };

  const handleSave = () => {
    // Validate inputs
    if (!profileData.weight || !profileData.height || !profileData.birthday) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Here you would typically save to your backend or local storage
    Alert.alert('Success', 'Profile updated successfully', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  };

  const updateField = (field: keyof ProfileData, value: string | boolean) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getWeightLabel = () =>
    profileData.useMetric ? 'Weight (kg)' : 'Weight (lbs)';
  const getHeightLabel = () =>
    profileData.useMetric ? 'Height (cm)' : 'Height (ft)';

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Edit Profile
        </Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Save size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Unit System Toggle */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Unit System
          </Text>
          <View style={styles.unitToggleContainer}>
            <View style={styles.unitToggle}>
              <Text style={[styles.unitLabel, { color: colors.text }]}>
                Metric
              </Text>
              <Switch
                value={profileData.useMetric}
                onValueChange={(value) => updateField('useMetric', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={profileData.useMetric ? '#FFFFFF' : '#FFFFFF'}
              />
              <Text style={[styles.unitLabel, { color: colors.text }]}>
                Imperial
              </Text>
            </View>
            <Text
              style={[styles.unitDescription, { color: colors.textSecondary }]}
            >
              {profileData.useMetric
                ? 'Using metric units (kg, cm)'
                : 'Using imperial units (lbs, ft)'}
            </Text>
          </View>
        </View>

        {/* Weight Input */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Weight
          </Text>
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
          >
            <TextInput
              style={[styles.textInput, { color: colors.text }]}
              value={profileData.weight}
              onChangeText={(text) => updateField('weight', text)}
              placeholder={
                profileData.useMetric
                  ? 'Enter weight in kg'
                  : 'Enter weight in lbs'
              }
              keyboardType="numeric"
              maxLength={6}
            />
            <Text style={[styles.inputUnit, { color: colors.textSecondary }]}>
              {profileData.useMetric ? 'kg' : 'lbs'}
            </Text>
          </View>
        </View>

        {/* Height Input */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Height
          </Text>
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
          >
            <TextInput
              style={[styles.textInput, { color: colors.text }]}
              value={profileData.height}
              onChangeText={(text) => updateField('height', text)}
              placeholder={
                profileData.useMetric
                  ? 'Enter height in cm'
                  : 'Enter height in ft'
              }
              keyboardType="numeric"
              maxLength={6}
            />
            <Text style={[styles.inputUnit, { color: colors.textSecondary }]}>
              {profileData.useMetric ? 'cm' : 'ft'}
            </Text>
          </View>
        </View>

        {/* Birthday Input */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Birthday
          </Text>
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
          >
            <TextInput
              style={[styles.textInput, { color: colors.text }]}
              value={profileData.birthday}
              onChangeText={(text) => updateField('birthday', text)}
              placeholder="YYYY-MM-DD"
              maxLength={10}
            />
          </View>
          <Text style={[styles.inputHint, { color: colors.textSecondary }]}>
            Enter your birthday in YYYY-MM-DD format
          </Text>
        </View>

        {/* Current Values Display */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Current Values
          </Text>
          <View style={styles.currentValuesContainer}>
            <View style={styles.currentValueItem}>
              <Text
                style={[
                  styles.currentValueLabel,
                  { color: colors.textSecondary },
                ]}
              >
                Weight:
              </Text>
              <Text style={[styles.currentValueText, { color: colors.text }]}>
                {profileData.weight} {profileData.useMetric ? 'kg' : 'lbs'}
              </Text>
            </View>
            <View style={styles.currentValueItem}>
              <Text
                style={[
                  styles.currentValueLabel,
                  { color: colors.textSecondary },
                ]}
              >
                Height:
              </Text>
              <Text style={[styles.currentValueText, { color: colors.text }]}>
                {profileData.height} {profileData.useMetric ? 'cm' : 'ft'}
              </Text>
            </View>
            <View style={styles.currentValueItem}>
              <Text
                style={[
                  styles.currentValueLabel,
                  { color: colors.textSecondary },
                ]}
              >
                Birthday:
              </Text>
              <Text style={[styles.currentValueText, { color: colors.text }]}>
                {profileData.birthday}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Save Button */}
      <View
        style={[
          styles.bottomSection,
          { backgroundColor: colors.surface, borderTopColor: colors.border },
        ]}
      >
        <TouchableOpacity
          style={[styles.saveButtonLarge, { backgroundColor: colors.primary }]}
          onPress={handleSave}
        >
          <Save size={24} color={colors.surface} />
          <Text style={[styles.saveButtonText, { color: colors.surface }]}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  saveButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  unitToggleContainer: {
    alignItems: 'center',
  },
  unitToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
  },
  unitLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  unitDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  inputUnit: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  inputHint: {
    fontSize: 14,
    marginTop: 8,
  },
  currentValuesContainer: {
    gap: 12,
  },
  currentValueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  currentValueLabel: {
    fontSize: 16,
  },
  currentValueText: {
    fontSize: 16,
    fontWeight: '500',
  },
  bottomSection: {
    padding: 24,
  },
  saveButtonLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
