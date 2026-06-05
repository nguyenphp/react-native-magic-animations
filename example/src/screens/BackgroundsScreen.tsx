import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ShowcaseCard } from '../components/ShowcaseCard';
import {
  Aurora,
  GradientShift,
  Stars,
  Snow,
  Rain,
  Bubbles,
  Fireflies,
  Waves,
  MatrixRain,
} from 'react-native-magic-animations';

export function BackgroundsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ShowcaseCard title="Aurora" description="Northern light glowing background blobs">
        <Aurora style={styles.backgroundContainer}>
          <Text style={styles.overlayText}>Aurora Lights</Text>
        </Aurora>
      </ShowcaseCard>

      <ShowcaseCard title="GradientShift" description="Smoothly transitioning gradient colors">
        <GradientShift style={styles.backgroundContainer} colors={['#A8E6CF', '#DCEDC8', '#FFD3B6', '#A8E6CF']}>
          <Text style={styles.overlayText}>Shifted Colors</Text>
        </GradientShift>
      </ShowcaseCard>

      <ShowcaseCard title="Stars" description="Twinkling starry night sky effect">
        <Stars style={[styles.backgroundContainer, { backgroundColor: '#1A237E' }]} density={50}>
          <Text style={styles.overlayTextLight}>Starry Night</Text>
        </Stars>
      </ShowcaseCard>

      <ShowcaseCard title="Snow" description="Falling winter snow particles">
        <Snow style={[styles.backgroundContainer, { backgroundColor: '#ECEFF1' }]}>
          <Text style={[styles.overlayText, { color: '#455A64' }]}>Winter Snow</Text>
        </Snow>
      </ShowcaseCard>

      <ShowcaseCard title="Rain" description="Falling rainy storm effect with droplets">
        <Rain style={[styles.backgroundContainer, { backgroundColor: '#37474F' }]} drops={40}>
          <Text style={styles.overlayTextLight}>Rainy Storm</Text>
        </Rain>
      </ShowcaseCard>

      <ShowcaseCard title="Bubbles" description="Rising transparent floaty bubbles">
        <Bubbles style={[styles.backgroundContainer, { backgroundColor: '#E0F7FA' }]}>
          <Text style={[styles.overlayText, { color: '#006064' }]}>Soap Bubbles</Text>
        </Bubbles>
      </ShowcaseCard>

      <ShowcaseCard title="Fireflies" description="Glowing green fireflies floating at night">
        <Fireflies style={[styles.backgroundContainer, { backgroundColor: '#212121' }]}>
          <Text style={styles.overlayTextLight}>Firefly Night</Text>
        </Fireflies>
      </ShowcaseCard>

      <ShowcaseCard title="Waves" description="Flowing multiple ocean wave lines">
        <Waves style={[styles.backgroundContainer, { backgroundColor: '#E0F2F1' }]}>
          <Text style={[styles.overlayText, { color: '#004D40' }]}>Ocean Waves</Text>
        </Waves>
      </ShowcaseCard>

      <ShowcaseCard title="MatrixRain" description="Digital falling green code matrix screen">
        <MatrixRain style={[styles.backgroundContainer, { backgroundColor: '#000000' }]}>
          <Text style={[styles.overlayTextLight, { color: '#00FF00', fontWeight: 'bold' }]}>Digital Matrix</Text>
        </MatrixRain>
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
  backgroundContainer: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    textAlign: 'center',
    overflow: 'hidden',
  },
  overlayTextLight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    textAlign: 'center',
    overflow: 'hidden',
  },
});
