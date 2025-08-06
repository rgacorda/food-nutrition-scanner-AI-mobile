import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CircleHelp as HelpCircle,
  ChartBar as BarChart3,
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

const timeRanges = ['90 Days', '6 Months', '1 Year', 'All time'];
const weekRanges = ['This week', 'Last week', '2 wks. ago', '3 wks. ago'];

export default function ProgressScreen() {
  const { colors } = useTheme();
  const [selectedTimeRange, setSelectedTimeRange] = useState('90 Days');
  const [selectedWeekRange, setSelectedWeekRange] = useState('This week');

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
          <Text style={[styles.title, { color: colors.text }]}>Progress</Text>
        </View>

        {/* Top Cards */}
        <View style={styles.topCardsContainer}>
          <View
            style={[styles.weightCard, { backgroundColor: colors.surface }]}
          >
            <Text
              style={[styles.cardSubtitle, { color: colors.textSecondary }]}
            >
              My Weight
            </Text>
            <Text style={[styles.weightValue, { color: colors.text }]}>
              65 kg
            </Text>
            <Text style={[styles.goalText, { color: colors.textSecondary }]}>
              Goal 70 kg
            </Text>
            <Text style={[styles.nextWeighIn, { color: colors.textSecondary }]}>
              Next weigh-in: 7d
            </Text>
          </View>

          <View
            style={[styles.streakCard, { backgroundColor: colors.surface }]}
          >
            <View style={styles.streakIcon}>
              <Text style={styles.fireEmoji}>🔥</Text>
              <View style={styles.sparkles}>
                <Text style={styles.sparkle}>✨</Text>
                <Text style={styles.sparkle}>✨</Text>
              </View>
            </View>
            <Text style={[styles.streakNumber, { color: colors.text }]}>0</Text>
            <Text style={styles.streakLabel}>Day Streak</Text>
            {/* <View style={styles.weekDots}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <View key={index} style={[styles.dayDot, { backgroundColor: colors.background }]}>
                  <Text style={[styles.dayLetter, { color: colors.textSecondary }]}>{day}</Text>
                </View>
              ))}
            </View> */}
          </View>
        </View>

        {/* Time Range Selector */}
        <View style={styles.timeRangeContainer}>
          {timeRanges.map((range) => (
            <TouchableOpacity
              key={range}
              style={[
                styles.timeRangeButton,
                {
                  backgroundColor:
                    selectedTimeRange === range
                      ? colors.surface
                      : colors.border,
                },
              ]}
              onPress={() => setSelectedTimeRange(range)}
            >
              <Text
                style={[
                  styles.timeRangeText,
                  {
                    color:
                      selectedTimeRange === range
                        ? colors.text
                        : colors.textSecondary,
                  },
                ]}
              >
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Goal Progress */}
        <View
          style={[styles.goalProgressCard, { backgroundColor: colors.surface }]}
        >
          <View style={styles.goalHeader}>
            <Text style={[styles.goalTitle, { color: colors.text }]}>
              Goal Progress
            </Text>
            <View style={styles.goalPercentage}>
              <BarChart3 size={16} color={colors.textSecondary} />
              <Text
                style={[
                  styles.goalPercentageText,
                  { color: colors.textSecondary },
                ]}
              >
                0% of goal
              </Text>
            </View>
          </View>

          <View style={styles.chartContainer}>
            <View style={styles.yAxisLabels}>
              <Text
                style={[styles.yAxisLabel, { color: colors.textSecondary }]}
              >
                70
              </Text>
              <Text
                style={[styles.yAxisLabel, { color: colors.textSecondary }]}
              >
                65
              </Text>
              <Text
                style={[styles.yAxisLabel, { color: colors.textSecondary }]}
              >
                60
              </Text>
            </View>
            <View style={styles.chartArea}>
              <View
                style={[
                  styles.currentWeightLine,
                  { backgroundColor: colors.primary },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Motivational Message */}
        <View style={styles.motivationCard}>
          <Text style={styles.motivationText}>
            Getting started is the hardest part. You're ready for this!
          </Text>
        </View>

        {/* Week Range Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekRangeContainer}
          style={styles.weekRangeScrollView}
        >
          {weekRanges.map((range) => (
            <TouchableOpacity
              key={range}
              style={[
                styles.weekRangeButton,
                {
                  backgroundColor:
                    selectedWeekRange === range
                      ? colors.surface
                      : colors.border,
                },
              ]}
              onPress={() => setSelectedWeekRange(range)}
            >
              <Text
                style={[
                  styles.weekRangeText,
                  {
                    color:
                      selectedWeekRange === range
                        ? colors.text
                        : colors.textSecondary,
                  },
                ]}
              >
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Total Calories Card */}
        <View
          style={[styles.caloriesCard, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.caloriesTitle, { color: colors.text }]}>
            Total Calories
          </Text>
          <View style={styles.noDataContainer}>
            <BarChart3 size={48} color={colors.border} />
            <Text style={[styles.noDataTitle, { color: colors.text }]}>
              No data to show
            </Text>
            <Text
              style={[styles.noDataSubtitle, { color: colors.textSecondary }]}
            >
              This will update as you log more food.
            </Text>
          </View>
        </View>

        {/* BMI Card */}
        <View style={[styles.bmiCard, { backgroundColor: colors.surface }]}>
          <View style={styles.bmiHeader}>
            <Text style={[styles.bmiTitle, { color: colors.text }]}>
              Your BMI
            </Text>
            <TouchableOpacity>
              <HelpCircle size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.bmiContent}>
            <Text style={[styles.bmiValue, { color: colors.text }]}>21.8</Text>
            <View style={styles.bmiStatus}>
              <Text
                style={[styles.bmiStatusText, { color: colors.textSecondary }]}
              >
                Your weight is
              </Text>
              <View style={styles.healthyBadge}>
                <Text style={styles.healthyText}>Healthy</Text>
              </View>
            </View>
          </View>

          <View style={styles.bmiScale}>
            <View
              style={[styles.bmiBar, { backgroundColor: colors.success }]}
            />
            <View
              style={[styles.bmiIndicator, { backgroundColor: colors.primary }]}
            />
          </View>

          <View style={styles.bmiLegend}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: '#3B82F6' }]}
              />
              <Text
                style={[styles.legendText, { color: colors.textSecondary }]}
              >
                Underweight
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: '#10B981' }]}
              />
              <Text
                style={[styles.legendText, { color: colors.textSecondary }]}
              >
                Healthy
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: '#F59E0B' }]}
              />
              <Text
                style={[styles.legendText, { color: colors.textSecondary }]}
              >
                Overweight
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: '#EF4444' }]}
              />
              <Text
                style={[styles.legendText, { color: colors.textSecondary }]}
              >
                Obese
              </Text>
            </View>
          </View>
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
  topCardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  weightCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardSubtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  weightValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  goalText: {
    fontSize: 16,
    marginBottom: 16,
  },
  nextWeighIn: {
    fontSize: 14,
  },
  streakCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  streakIcon: {
    position: 'relative',
    marginBottom: 12,
  },
  fireEmoji: {
    fontSize: 48,
  },
  sparkles: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  sparkle: {
    fontSize: 16,
    position: 'absolute',
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  streakLabel: {
    fontSize: 16,
    color: '#FF8C00',
    fontWeight: '600',
    marginBottom: 16,
  },
  weekDots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  dayDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayLetter: {
    fontSize: 10,
    fontWeight: '500',
  },
  timeRangeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 8,
  },
  timeRangeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  goalProgressCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  goalPercentage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  goalPercentageText: {
    fontSize: 14,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
  },
  yAxisLabels: {
    justifyContent: 'space-between',
    paddingRight: 12,
    paddingVertical: 20,
  },
  yAxisLabel: {
    fontSize: 14,
  },
  chartArea: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  currentWeightLine: {
    height: 2,
    width: '100%',
  },
  motivationCard: {
    backgroundColor: '#DCFCE7',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  motivationText: {
    fontSize: 14,
    color: '#16A34A',
    fontWeight: '500',
    textAlign: 'center',
  },
  weekRangeContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 8,
  },
  weekRangeScrollView: {
    marginBottom: 16,
  },
  weekRangeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  weekRangeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  caloriesCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  caloriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  noDataContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noDataTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  noDataSubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  bmiCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 100,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bmiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bmiTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bmiContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
    gap: 12,
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  bmiStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bmiStatusText: {
    fontSize: 16,
  },
  healthyBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  healthyText: {
    fontSize: 14,
    color: '#16A34A',
    fontWeight: '500',
  },
  bmiScale: {
    height: 8,
    borderRadius: 4,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  bmiBar: {
    flex: 1,
    height: '100%',
  },
  bmiIndicator: {
    position: 'absolute',
    top: -2,
    left: '35%',
    width: 2,
    height: 12,
  },
  bmiLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
  },
});
