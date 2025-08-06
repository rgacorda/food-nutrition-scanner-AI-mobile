import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  MoveHorizontal as MoreHorizontal,
  Minus,
  Plus,
  Flame,
  Wheat,
  Beef,
  Droplet,
  Heart,
  Wrench,
} from 'lucide-react-native';

interface NutritionData {
  calories: number;
  carbs: number;
  protein: number;
  fats: number;
  foodName: string;
  ingredients: Array<{ name: string; amount: string }>;
  nutriScore: number;
}

const mockNutritionData: NutritionData = {
  calories: 615,
  carbs: 93,
  protein: 11,
  fats: 21,
  foodName: 'Pancakes with blueberries & syrup',
  ingredients: [
    { name: 'Blueberries', amount: '8' },
    { name: 'Pancakes', amount: '595' },
    { name: 'Syrup', amount: '12' },
  ],
  nutriScore: 7,
};

export default function FoodDetailsScreen() {
  const { imageUri, foodName, calories, carbs, protein, fat, fromRecent } =
    useLocalSearchParams<{
      imageUri: string;
      foodName?: string;
      calories?: string;
      carbs?: string;
      protein?: string;
      fat?: string;
      fromRecent?: string;
    }>();
  const [quantity, setQuantity] = useState(1);

  // Use passed data if coming from recent items, otherwise use mock data
  // const nutritionData = fromRecent === 'true' && foodName && calories ? {
  //   ...mockNutritionData,
  //   foodName: foodName,
  //   calories: parseInt(calories) || mockNutritionData.calories,
  //   // Scale other nutrients proportionally based on calorie difference
  //   carbs: Math.round((parseInt(calories) || mockNutritionData.calories) * mockNutritionData.carbs / mockNutritionData.calories),
  //   protein: Math.round((parseInt(calories) || mockNutritionData.calories) * mockNutritionData.protein / mockNutritionData.calories),
  //   fats: Math.round((parseInt(calories) || mockNutritionData.calories) * mockNutritionData.fats / mockNutritionData.calories),
  // } : mockNutritionData;

  const nutritionData: NutritionData = {
    foodName: foodName || mockNutritionData.foodName,
    calories: calories ? parseInt(calories) : mockNutritionData.calories,
    carbs: carbs ? parseInt(carbs) : mockNutritionData.carbs,
    protein: protein ? parseInt(protein) : mockNutritionData.protein,
    fats: fat ? parseInt(fat) : mockNutritionData.fats,
    ingredients: mockNutritionData.ingredients, // no ingredient data from LogMeal yet
    nutriScore: mockNutritionData.nutriScore, // can enhance later
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const nutritionItems = [
    {
      icon: <Flame size={20} color="#000000" />,
      label: 'Calories',
      value: nutritionData.calories * quantity,
      unit: '',
    },
    {
      icon: <Wheat size={20} color="#F59E0B" />,
      label: 'Carbs',
      value: nutritionData.carbs * quantity,
      unit: 'g',
    },
    {
      icon: <Beef size={20} color="#EF4444" />,
      label: 'Protein',
      value: nutritionData.protein * quantity,
      unit: 'g',
    },
    {
      icon: <Droplet size={20} color="#3B82F6" />,
      label: 'Fats',
      value: nutritionData.fats * quantity,
      unit: 'g',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top 50% - Image Section */}
      <View style={styles.imageSection}>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.foodImage} />
        )}

        {/* Transparent Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Bottom 50% - Details Section */}
      <View style={styles.detailsSection}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Food Info */}
          <View style={styles.foodInfoContainer}>
            <Text style={styles.mealType}>Breakfast</Text>

            {/* Title and Quantity Row */}
            <View style={styles.titleQuantityRow}>
              <Text style={styles.foodName}>{nutritionData.foodName}</Text>
              <View style={styles.quantitySelector}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(-1)}
                >
                  <Minus size={16} color="#8E8E93" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(1)}
                >
                  <Plus size={16} color="#8E8E93" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Nutrition Grid - 2x2 Layout */}
            <View style={styles.nutritionGrid}>
              {nutritionItems.map((item, index) => (
                <View key={index} style={styles.nutritionItem}>
                  <View style={styles.nutritionHeader}>
                    <View style={styles.nutritionIcon}>{item.icon}</View>
                    <Text style={styles.nutritionLabel}>{item.label}</Text>
                  </View>
                  <Text style={styles.nutritionValue}>
                    {item.value}
                    {item.unit}
                  </Text>
                </View>
              ))}
            </View>

            {/* Health Score */}
            <View style={styles.healthScoreSection}>
              <View style={styles.healthScoreHeader}>
                <Heart size={20} color="#EF4444" />
                <Text style={styles.healthScoreLabel}>Health score</Text>
                <Text style={styles.healthScoreValue}>
                  {nutritionData.nutriScore}/100
                </Text>
              </View>
              <View style={styles.healthScoreBar}>
                <View
                  style={[
                    styles.healthScoreProgress,
                    { width: `${(nutritionData.nutriScore / 10) * 100}%` },
                  ]}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.fixButton}>
            <Wrench size={20} color="#000000" />
            <Text style={styles.fixButtonText}>Fix Results</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.doneButton}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  imageSection: {
    flex: 0.4,
    position: 'relative',
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsSection: {
    flex: 0.6,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  scrollView: {
    flex: 1,
  },
  foodInfoContainer: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  mealType: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  foodName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
  },
  titleQuantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    width: '100%',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginHorizontal: 16,
    minWidth: 16,
    textAlign: 'center',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
    width: '100%',
  },
  nutritionItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  nutritionHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  nutritionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
    textAlign: 'center',
  },
  nutritionValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  healthScoreSection: {
    marginTop: 8,
  },
  healthScoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  healthScoreLabel: {
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
  healthScoreValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  healthScoreBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  healthScoreProgress: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 4,
  },
  bottomButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  fixButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 24,
    gap: 8,
  },
  fixButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  doneButton: {
    flex: 1,
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
