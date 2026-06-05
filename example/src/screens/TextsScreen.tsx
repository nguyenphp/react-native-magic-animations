import React, { useState } from 'react';
import { ScrollView, StyleSheet, Button, View } from 'react-native';
import { ShowcaseCard } from '../components/ShowcaseCard';
import {
  Typewriter,
  Wave,
  Scramble,
  Blink,
  Highlight,
  Underline,
  Strike,
  BounceIn,
  FadeWord,
  RevealMask,
  Counter,
  Sparkle,
  Shuffle,
  Marquee,
  Rotator,
  Decode,
  Capitalize,
  Glitch,
  Neon,
} from 'react-native-magic-animations';

export function TextsScreen() {
  const [typewriterKey, setTypewriterKey] = useState(0);
  const [bounceKey, setBounceKey] = useState(0);
  const [counterVal, setCounterVal] = useState(100);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTypewriterKey(prev => prev + 1);
      setBounceKey(prev => prev + 1);
      setCounterVal(prev => (prev === 100 ? 250 : 100));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ShowcaseCard 
        title="Typewriter" 
        description="Fades in text character by character"
        actionButton={<Button title="Restart" color="#2E7D32" onPress={() => setTypewriterKey(prev => prev + 1)} />}
      >
        <Typewriter key={typewriterKey} text="Hello, Magic Animations!" style={styles.text} speed={80} />
      </ShowcaseCard>

      <ShowcaseCard title="Wave" description="Bounce effect character by character">
        <Wave text="Magic Wave Effect" style={styles.text} />
      </ShowcaseCard>

      <ShowcaseCard title="Scramble" description="Scrambles text randomly before resolving">
        <Scramble text="Antigravity" style={styles.text} duration={1500} />
      </ShowcaseCard>

      <ShowcaseCard title="Blink" description="Blinks the text with custom interval">
        <Blink style={styles.text} interval={500}>Alert Blink</Blink>
      </ShowcaseCard>

      <ShowcaseCard title="Highlight" description="Simulates a marker highlighting the text">
        <Highlight text="Highlighted Text" style={styles.text} color="#C8E6C9" />
      </ShowcaseCard>

      <ShowcaseCard title="Underline" description="Draws an animated line under the text">
        <Underline text="Animated Underline" style={styles.text} color="#81C784" />
      </ShowcaseCard>

      <ShowcaseCard title="Strike" description="Draws an animated strikethrough line">
        <Strike text="Strike Through Text" style={styles.text} color="#E57373" />
      </ShowcaseCard>

      <ShowcaseCard 
        title="BounceIn" 
        description="Bounces text into the screen"
        actionButton={<Button title="Bounce Again" color="#2E7D32" onPress={() => setBounceKey(prev => prev + 1)} />}
      >
        <BounceIn key={bounceKey} text="Bounce In!" style={styles.text} />
      </ShowcaseCard>

      <ShowcaseCard title="FadeWord" description="Fades text in word by word">
        <FadeWord text="This is a fade word effect" style={styles.text} delay={200} />
      </ShowcaseCard>

      <ShowcaseCard title="RevealMask" description="Reveals text using a sliding mask">
        <RevealMask text="Revealed Text" style={styles.text} />
      </ShowcaseCard>

      <ShowcaseCard 
        title="Counter" 
        description="Animated number counter"
        actionButton={
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button title="+50" color="#2E7D32" onPress={() => setCounterVal(prev => prev + 50)} />
            <Button title="-50" color="#2E7D32" onPress={() => setCounterVal(prev => prev - 50)} />
          </View>
        }
      >
        <Counter to={counterVal} style={styles.text} duration={1000} />
      </ShowcaseCard>

      <ShowcaseCard title="Sparkle" description="Text decorated with sparkling elements">
        <Sparkle text="Sparkling Star" style={styles.text} />
      </ShowcaseCard>

      <ShowcaseCard title="Shuffle" description="Shuffles characters rapidly">
        <Shuffle text="Shuffling" style={styles.text} />
      </ShowcaseCard>

      <ShowcaseCard title="Marquee" description="Horizontally scrolling text marquee">
        <Marquee text="Continuous scrolling message that marquee across screen" style={styles.text} speed={1} />
      </ShowcaseCard>

      <ShowcaseCard title="Rotator" description="Rotates words vertically one by one">
        <Rotator words={["Magic", "Beautiful", "Powerful", "Smooth"]} style={styles.text} />
      </ShowcaseCard>

      <ShowcaseCard title="Decode" description="Decodes binary matrix text back to string">
        <Decode text="Decoded Message" style={styles.text} />
      </ShowcaseCard>

      <ShowcaseCard title="Capitalize" description="Capitalizes letters dynamically">
        <Capitalize text="capitalize me please" style={styles.text} />
      </ShowcaseCard>

      <ShowcaseCard title="Glitch" description="Futuristic text glitch effect">
        <Glitch text="GLITCH ERROR" style={styles.text} />
      </ShowcaseCard>

      <ShowcaseCard title="Neon" description="Glowing neon text sign">
        <Neon text="NEON GLOW" style={{ fontSize: 24, fontWeight: '600', color: '#2E3A31' }} color="#4CAF50" glowRadius={15} />
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
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E3A31',
  },
});
