import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { ShowcaseCard } from '../components/ShowcaseCard';
import {
  TapFeedback,
  LongPressGrow,
  DoubleTapHeart,
  SwipeReveal,
} from 'react-native-magic-animations';

export function GesturesScreen() {
  const [likeCount, setLikeCount] = useState(0);

  const sampleActions = [
    {
      label: 'Delete',
      color: '#EF5350',
      onPress: () => Alert.alert('Action', 'Deleted item!'),
    },
    {
      label: 'Archive',
      color: '#4CAF50',
      onPress: () => Alert.alert('Action', 'Archived item!'),
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ShowcaseCard title="TapFeedback" description="Tap to see organic press scaling bounce">
        <TapFeedback style={styles.touchArea}>
          <View style={[styles.box, { backgroundColor: '#81C784', width: 150 }]}>
            <Text style={styles.boxText}>Tap Me</Text>
          </View>
        </TapFeedback>
      </ShowcaseCard>

      <ShowcaseCard title="LongPressGrow" description="Long press to trigger progressive scale growth">
        <LongPressGrow growScale={1.3}>
          <View style={[styles.box, { backgroundColor: '#4DB6AC', width: 150 }]}>
            <Text style={styles.boxText}>Hold Me</Text>
          </View>
        </LongPressGrow>
      </ShowcaseCard>

      <ShowcaseCard 
        title="DoubleTapHeart" 
        description="Double tap anywhere on card to spawn rising like heart particles"
        actionButton={<Text style={styles.likesCount}>Likes: {likeCount}</Text>}
      >
        <DoubleTapHeart 
          onLike={() => setLikeCount(prev => prev + 1)} 
          heartSize={80} 
          heartColor="#EF5350"
          style={styles.heartTapArea}
        >
          <View style={styles.heartTapContent}>
            <Text style={styles.tapTip}>Double Tap Here ♥</Text>
          </View>
        </DoubleTapHeart>
      </ShowcaseCard>

      <ShowcaseCard title="SwipeReveal" description="Swipe left to reveal custom action menus">
        <SwipeReveal actions={sampleActions} actionWidth={80} style={styles.swipeWrapper}>
          <View style={styles.swipeRowContent}>
            <Text style={styles.swipeText}>← Swipe me left</Text>
          </View>
        </SwipeReveal>
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
  touchArea: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  box: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  heartTapArea: {
    width: '100%',
    height: 120,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
  },
  heartTapContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapTip: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  likesCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E53935',
  },
  swipeWrapper: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  swipeRowContent: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F1F8E9',
    justifyContent: 'center',
    paddingLeft: 16,
  },
  swipeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#33691E',
  },
});
