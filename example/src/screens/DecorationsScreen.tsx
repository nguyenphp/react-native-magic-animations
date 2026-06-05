import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { ShowcaseCard } from '../components/ShowcaseCard';
import {
  Check,
  Cross,
  Star,
  Badge,
  Notification,
  Confetti,
  LikeButton,
  EmojiBurst,
  RatingStars,
  Coins,
} from 'react-native-magic-animations';

export function DecorationsScreen() {
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [coinsTrigger, setCoinsTrigger] = useState(false);
  const [emojiTrigger, setEmojiTrigger] = useState(false);
  const [rating, setRating] = useState(4);
  const [liked, setLiked] = useState(false);
  const [checkKey, setCheckKey] = useState(0);
  const [crossKey, setCrossKey] = useState(0);
  const [starKey, setStarKey] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setConfettiTrigger(true);
      setCoinsTrigger(true);
      setEmojiTrigger(true);
      setCheckKey(p => p + 1);
      setCrossKey(p => p + 1);
      setStarKey(p => p + 1);
      setRating(r => (r === 5 ? 3 : 5));
      setLiked(l => !l);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ShowcaseCard 
        title="Check" 
        description="Animated checkmark path drawing icon"
        actionButton={<Button title="Re-animate" color="#2E7D32" onPress={() => setCheckKey(p => p + 1)} />}
      >
        <Check key={checkKey} size={50} color="#4CAF50" />
      </ShowcaseCard>

      <ShowcaseCard 
        title="Cross" 
        description="Animated cross path drawing icon"
        actionButton={<Button title="Re-animate" color="#2E7D32" onPress={() => setCrossKey(p => p + 1)} />}
      >
        <Cross key={crossKey} size={50} color="#F44336" />
      </ShowcaseCard>

      <ShowcaseCard 
        title="Star" 
        description="Animated glowing star drawing icon"
        actionButton={<Button title="Re-animate" color="#2E7D32" onPress={() => setStarKey(p => p + 1)} />}
      >
        <Star key={starKey} size={50} color="#FFC107" />
      </ShowcaseCard>

      <ShowcaseCard title="Badge" description="Pulsating status badge counter">
        <View style={styles.iconRow}>
          <View style={styles.iconBlock}>
            <Text style={styles.iconPlaceholder}>Inbox</Text>
            <Badge value="9+" style={styles.badge} />
          </View>
        </View>
      </ShowcaseCard>

      <ShowcaseCard title="Notification" description="Animated bell shaker with notification dot">
        <Notification ringing={true} amount={12}>
          <Text style={{ fontSize: 32 }}>🔔</Text>
        </Notification>
      </ShowcaseCard>

      <ShowcaseCard 
        title="Confetti" 
        description="Drops multi-colored celebration paper ribbons"
        actionButton={<Button title="Celebrate!" color="#2E7D32" onPress={() => setConfettiTrigger(true)} />}
      >
        <Confetti 
          trigger={confettiTrigger} 
          onDone={() => setConfettiTrigger(false)} 
          pieces={60}
          style={styles.fullWidthContainer}
        >
          <View style={styles.confettiTarget}>
            <Text style={styles.confettiText}>Hooray!</Text>
          </View>
        </Confetti>
      </ShowcaseCard>

      <ShowcaseCard 
        title="Coins" 
        description="Rains golden coin emoji particles"
        actionButton={<Button title="Collect Coins!" color="#2E7D32" onPress={() => setCoinsTrigger(true)} />}
      >
        <Coins 
          trigger={coinsTrigger} 
          onDone={() => setCoinsTrigger(false)} 
          count={25}
          style={styles.fullWidthContainer}
        >
          <View style={styles.coinsTarget}>
            <Text style={styles.coinsText}>Balance: $120.00</Text>
          </View>
        </Coins>
      </ShowcaseCard>

      <ShowcaseCard 
        title="LikeButton" 
        description="Interactive like button with bubble and explode animation"
      >
        <LikeButton 
          liked={liked} 
          onToggle={() => setLiked(!liked)} 
          size={45} 
          color="#EF5350" 
        />
      </ShowcaseCard>

      <ShowcaseCard 
        title="EmojiBurst" 
        description="Bursts floating custom emojis on click"
        actionButton={<Button title="Burst Emojis" color="#2E7D32" onPress={() => setEmojiTrigger(true)} />}
      >
        <EmojiBurst 
          trigger={emojiTrigger} 
          onDone={() => setEmojiTrigger(false)} 
          emojis={['🔥', '🎉', '🚀', '💯']}
          count={16}
          style={styles.fullWidthContainer}
        >
          <View style={styles.emojiTarget}>
            <Text style={styles.emojiText}>Tapped Power</Text>
          </View>
        </EmojiBurst>
      </ShowcaseCard>

      <ShowcaseCard title="RatingStars" description="Rating stars component with animated entry">
        <RatingStars 
          value={rating} 
          size={36} 
          activeColor="#FFCA28" 
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
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBlock: {
    padding: 16,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    position: 'relative',
  },
  iconPlaceholder: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  fullWidthContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confettiTarget: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#FFF9C4',
    borderRadius: 8,
  },
  confettiText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F57F17',
  },
  coinsTarget: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  coinsText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FF8F00',
  },
  emojiTarget: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ECEFF1',
    borderRadius: 8,
  },
  emojiText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#37474F',
  },
});
