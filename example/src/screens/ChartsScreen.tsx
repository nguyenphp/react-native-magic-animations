import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { ShowcaseCard } from '../components/ShowcaseCard';
import {
  ProgressRing,
  AnimatedBar,
  Sparkline,
  LineChart,
  BarChart,
  Gauge,
} from 'react-native-magic-animations';

export function ChartsScreen() {
  const [chartKey, setChartKey] = useState(0);
  const [progress, setProgress] = useState(0.75);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setChartKey(prev => prev + 1);
      setProgress(Math.random());
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const mockData1 = [10, 40, 25, 75, 55, 90, 60, 95];
  const mockData2 = [20, 60, 45, 80, 50, 100];

  const handleRefresh = () => {
    setChartKey(prev => prev + 1);
    setProgress(Math.random());
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.refreshWrapper}>
        <Button title="Randomize Data & Re-animate" color="#2E7D32" onPress={handleRefresh} />
      </View>

      <ShowcaseCard title="ProgressRing" description="Animated circular progress indicator">
        <ProgressRing 
          key={chartKey}
          value={progress} 
          size={120} 
          strokeWidth={12} 
          color="#4CAF50" 
          trackColor="#E8F5E9"
        >
          <Text style={styles.ringText}>{Math.round(progress * 100)}%</Text>
        </ProgressRing>
      </ShowcaseCard>

      <ShowcaseCard title="AnimatedBar" description="Progressive loading bar chart style">
        <View style={styles.fullWidth}>
          <AnimatedBar key={chartKey} value={progress} height={16} color="#81C784" />
        </View>
      </ShowcaseCard>

      <ShowcaseCard title="Sparkline" description="Mini trendline chart for fast metrics representation">
        <Sparkline 
          key={chartKey}
          data={mockData1} 
          width={300} 
          height={60} 
          color="#388E3C" 
          strokeWidth={3} 
        />
      </ShowcaseCard>

      <ShowcaseCard title="LineChart" description="Full-sized animated line chart with points">
        <LineChart 
          key={chartKey}
          data={mockData1} 
          width={300} 
          height={160} 
          color="#4CAF50" 
          strokeWidth={4} 
        />
      </ShowcaseCard>

      <ShowcaseCard title="BarChart" description="Staggered entry horizontal/vertical bar chart columns">
        <BarChart 
          key={chartKey}
          data={mockData2} 
          width={300} 
          height={150} 
          color="#66BB6A" 
          gap={12} 
          stagger={80} 
          radius={6}
        />
      </ShowcaseCard>

      <ShowcaseCard title="Gauge" description="Speedometer or dial style animated gauge progress indicator">
        <Gauge 
          key={chartKey}
          value={progress} 
          size={150} 
          strokeWidth={14} 
          color="#4CAF50" 
          trackColor="#E8F5E9"
        />
      </ShowcaseCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F9F5',
  },
  contentContainer: {
    padding: 16,
  },
  refreshWrapper: {
    marginBottom: 16,
  },
  ringText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  fullWidth: {
    width: '90%',
    paddingVertical: 10,
  },
});
