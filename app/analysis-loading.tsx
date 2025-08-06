import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { analyzeImageWithLogMealFromUri } from '@/services/logMeal';

const analysisSteps = [
  'Analyzing image quality...',
  'Identifying food items...',
  'Calculating nutritional values...',
  'Generating health insights...',
  'Finalizing results...',
];

export default function AnalysisLoadingScreen() {
  const { colors } = useTheme();
  //   const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const { imageUri } = useLocalSearchParams();

  useEffect(() => {
    // Step progression every 900ms
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 900);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(progressInterval);
        return prev;
      });
    }, 45);

    // After animation (~4.5s), run analysis
    const analyze = async () => {
      if (!imageUri || typeof imageUri !== 'string') {
        Alert.alert('Missing Image', 'No valid image found to analyze.');
        router.back();
        return null;
      }
      const result = await analyzeImageWithLogMealFromUri(imageUri);
      if (!result) return;

      router.replace({
        pathname: '/food-details',
        params: {
          imageUri,
          foodName: result.foodName,
          calories: result.calories.toString(),
          carbs: result.carbs.toString(),
          protein: result.protein.toString(),
          fat: result.fat.toString(),
        },
      });
    };

    analyze();

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  //   useEffect(() => {
  //     // Simulate AI analysis with step progression
  //     const stepInterval = setInterval(() => {
  //       setCurrentStep((prev) => {
  //         if (prev < analysisSteps.length - 1) {
  //           return prev + 1;
  //         }
  //         return prev;
  //       });
  //     }, 800);

  //     // Smooth progress animation
  //     const progressInterval = setInterval(() => {
  //       setProgress((prev) => {
  //         if (prev < 100) {
  //           return prev + 2;
  //         }
  //         return prev;
  //       });
  //     }, 60);

  //     // Navigate to results after analysis is complete
  //     const navigationTimer = setTimeout(() => {
  //       router.replace({
  //         pathname: '/food-details',
  //         params: { imageUri },
  //       });
  //     }, 4500);

  //     return () => {
  //       clearInterval(stepInterval);
  //       clearInterval(progressInterval);
  //       clearTimeout(navigationTimer);
  //     };
  //   }, [imageUri]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        {/* Food Image */}
        <View
          style={[styles.imageContainer, { backgroundColor: colors.surface }]}
        >
          {typeof imageUri === 'string' && (
            <Image source={{ uri: imageUri }} style={styles.foodImage} />
          )}
          <View style={styles.imageOverlay}>
            <View
              style={[styles.scanningLine, { backgroundColor: colors.primary }]}
            />
          </View>
        </View>

        {/* AI Analysis Title */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            AI Analysis
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Our AI is analyzing your food
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View
            style={[styles.progressBar, { backgroundColor: colors.border }]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: colors.primary,
                  width: `${progress}%`,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: colors.textSecondary }]}>
            {Math.min(progress, 100)}%
          </Text>
        </View>

        {/* Current Analysis Step */}
        <View style={styles.stepContainer}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={[styles.stepText, { color: colors.text }]}>
            {analysisSteps[currentStep]}
          </Text>
        </View>

        {/* Analysis Steps List */}
        <View style={styles.stepsContainer}>
          {analysisSteps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <View
                style={[
                  styles.stepIndicator,
                  {
                    backgroundColor:
                      index <= currentStep ? colors.primary : colors.border,
                  },
                ]}
              />
              <Text
                style={[
                  styles.stepLabel,
                  {
                    color:
                      index <= currentStep ? colors.text : colors.textSecondary,
                  },
                ]}
              >
                {step}
              </Text>
            </View>
          ))}
        </View>

        {/* Fun Fact */}
        <View
          style={[styles.factContainer, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.factTitle, { color: colors.text }]}>
            Did you know?
          </Text>
          <Text style={[styles.factText, { color: colors.textSecondary }]}>
            Our AI can identify over 10,000 different food items and calculate
            nutritional values with 95% accuracy!
          </Text>
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 32,
    position: 'relative',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningLine: {
    width: '80%',
    height: 2,
    opacity: 0.8,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  stepText: {
    fontSize: 16,
    fontWeight: '500',
  },
  stepsContainer: {
    width: '100%',
    marginBottom: 32,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  stepIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stepLabel: {
    fontSize: 14,
    flex: 1,
  },
  factContainer: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  factTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  factText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
