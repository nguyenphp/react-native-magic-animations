import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { ShowcaseCard } from '../components/ShowcaseCard';
import {
  Breathe,
  Float,
  FadeIn,
  PaperPlane,
  ThanosSnap,
  FireBurn,
  TearReveal,
  Pop,
  Drop,
  Spin,
  Tilt,
  Wobble,
  JellyPress,
  Magnetic,
  Shake,
  Wiggle,
  Pulse,
  RubberBand,
  Heart,
  Flash,
  Glow,
  Sparkles,
  Stamp,
  Ripple,
  FlipCard,
  Tilt3D,
  Shatter,
} from 'react-native-magic-animations';

export function ViewsScreen() {
  const [thanosTrigger, setThanosTrigger] = useState(false);
  const [shatterTrigger, setShatterTrigger] = useState(false);
  const [popKey, setPopKey] = useState(0);
  const [dropKey, setDropKey] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);
  const [wobbleKey, setWobbleKey] = useState(0);
  const [wiggleKey, setWiggleKey] = useState(0);
  const [rubberKey, setRubberKey] = useState(0);
  const [flashTrigger, setFlashTrigger] = useState(false);
  const [paperPlaneTrigger, setPaperPlaneTrigger] = useState(false);
  const [flipped, setFlipped] = useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setThanosTrigger(true);
      setTimeout(() => setShatterTrigger(true), 500);
      setTimeout(() => setPaperPlaneTrigger(true), 1000);
      
      setPopKey(p => p + 1);
      setDropKey(p => p + 1);
      setShakeKey(p => p + 1);
      setWobbleKey(p => p + 1);
      setWiggleKey(p => p + 1);
      setRubberKey(p => p + 1);
      
      setFlashTrigger(true);
      setTimeout(() => setFlashTrigger(false), 500);
      
      setFlipped(f => !f);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ShowcaseCard title="Breathe" description="Smooth continuous breathing scale effect">
        <Breathe minScale={0.9} maxScale={1.1} duration={1500}>
          <View style={[styles.box, { backgroundColor: '#A8E6CF' }]}>
            <Text style={styles.boxText}>Breathe</Text>
          </View>
        </Breathe>
      </ShowcaseCard>

      <ShowcaseCard title="Float" description="Soft continuous vertical floating effect">
        <Float duration={2000}>
          <View style={[styles.box, { backgroundColor: '#D4F1F4' }]}>
            <Text style={styles.boxText}>Float</Text>
          </View>
        </Float>
      </ShowcaseCard>

      <ShowcaseCard title="FadeIn" description="Fades in view with options">
        <FadeIn duration={1000}>
          <View style={[styles.box, { backgroundColor: '#FFD3B6' }]}>
            <Text style={styles.boxText}>Fade In</Text>
          </View>
        </FadeIn>
      </ShowcaseCard>

      <ShowcaseCard 
        title="ThanosSnap" 
        description="Disintegrates the view into dust particles"
        actionButton={<Button title="Snap!" color="#2E7D32" onPress={() => setThanosTrigger(true)} />}
      >
        <ThanosSnap 
          trigger={thanosTrigger} 
          onDone={() => setThanosTrigger(false)}
          duration={2000}
        >
          <View style={[styles.box, { backgroundColor: '#757575', width: 120, height: 60 }]}>
            <Text style={styles.boxText}>Perfectly Balanced</Text>
          </View>
        </ThanosSnap>
      </ShowcaseCard>

      <ShowcaseCard 
        title="Shatter" 
        description="Breaks the view into physical fragments"
        actionButton={<Button title="Shatter!" color="#2E7D32" onPress={() => setShatterTrigger(true)} />}
      >
        <Shatter 
          trigger={shatterTrigger} 
          onDone={() => setShatterTrigger(false)}
          duration={1200}
        >
          <View style={[styles.box, { backgroundColor: '#42A5F5', width: 120, height: 60 }]}>
            <Text style={styles.boxText}>Glass View</Text>
          </View>
        </Shatter>
      </ShowcaseCard>

      <ShowcaseCard 
        title="PaperPlane" 
        description="Folds and flies away like a paper airplane"
        actionButton={<Button title="Fly!" color="#2E7D32" onPress={() => setPaperPlaneTrigger(true)} />}
      >
        <PaperPlane trigger={paperPlaneTrigger} onDone={() => setPaperPlaneTrigger(false)}>
          <View style={[styles.box, { backgroundColor: '#FFF59D', width: 100, height: 60 }]}>
            <Text style={[styles.boxText, { color: '#5D4037' }]}>Send Mail</Text>
          </View>
        </PaperPlane>
      </ShowcaseCard>

      <ShowcaseCard title="FireBurn" description="View engulfed in animated flame particles">
        <FireBurn>
          <View style={[styles.box, { backgroundColor: '#FF7043' }]}>
            <Text style={styles.boxText}>On Fire</Text>
          </View>
        </FireBurn>
      </ShowcaseCard>

      <ShowcaseCard title="TearReveal" description="Reveals content like a tearing paper strip">
        <TearReveal>
          <View style={[styles.box, { backgroundColor: '#EC407A', width: 150 }]}>
            <Text style={styles.boxText}>Torn Page</Text>
          </View>
        </TearReveal>
      </ShowcaseCard>

      <ShowcaseCard 
        title="Pop" 
        description="Pop bounce scaling effect"
        actionButton={<Button title="Pop" color="#2E7D32" onPress={() => setPopKey(prev => prev + 1)} />}
      >
        <Pop key={popKey}>
          <View style={[styles.box, { backgroundColor: '#AB47BC' }]}>
            <Text style={styles.boxText}>Pop!</Text>
          </View>
        </Pop>
      </ShowcaseCard>

      <ShowcaseCard 
        title="Drop" 
        description="Falls down with elastic bounce back"
        actionButton={<Button title="Drop" color="#2E7D32" onPress={() => setDropKey(prev => prev + 1)} />}
      >
        <Drop key={dropKey}>
          <View style={[styles.box, { backgroundColor: '#26A69A' }]}>
            <Text style={styles.boxText}>Drop</Text>
          </View>
        </Drop>
      </ShowcaseCard>

      <ShowcaseCard title="Spin" description="Continuous rotations">
        <Spin duration={3000}>
          <View style={[styles.box, { backgroundColor: '#FFA726', borderRadius: 40, width: 80, height: 80 }]}>
            <Text style={styles.boxText}>Spin</Text>
          </View>
        </Spin>
      </ShowcaseCard>

      <ShowcaseCard title="Tilt" description="Rotates back and forth continuously">
        <Tilt angle={15} duration={1500}>
          <View style={[styles.box, { backgroundColor: '#78909C' }]}>
            <Text style={styles.boxText}>Tilt</Text>
          </View>
        </Tilt>
      </ShowcaseCard>

      <ShowcaseCard 
        title="Wobble" 
        description="Wobbles side to side"
        actionButton={<Button title="Wobble" color="#2E7D32" onPress={() => setWobbleKey(prev => prev + 1)} />}
      >
        <Wobble key={wobbleKey}>
          <View style={[styles.box, { backgroundColor: '#8D6E63' }]}>
            <Text style={styles.boxText}>Wobble</Text>
          </View>
        </Wobble>
      </ShowcaseCard>

      <ShowcaseCard title="JellyPress" description="Elastic jelly response on press">
        <JellyPress>
          <TouchableOpacity style={[styles.box, { backgroundColor: '#26C6DA' }]}>
            <Text style={styles.boxText}>Press Me</Text>
          </TouchableOpacity>
        </JellyPress>
      </ShowcaseCard>

      <ShowcaseCard title="Magnetic" description="Attracted to gestures/pulls">
        <Magnetic strength={0.4}>
          <View style={[styles.box, { backgroundColor: '#5C6BC0', borderRadius: 40, width: 80, height: 80 }]}>
            <Text style={styles.boxText}>Magnet</Text>
          </View>
        </Magnetic>
      </ShowcaseCard>

      <ShowcaseCard 
        title="Shake" 
        description="Fierce shake vibration"
        actionButton={<Button title="Shake" color="#2E7D32" onPress={() => setShakeKey(prev => prev + 1)} />}
      >
        <Shake key={shakeKey}>
          <View style={[styles.box, { backgroundColor: '#EF5350' }]}>
            <Text style={styles.boxText}>Shake</Text>
          </View>
        </Shake>
      </ShowcaseCard>

      <ShowcaseCard 
        title="Wiggle" 
        description="Playful wiggle"
        actionButton={<Button title="Wiggle" color="#2E7D32" onPress={() => setWiggleKey(prev => prev + 1)} />}
      >
        <Wiggle key={wiggleKey}>
          <View style={[styles.box, { backgroundColor: '#D4E157' }]}>
            <Text style={[styles.boxText, { color: '#33691E' }]}>Wiggle</Text>
          </View>
        </Wiggle>
      </ShowcaseCard>

      <ShowcaseCard title="Pulse" description="Continuous scale pulse">
        <Pulse color="#FFCA28" duration={1400}>
          <View style={[styles.box, { backgroundColor: '#FFCA28' }]}>
            <Text style={[styles.boxText, { color: '#5D4037' }]}>Pulse</Text>
          </View>
        </Pulse>
      </ShowcaseCard>

      <ShowcaseCard 
        title="RubberBand" 
        description="Stretches out and bounces back"
        actionButton={<Button title="Stretch" color="#2E7D32" onPress={() => setRubberKey(prev => prev + 1)} />}
      >
        <RubberBand key={rubberKey}>
          <View style={[styles.box, { backgroundColor: '#9CCC65' }]}>
            <Text style={[styles.boxText, { color: '#1B5E20' }]}>Rubber</Text>
          </View>
        </RubberBand>
      </ShowcaseCard>

      <ShowcaseCard title="Heart" description="Pulsates like a heartbeat">
        <Heart beating={true} bpm={72}>
          <View style={[styles.box, { backgroundColor: '#F48FB1', width: 60, height: 60, borderRadius: 30 }]}>
            <Text style={styles.boxText}>❤️</Text>
          </View>
        </Heart>
      </ShowcaseCard>

      <ShowcaseCard 
        title="Flash" 
        description="Rapid flash overlay"
        actionButton={<Button title="Flash" color="#2E7D32" onPress={() => {
          setFlashTrigger(false);
          setTimeout(() => setFlashTrigger(true), 50);
        }} />}
      >
        <Flash trigger={flashTrigger}>
          <View style={[styles.box, { backgroundColor: '#26A69A' }]}>
            <Text style={styles.boxText}>Flash</Text>
          </View>
        </Flash>
      </ShowcaseCard>

      <ShowcaseCard title="Glow" description="Continuous neon ambient glowing borders">
        <Glow color="#4CAF50" intensity={1.2}>
          <View style={[styles.box, { backgroundColor: '#E8F5E9' }]}>
            <Text style={[styles.boxText, { color: '#2E7D32' }]}>Glowing</Text>
          </View>
        </Glow>
      </ShowcaseCard>

      <ShowcaseCard title="Sparkles" description="Pops small sparkle particles around the view">
        <Sparkles count={8} colors={['#FFD54F', '#FF7043', '#4CAF50']}>
          <View style={[styles.box, { backgroundColor: '#7E57C2' }]}>
            <Text style={styles.boxText}>Sparkle</Text>
          </View>
        </Sparkles>
      </ShowcaseCard>

      <ShowcaseCard title="Stamp" description="Hits the screen like a stamp with sound-like bounce">
        <Stamp>
          <View style={[styles.box, { backgroundColor: '#8D6E63', transform: [{ rotate: '-5deg' }] }]}>
            <Text style={styles.boxText}>APPROVED</Text>
          </View>
        </Stamp>
      </ShowcaseCard>

      <ShowcaseCard title="Ripple" description="Material ripple effect on tap">
        <Ripple color="rgba(76,175,80,0.4)" duration={800}>
          <View style={[styles.box, { backgroundColor: '#81C784', width: 150, height: 60 }]}>
            <Text style={styles.boxText}>Tap for Ripple</Text>
          </View>
        </Ripple>
      </ShowcaseCard>

      <ShowcaseCard 
        title="FlipCard" 
        description="3D Flip card animation on tap"
        actionButton={<Button title="Flip" color="#2E7D32" onPress={() => setFlipped(prev => !prev)} />}
      >
        <FlipCard 
          flipped={flipped}
          front={
            <View style={[styles.box, { backgroundColor: '#80CBC4', width: 140, height: 80 }]}>
              <Text style={styles.boxText}>Front Side</Text>
            </View>
          }
          back={
            <View style={[styles.box, { backgroundColor: '#00897B', width: 140, height: 80 }]}>
              <Text style={styles.boxText}>Back Side</Text>
            </View>
          }
        />
      </ShowcaseCard>

      <ShowcaseCard title="Tilt3D" description="3D perspective tilt reacting to touches">
        <Tilt3D maxTilt={15}>
          <View style={[styles.box, { backgroundColor: '#95A5A6', width: 140, height: 80 }]}>
            <Text style={styles.boxText}>Drag Me 3D</Text>
          </View>
        </Tilt3D>
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
  box: {
    width: 100,
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
});
