import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import axios from 'axios';

export default function SplashScreen() {
  const { colors } = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to main app after 10 seconds
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={[styles.logoCircle, { backgroundColor: colors.primary }]}>
            <Text style={styles.logoEmoji}>🍎</Text>
          </View>
          <Text style={[styles.appName, { color: colors.text }]}>Cal AI</Text>
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>
            Analyze your food instantly
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.bottomContent,
            { opacity: fadeAnim },
          ]}
        >
          <View style={styles.loadingContainer} >
            <View style={[styles.loadingDot, { backgroundColor: colors.primary }]} />
            <View style={[styles.loadingDot, { backgroundColor: colors.primary }]} />
            <View style={[styles.loadingDot, { backgroundColor: colors.primary }]} />
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: 60,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 12,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomContent: {
    alignItems: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.6,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
  },
});