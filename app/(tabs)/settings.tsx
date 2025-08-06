import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  Bell,
  Shield,
  CircleHelp as HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
  Globe,
  Scale,
  Ruler,
  Calendar,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

interface SettingItem {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showChevron?: boolean;
}

export default function SettingsScreen() {
  const { colors, isDark, setTheme, theme } = useTheme();

  const handleProfilePress = () => {
    router.push('/profile-form');
  };

  const profileItems: SettingItem[] = [
    {
      icon: <Scale size={24} color={colors.text} />,
      title: 'Weight',
      subtitle: '65 kg',
      onPress: handleProfilePress,
      showChevron: true,
    },
    {
      icon: <Ruler size={24} color={colors.text} />,
      title: 'Height',
      subtitle: '175 cm',
      onPress: handleProfilePress,
      showChevron: true,
    },
    {
      icon: <Calendar size={24} color={colors.text} />,
      title: 'Birthday',
      subtitle: 'January 15, 1990',
      onPress: handleProfilePress,
      showChevron: true,
    },
  ];

  const handleThemePress = () => {
    const themes: Array<{ value: 'light' | 'dark' | 'system'; label: string }> =
      [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'system', label: 'System' },
      ];

    const currentIndex = themes.findIndex((t) => t.value === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].value);
  };

  const settingsItems: SettingItem[] = [
    {
      icon: <User size={24} color={colors.text} />,
      title: 'Profile',
      subtitle: 'Manage your account',
      onPress: () => {},
      showChevron: true,
    },
    {
      icon: <Bell size={24} color={colors.text} />,
      title: 'Notifications',
      subtitle: 'Push notifications, email alerts',
      onPress: () => {},
      showChevron: true,
    },
    {
      icon: <Moon size={24} color={colors.text} />,
      title: 'Appearance',
      subtitle: `${
        theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'
      } mode`,
      onPress: handleThemePress,
      showChevron: true,
    },
    {
      icon: <Globe size={24} color={colors.text} />,
      title: 'Language',
      subtitle: 'English',
      onPress: () => {},
      showChevron: true,
    },
    {
      icon: <Shield size={24} color={colors.text} />,
      title: 'Privacy & Security',
      subtitle: 'Data protection, permissions',
      onPress: () => {},
      showChevron: true,
    },
    {
      icon: <HelpCircle size={24} color={colors.text} />,
      title: 'Help & Support',
      subtitle: 'FAQ, contact us',
      onPress: () => {},
      showChevron: true,
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View
            style={[styles.profileCard, { backgroundColor: colors.surface }]}
          >
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={[styles.avatarText, { color: colors.surface }]}>
                JD
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>
                John Doe
              </Text>
              <Text
                style={[styles.profileEmail, { color: colors.textSecondary }]}
              >
                john.doe@example.com
              </Text>
            </View>
          </View>
        </View>

        {/* Profile Information Section */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Profile Information
          </Text>
          <View
            style={[
              styles.settingsSection,
              { backgroundColor: colors.surface },
            ]}
          >
            {profileItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.settingItem,
                  index === profileItems.length - 1 && styles.lastSettingItem,
                ]}
                onPress={item.onPress}
              >
                <View style={styles.settingIcon}>{item.icon}</View>
                <View style={styles.settingContent}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>
                    {item.title}
                  </Text>
                  {item.subtitle && (
                    <Text
                      style={[
                        styles.settingSubtitle,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {item.subtitle}
                    </Text>
                  )}
                </View>
                {item.showChevron && (
                  <ChevronRight size={20} color={colors.textSecondary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Settings Items */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            General
          </Text>
          <View
            style={[
              styles.settingsSection,
              { backgroundColor: colors.surface },
            ]}
          >
            {settingsItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.settingItem,
                  index === settingsItems.length - 1 && styles.lastSettingItem,
                ]}
                onPress={item.onPress}
              >
                <View style={styles.settingIcon}>{item.icon}</View>
                <View style={styles.settingContent}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>
                    {item.title}
                  </Text>
                  {item.subtitle && (
                    <Text
                      style={[
                        styles.settingSubtitle,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {item.subtitle}
                    </Text>
                  )}
                </View>
                {item.showChevron && (
                  <ChevronRight size={20} color={colors.textSecondary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Section */}
        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: colors.surface }]}
          >
            <LogOut size={24} color={colors.error} />
            <Text style={[styles.logoutText, { color: colors.error }]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionSection}>
          <Text style={[styles.versionText, { color: colors.textSecondary }]}>
            Cal AI v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  profileCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
  },
  sectionContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  settingsSection: {
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  lastSettingItem: {
    borderBottomWidth: 0,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  logoutButton: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: '600',
  },
  versionSection: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
  },
});
