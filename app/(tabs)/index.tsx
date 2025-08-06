import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Flame, Bell, X, Plus } from 'lucide-react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '@/contexts/ThemeContext';
import * as ImageManipulator from 'expo-image-manipulator';

interface RecentScan {
  id: string;
  image: string;
  foodName: string;
  calories: number;
  date: string;
}

const mockRecentScans: RecentScan[] = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
    foodName: 'Grilled Chicken Salad',
    calories: 320,
    date: 'Today, 2:30 PM',
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    foodName: 'Avocado Toast',
    calories: 280,
    date: 'Today, 9:15 AM',
  },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
    foodName: 'Greek Yogurt Bowl',
    calories: 180,
    date: 'Yesterday, 7:45 AM',
  },
  {
    id: '4',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
    foodName: 'Salmon Bowl',
    calories: 420,
    date: 'Yesterday, 1:20 PM',
  },
  {
    id: '5',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
    foodName: 'Quinoa Salad',
    calories: 350,
    date: 'Yesterday, 6:30 PM',
  },
  {
    id: '6',
    image: 'https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=400',
    foodName: 'Smoothie Bowl',
    calories: 290,
    date: '2 days ago',
  },
  {
    id: '7',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400',
    foodName: 'Pasta Primavera',
    calories: 480,
    date: '2 days ago',
  },
  {
    id: '8',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400',
    foodName: 'Turkey Sandwich',
    calories: 380,
    date: '3 days ago',
  },
];

interface DayData {
  day: string;
  date: number;
  isToday: boolean;
}

const weekDays: DayData[] = [
  { day: 'T', date: 31, isToday: false },
  { day: 'F', date: 1, isToday: false },
  { day: 'S', date: 2, isToday: false },
  { day: 'S', date: 3, isToday: false },
  { day: 'M', date: 4, isToday: false },
  { day: 'T', date: 5, isToday: true },
  { day: 'W', date: 6, isToday: false },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = React.useState(false);
  const [recentScans] = React.useState<RecentScan[]>(mockRecentScans);
  const [currentPage, setCurrentPage] = React.useState(0);
  const cameraRef = React.useRef<any>(null);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(recentScans.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = recentScans.slice(startIndex, endIndex);




const handleCapturePhoto = async () => {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    Alert.alert('Permission Required', 'Camera permission is required.');
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.8, // initial compression
    base64: false,
  });

  if (!result.canceled && result.assets[0]) {
    const image = result.assets[0];

    // 🧠 Resize or compress if image is larger than 1MB
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ resize: { width: 800 } }], // Resize width, auto height
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: false }
    );

    // Navigate to loading screen with compressed image URI
    router.push({
      pathname: '/analysis-loading',
      params: {
        imageUri: manipulatedImage.uri,
      },
    });
  }
};






  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        
        setShowCamera(false);
        
        // Show loading screen and simulate AI analysis
        router.push({
          pathname: '/analysis-loading',
          params: { imageUri: photo.uri },
        });
      } catch (error) {
        Alert.alert('Error', 'Failed to take photo.');
      }
    }
  };

  if (showCamera && Platform.OS !== 'web') {
    return (
      <SafeAreaView style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          ref={cameraRef}
        >
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowCamera(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleCapturePhoto}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          </View>
        </CameraView>
      </SafeAreaView>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View style={[styles.appleIcon, { backgroundColor: colors.primary }]}>
              <Text style={styles.appleEmoji}>🍎</Text>
            </View>
            <Text style={[styles.appTitle, { color: colors.text }]}>Cal AI</Text>
          </View>
          <View style={styles.streakContainer}>
            <Flame size={16} color="#FF6B35" />
            <Text style={[styles.streakText, { color: colors.text }]}>0</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Week Calendar */}
          <View style={styles.weekContainer}>
            {weekDays.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <View style={[
                  styles.dayCircle,
                  day.isToday && { ...styles.todayCircle, borderColor: colors.primary }
                ]}>
                  <Text style={[
                    styles.dayLetter, 
                    { color: day.isToday ? colors.primary : colors.textSecondary }
                  ]}>
                    {day.day}
                  </Text>
                </View>
                <Text style={[
                  styles.dayNumber, 
                  { color: day.isToday ? colors.text : colors.textSecondary }
                ]}>
                  {day.date}
                </Text>
              </View>
            ))}
          </View>

          {/* Calories Card */}
          <View style={[styles.caloriesCard, { backgroundColor: colors.surface }]}>
            <View style={styles.caloriesLeft}>
              <Text style={[styles.caloriesNumber, { color: colors.text }]}>2488</Text>
              <Text style={[styles.caloriesLabel, { color: colors.textSecondary }]}>Calories left</Text>
            </View>
            <View style={styles.circularProgress}>
              <View style={[styles.progressRing, { borderColor: colors.border }]}>
                <Flame size={24} color={colors.text} />
              </View>
            </View>
          </View>

          {/* Macronutrients */}
          <View style={styles.macroContainer}>
            <View style={[styles.macroCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.macroValue, { color: colors.text }]}>169g</Text>
              <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>Protein left</Text>
              <View style={styles.macroProgress}>
                <View style={[styles.macroIcon, { backgroundColor: '#FFE5E5' }]}>
                  <View style={styles.proteinIcon} />
                </View>
              </View>
            </View>

            <View style={[styles.macroCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.macroValue, { color: colors.text }]}>297g</Text>
              <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>Carbs left</Text>
              <View style={styles.macroProgress}>
                <View style={[styles.macroIcon, { backgroundColor: '#FFF4E5' }]}>
                  <Text style={styles.carbIcon}>🌾</Text>
                </View>
              </View>
            </View>

            <View style={[styles.macroCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.macroValue, { color: colors.text }]}>69g</Text>
              <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>Fat left</Text>
              <View style={styles.macroProgress}>
                <View style={[styles.macroIcon, { backgroundColor: '#E5F3FF' }]}>
                  <Text style={styles.fatIcon}>💧</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Page Indicator */}
          <View style={styles.pageIndicator}>
            <View style={[styles.activeDot, { backgroundColor: colors.primary }]} />
            <View style={[styles.inactiveDot, { backgroundColor: colors.border }]} />
          </View>

          {/* Recently Uploaded */}
          <View style={styles.recentSection}>
            <Text style={[styles.recentTitle, { color: colors.text }]}>Recently uploaded</Text>
            
            <View style={[styles.notificationCard, { backgroundColor: colors.surface }]}>
              <Bell size={20} color={colors.textSecondary} />
              <View style={styles.notificationContent}>
                <Text style={styles.notificationText}>
                  Get notified when the analysis is done. No need to wait.
                </Text>
              </View>
              <TouchableOpacity style={styles.notifyButton}>
                <Text style={[styles.notifyButtonText, { color: colors.textSecondary }]}>Notify Me</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton}>
                <X size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {currentItems.map((scan) => (
                <TouchableOpacity
                key={scan.id}
                style={[styles.recentItem, { backgroundColor: colors.surface }]}
                onPress={() => router.push({ pathname: '/food-details', params: { id: scan.id } })}
                >
                <Image source={{ uri: scan.image }} style={styles.recentImage} />
                <View style={styles.recentInfo}>
                  <Text style={[styles.recentFoodName, { color: colors.text }]}>{scan.foodName}</Text>
                  <Text style={[styles.recentCalories, { color: colors.textSecondary }]}>{scan.calories} kcal</Text>
                  <Text style={[styles.recentDate, { color: colors.textSecondary }]}>{scan.date}</Text>
                </View>
                </TouchableOpacity>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <View style={styles.paginationContainer}>
                <TouchableOpacity
                  style={[
                    styles.paginationButton, 
                    { backgroundColor: colors.surface },
                    currentPage === 0 && { backgroundColor: colors.background }
                  ]}
                  onPress={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                >
                  <Text style={[
                    styles.paginationButtonText, 
                    { color: currentPage === 0 ? colors.textSecondary : colors.text }
                  ]}>
                    Previous
                  </Text>
                </TouchableOpacity>
                
                <View style={styles.paginationDots}>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.paginationDot, 
                        { backgroundColor: index === currentPage ? colors.primary : colors.border }
                      ]}
                      onPress={() => setCurrentPage(index)}
                    />
                  ))}
                </View>
                
                <TouchableOpacity
                  style={[
                    styles.paginationButton, 
                    { backgroundColor: colors.surface },
                    currentPage === totalPages - 1 && { backgroundColor: colors.background }
                  ]}
                  onPress={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                >
                  <Text style={[
                    styles.paginationButtonText, 
                    { color: currentPage === totalPages - 1 ? colors.textSecondary : colors.text }
                  ]}>
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Floating Action Button */}
        <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]} onPress={handleCapturePhoto}>
          <Plus size={28} color={colors.surface} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appleEmoji: {
    fontSize: 18,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  streakText: {
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  dayContainer: {
    alignItems: 'center',
    gap: 8,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayCircle: {
    borderStyle: 'solid',
  },
  dayLetter: {
    fontSize: 16,
    fontWeight: '500',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
  },
  caloriesCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  caloriesLeft: {
    flex: 1,
  },
  caloriesNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  caloriesLabel: {
    fontSize: 16,
  },
  circularProgress: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  macroContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  macroCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  macroValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
  },
  macroProgress: {
    alignItems: 'center',
  },
  macroIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  proteinIcon: {
    width: 12,
    height: 12,
    backgroundColor: '#EF4444',
    borderRadius: 6,
  },
  carbIcon: {
    fontSize: 16,
  },
  fatIcon: {
    fontSize: 16,
  },
  pageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  recentSection: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  recentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notificationCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    lineHeight: 20,
  },
  notifyButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  notifyButtonText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  closeButton: {
    padding: 4,
  },
  recentItem: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recentImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  recentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  recentFoodName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  recentCalories: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  recentDate: {
    fontSize: 12,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 4,
  },
  paginationButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  paginationButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  paginationDots: {
    flexDirection: 'row',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  cancelButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
});