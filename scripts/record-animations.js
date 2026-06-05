const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const exampleRoot = path.resolve(projectRoot, 'example');
const activeRecordingPath = path.resolve(exampleRoot, 'src/screens/ActiveRecording.tsx');
const appConfigPath = path.resolve(exampleRoot, 'App.tsx');
const outputDir = path.resolve(projectRoot, 'assets/recordings');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Helper to delay execution
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Helper to run shell commands safely
function runCmd(cmd) {
  try {
    return execSync(cmd, { stdio: 'pipe' }).toString().trim();
  } catch (err) {
    console.error(`Error executing command: ${cmd}`, err.message);
    return null;
  }
}

// 7 Category-level showcase configurations
const categories = [
  { name: 'Texts', tabIndex: 0 },
  { name: 'Views', tabIndex: 1 },
  { name: 'Backgrounds', tabIndex: 2 },
  { name: 'Transitions', tabIndex: 3 },
  { name: 'Gestures', tabIndex: 4 },
  { name: 'Decorations', tabIndex: 5 },
  { name: 'Charts', tabIndex: 6 }
];

// 83 Individual components configuration with custom JSX templates
const components = [
  // TEXTS
  { name: 'Typewriter', category: 'Texts', jsx: `<Typewriter text="Hello, Magic Animations!" style={styles.text} speed={60} />` },
  { name: 'Wave', category: 'Texts', jsx: `<Wave text="Magic Wave Effect" style={styles.text} />` },
  { name: 'Scramble', category: 'Texts', jsx: `<Scramble text="Antigravity" style={styles.text} duration={1500} />` },
  { name: 'Blink', category: 'Texts', jsx: `<Blink style={styles.text} interval={500}>Alert Blink</Blink>` },
  { name: 'Highlight', category: 'Texts', jsx: `<Highlight text="Highlighted Text" style={styles.text} color="#C8E6C9" />` },
  { name: 'Underline', category: 'Texts', jsx: `<Underline text="Animated Underline" style={styles.text} color="#81C784" />` },
  { name: 'Strike', category: 'Texts', jsx: `<Strike text="Strike Through Text" style={styles.text} color="#E57373" />` },
  { name: 'BounceIn', category: 'Texts', jsx: `<BounceIn text="Bounce In!" style={styles.text} />` },
  { name: 'FadeWord', category: 'Texts', jsx: `<FadeWord text="This is a fade word effect" style={styles.text} delay={200} />` },
  { name: 'RevealMask', category: 'Texts', jsx: `<RevealMask text="Revealed Text" style={styles.text} />` },
  { name: 'Counter', category: 'Texts', jsx: `<Counter to={250} style={styles.text} duration={1500} />` },
  { name: 'Sparkle', category: 'Texts', jsx: `<Sparkle text="Sparkling Star" style={styles.text} />` },
  { name: 'Shuffle', category: 'Texts', jsx: `<Shuffle text="Shuffling" style={styles.text} />` },
  { name: 'Marquee', category: 'Texts', jsx: `<Marquee text="Continuous scrolling message marquee" style={styles.text} speed={1} />` },
  { name: 'Rotator', category: 'Texts', jsx: `<Rotator words={["Magic", "Beautiful", "Powerful", "Smooth"]} style={styles.text} />` },
  { name: 'Decode', category: 'Texts', jsx: `<Decode text="Decoded Message" style={styles.text} />` },
  { name: 'Capitalize', category: 'Texts', jsx: `<Capitalize text="capitalize me please" style={styles.text} />` },
  { name: 'Glitch', category: 'Texts', jsx: `<Glitch text="GLITCH ERROR" style={styles.text} />` },
  { name: 'Neon', category: 'Texts', jsx: `<Neon text="NEON GLOW" style={{ fontSize: 24, fontWeight: '600', color: '#2E3A31' }} color="#4CAF50" glowRadius={15} />` },

  // VIEWS
  { name: 'Breathe', category: 'Views', jsx: `<Breathe minScale={0.9} maxScale={1.1} duration={1500}><View style={[styles.box, { backgroundColor: '#A8E6CF' }]}><Text style={styles.boxText}>Breathe</Text></View></Breathe>` },
  { name: 'Float', category: 'Views', jsx: `<Float duration={2000}><View style={[styles.box, { backgroundColor: '#D4F1F4' }]}><Text style={styles.boxText}>Float</Text></View></Float>` },
  { name: 'FadeIn', category: 'Views', jsx: `<FadeIn duration={1000}><View style={[styles.box, { backgroundColor: '#FFD3B6' }]}><Text style={styles.boxText}>Fade In</Text></View></FadeIn>` },
  { name: 'ThanosSnap', category: 'Views', jsx: `<ThanosSnapWrapper />` },
  { name: 'Shatter', category: 'Views', jsx: `<ShatterWrapper />` },
  { name: 'PaperPlane', category: 'Views', jsx: `<PaperPlaneWrapper />` },
  { name: 'FireBurn', category: 'Views', jsx: `<FireBurn><View style={[styles.box, { backgroundColor: '#FF7043' }]}><Text style={styles.boxText}>On Fire</Text></View></FireBurn>` },
  { name: 'TearReveal', category: 'Views', jsx: `<TearReveal><View style={[styles.box, { backgroundColor: '#EC407A', width: 150 }]}><Text style={styles.boxText}>Torn Page</Text></View></TearReveal>` },
  { name: 'Pop', category: 'Views', jsx: `<Pop><View style={[styles.box, { backgroundColor: '#AB47BC' }]}><Text style={styles.boxText}>Pop!</Text></View></Pop>` },
  { name: 'Drop', category: 'Views', jsx: `<Drop><View style={[styles.box, { backgroundColor: '#26A69A' }]}><Text style={styles.boxText}>Drop</Text></View></Drop>` },
  { name: 'Spin', category: 'Views', jsx: `<Spin duration={3000}><View style={[styles.box, { backgroundColor: '#FFA726', borderRadius: 40, width: 80, height: 80 }]}><Text style={styles.boxText}>Spin</Text></View></Spin>` },
  { name: 'Tilt', category: 'Views', jsx: `<Tilt angle={15} duration={1500}><View style={[styles.box, { backgroundColor: '#78909C' }]}><Text style={styles.boxText}>Tilt</Text></View></Tilt>` },
  { name: 'Wobble', category: 'Views', jsx: `<Wobble><View style={[styles.box, { backgroundColor: '#8D6E63' }]}><Text style={styles.boxText}>Wobble</Text></View></Wobble>` },
  { name: 'JellyPress', category: 'Views', jsx: `<JellyPress><View style={[styles.box, { backgroundColor: '#26C6DA' }]}><Text style={styles.boxText}>Jelly</Text></View></JellyPress>` },
  { name: 'Magnetic', category: 'Views', jsx: `<Magnetic strength={0.4}><View style={[styles.box, { backgroundColor: '#5C6BC0', borderRadius: 40, width: 80, height: 80 }]}><Text style={styles.boxText}>Magnet</Text></View></Magnetic>` },
  { name: 'Shake', category: 'Views', jsx: `<Shake><View style={[styles.box, { backgroundColor: '#EF5350' }]}><Text style={styles.boxText}>Shake</Text></View></Shake>` },
  { name: 'Wiggle', category: 'Views', jsx: `<Wiggle><View style={[styles.box, { backgroundColor: '#D4E157' }]}><Text style={[styles.boxText, { color: '#33691E' }]}>Wiggle</Text></View></Wiggle>` },
  { name: 'Pulse', category: 'Views', jsx: `<Pulse color="#FFCA28" duration={1400}><View style={[styles.box, { backgroundColor: '#FFCA28' }]}><Text style={[styles.boxText, { color: '#5D4037' }]}>Pulse</Text></View></Pulse>` },
  { name: 'RubberBand', category: 'Views', jsx: `<RubberBand><View style={[styles.box, { backgroundColor: '#9CCC65' }]}><Text style={[styles.boxText, { color: '#1B5E20' }]}>Rubber</Text></View></RubberBand>` },
  { name: 'Heart', category: 'Views', jsx: `<Heart beating={true} bpm={72}><View style={[styles.box, { backgroundColor: '#F48FB1', width: 60, height: 60, borderRadius: 30 }]}><Text style={styles.boxText}>❤️</Text></View></Heart>` },
  { name: 'Flash', category: 'Views', jsx: `<FlashWrapper />` },
  { name: 'Glow', category: 'Views', jsx: `<Glow color="#4CAF50" intensity={1.2}><View style={[styles.box, { backgroundColor: '#E8F5E9' }]}><Text style={[styles.boxText, { color: '#2E7D32' }]}>Glowing</Text></View></Glow>` },
  { name: 'Sparkles', category: 'Views', jsx: `<Sparkles count={8} colors={['#FFD54F', '#FF7043', '#4CAF50']}><View style={[styles.box, { backgroundColor: '#7E57C2' }]}><Text style={styles.boxText}>Sparkle</Text></View></Sparkles>` },
  { name: 'Stamp', category: 'Views', jsx: `<Stamp><View style={[styles.box, { backgroundColor: '#8D6E63', transform: [{ rotate: '-5deg' }] }]}><Text style={styles.boxText}>APPROVED</Text></View></Stamp>` },
  { name: 'Ripple', category: 'Views', jsx: `<Ripple color="rgba(76,175,80,0.4)" duration={800}><View style={[styles.box, { backgroundColor: '#81C784', width: 150, height: 60 }]}><Text style={styles.boxText}>Ripple</Text></View></Ripple>` },
  { name: 'FlipCard', category: 'Views', jsx: `<FlipCardWrapper />` },
  { name: 'Tilt3D', category: 'Views', jsx: `<Tilt3D maxTilt={15}><View style={[styles.box, { backgroundColor: '#95A5A6', width: 140, height: 80 }]}><Text style={styles.boxText}>Drag Me 3D</Text></View></Tilt3D>` },

  // BACKGROUNDS
  { name: 'Aurora', category: 'Backgrounds', jsx: `<Aurora style={styles.backgroundContainer}><Text style={styles.overlayText}>Aurora Lights</Text></Aurora>` },
  { name: 'GradientShift', category: 'Backgrounds', jsx: `<GradientShift style={styles.backgroundContainer} colors={['#A8E6CF', '#DCEDC8', '#FFD3B6', '#A8E6CF']}><Text style={styles.overlayText}>Shifted Colors</Text></GradientShift>` },
  { name: 'Stars', category: 'Backgrounds', jsx: `<Stars style={[styles.backgroundContainer, { backgroundColor: '#1A237E' }]} density={50}><Text style={styles.overlayTextLight}>Starry Night</Text></Stars>` },
  { name: 'Snow', category: 'Backgrounds', jsx: `<Snow style={[styles.backgroundContainer, { backgroundColor: '#ECEFF1' }]}><Text style={[styles.overlayText, { color: '#455A64' }]}>Winter Snow</Text></Snow>` },
  { name: 'Rain', category: 'Backgrounds', jsx: `<Rain style={[styles.backgroundContainer, { backgroundColor: '#37474F' }]} drops={40}><Text style={styles.overlayTextLight}>Rainy Storm</Text></Rain>` },
  { name: 'Bubbles', category: 'Backgrounds', jsx: `<Bubbles style={[styles.backgroundContainer, { backgroundColor: '#E0F7FA' }]}><Text style={[styles.overlayText, { color: '#006064' }]}>Soap Bubbles</Text></Bubbles>` },
  { name: 'Fireflies', category: 'Backgrounds', jsx: `<Fireflies style={[styles.backgroundContainer, { backgroundColor: '#212121' }]}><Text style={styles.overlayTextLight}>Firefly Night</Text></Fireflies>` },
  { name: 'Waves', category: 'Backgrounds', jsx: `<Waves style={[styles.backgroundContainer, { backgroundColor: '#E0F2F1' }]}><Text style={[styles.overlayText, { color: '#004D40' }]}>Ocean Waves</Text></Waves>` },
  { name: 'MatrixRain', category: 'Backgrounds', jsx: `<MatrixRain style={[styles.backgroundContainer, { backgroundColor: '#000000' }]}><Text style={[styles.overlayTextLight, { color: '#00FF00', fontWeight: 'bold' }]}>Digital Matrix</Text></MatrixRain>` },

  // TRANSITIONS
  { name: 'CrossFade', category: 'Transitions', jsx: `<CrossFadeWrapper />` },
  { name: 'Zoom', category: 'Transitions', jsx: `<ZoomWrapper />` },
  { name: 'Iris', category: 'Transitions', jsx: `<IrisWrapper />` },
  { name: 'Curtain', category: 'Transitions', jsx: `<CurtainWrapper />` },
  { name: 'Pixelate', category: 'Transitions', jsx: `<PixelateWrapper />` },
  { name: 'Vortex', category: 'Transitions', jsx: `<VortexWrapper />` },
  { name: 'Materialize', category: 'Transitions', jsx: `<MaterializeWrapper />` },
  { name: 'Mosaic', category: 'Transitions', jsx: `<MosaicWrapper />` },

  // GESTURES
  { name: 'TapFeedback', category: 'Gestures', jsx: `<TapFeedback><View style={[styles.box, { backgroundColor: '#81C784', width: 150 }]}><Text style={styles.boxText}>Tap Me</Text></View></TapFeedback>` },
  { name: 'LongPressGrow', category: 'Gestures', jsx: `<LongPressGrow growScale={1.3}><View style={[styles.box, { backgroundColor: '#4DB6AC', width: 150 }]}><Text style={styles.boxText}>Hold Me</Text></View></LongPressGrow>` },
  { name: 'DoubleTapHeart', category: 'Gestures', jsx: `<DoubleTapHeart heartSize={80} heartColor="#EF5350" style={styles.heartTapArea}><View style={styles.heartTapContent}><Text style={styles.tapTip}>Double Tap ♥</Text></View></DoubleTapHeart>` },
  { name: 'SwipeReveal', category: 'Gestures', jsx: `<SwipeReveal actions={[{label: 'Delete', color: '#EF5350', onPress: () => {}}]} actionWidth={80} style={styles.swipeWrapper}><View style={styles.swipeRowContent}><Text style={styles.swipeText}>← Swipe Left</Text></View></SwipeReveal>` },

  // DECORATIONS
  { name: 'Check', category: 'Decorations', jsx: `<Check size={60} color="#4CAF50" />` },
  { name: 'Cross', category: 'Decorations', jsx: `<Cross size={60} color="#F44336" />` },
  { name: 'Star', category: 'Decorations', jsx: `<Star size={60} color="#FFC107" />` },
  { name: 'Badge', category: 'Decorations', jsx: `<View style={styles.iconBlock}><Text style={styles.iconPlaceholder}>Inbox</Text><Badge value="9+" style={styles.badge} /></View>` },
  { name: 'Notification', category: 'Decorations', jsx: `<Notification ringing={true} amount={12}><Text style={{ fontSize: 36 }}>🔔</Text></Notification>` },
  { name: 'Confetti', category: 'Decorations', jsx: `<ConfettiWrapper />` },
  { name: 'Coins', category: 'Decorations', jsx: `<CoinsWrapper />` },
  { name: 'LikeButton', category: 'Decorations', jsx: `<LikeButtonWrapper />` },
  { name: 'EmojiBurst', category: 'Decorations', jsx: `<EmojiBurstWrapper />` },
  { name: 'RatingStars', category: 'Decorations', jsx: `<RatingStars value={4} size={36} activeColor="#FFCA28" />` },

  // CHARTS
  { name: 'ProgressRing', category: 'Charts', jsx: `<ProgressRing value={0.75} size={120} strokeWidth={12} color="#4CAF50" trackColor="#E8F5E9"><Text style={styles.ringText}>75%</Text></ProgressRing>` },
  { name: 'AnimatedBar', category: 'Charts', jsx: `<View style={styles.fullWidth}><AnimatedBar value={0.75} height={16} color="#81C784" /></View>` },
  { name: 'Sparkline', category: 'Charts', jsx: `<Sparkline data={[10, 40, 25, 75, 55, 90, 60, 95]} width={250} height={60} color="#388E3C" strokeWidth={3} />` },
  { name: 'LineChart', category: 'Charts', jsx: `<LineChart data={[10, 40, 25, 75, 55, 90, 60, 95]} width={280} height={140} color="#4CAF50" strokeWidth={4} />` },
  { name: 'BarChart', category: 'Charts', jsx: `<BarChart data={[20, 60, 45, 80, 50, 100]} width={280} height={140} color="#66BB6A" gap={12} stagger={80} radius={6} />` },
  { name: 'Gauge', category: 'Charts', jsx: `<Gauge value={0.75} size={140} strokeWidth={14} color="#4CAF50" trackColor="#E8F5E9" />` }
];

// Generate the ActiveRecording.tsx file contents dynamically
function generateActiveRecordingCode(component) {
  return `import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
  Breathe,
  Float,
  FadeIn,
  ThanosSnap,
  Shatter,
  PaperPlane,
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
  Aurora,
  GradientShift,
  Stars,
  Snow,
  Rain,
  Bubbles,
  Fireflies,
  Waves,
  MatrixRain,
  CrossFade,
  Zoom,
  Iris,
  Curtain,
  Pixelate,
  Vortex,
  Materialize,
  Mosaic,
  TapFeedback,
  LongPressGrow,
  DoubleTapHeart,
  SwipeReveal,
  Check,
  Cross,
  Star,
  Badge,
  Notification,
  Confetti,
  Coins,
  LikeButton,
  EmojiBurst,
  RatingStars,
  ProgressRing,
  AnimatedBar,
  Sparkline,
  LineChart,
  BarChart,
  Gauge
} from 'react-native-magic-animations';

// Wrappers for interactive components to run them in auto-loops
function ThanosSnapWrapper() {
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setTrigger(true);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <ThanosSnap trigger={trigger} onDone={() => setTrigger(false)} duration={1800}>
      <View style={[styles.box, { backgroundColor: '#757575', width: 120, height: 60 }]}>
        <Text style={styles.boxText}>Disintegrating</Text>
      </View>
    </ThanosSnap>
  );
}

function ShatterWrapper() {
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setTrigger(true);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Shatter trigger={trigger} onDone={() => setTrigger(false)} duration={1200}>
      <View style={[styles.box, { backgroundColor: '#42A5F5', width: 120, height: 60 }]}>
        <Text style={styles.boxText}>Glass View</Text>
      </View>
    </Shatter>
  );
}

function PaperPlaneWrapper() {
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setTrigger(true);
    }, 3500);
    return () => clearInterval(timer);
  }, []);
  return (
    <PaperPlane trigger={trigger} onDone={() => setTrigger(false)}>
      <View style={[styles.box, { backgroundColor: '#FFF59D', width: 100, height: 60 }]}>
        <Text style={[styles.boxText, { color: '#5D4037' }]}>Paper Plane</Text>
      </View>
    </PaperPlane>
  );
}

function FlashWrapper() {
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setTrigger(true);
      setTimeout(() => setTrigger(false), 200);
    }, 2000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Flash trigger={trigger}>
      <View style={[styles.box, { backgroundColor: '#26A69A' }]}>
        <Text style={styles.boxText}>Flash</Text>
      </View>
    </Flash>
  );
}

function FlipCardWrapper() {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setFlipped(f => !f);
    }, 2500);
    return () => clearInterval(timer);
  }, []);
  return (
    <FlipCard
      flipped={flipped}
      front={<View style={[styles.box, { backgroundColor: '#80CBC4', width: 140, height: 80 }]}><Text style={styles.boxText}>Front Side</Text></View>}
      back={<View style={[styles.box, { backgroundColor: '#00897B', width: 140, height: 80 }]}><Text style={styles.boxText}>Back Side</Text></View>}
    />
  );
}

function CrossFadeWrapper() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => setShow(s => !s), 2000);
    return () => clearInterval(timer);
  }, []);
  return (
    <CrossFade show={show} duration={600}>
      <View style={[styles.box, { backgroundColor: '#81C784', width: 150 }]}><Text style={styles.boxText}>Cross Fade</Text></View>
    </CrossFade>
  );
}

function ZoomWrapper() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => setShow(s => !s), 2000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Zoom show={show} duration={500}>
      <View style={[styles.box, { backgroundColor: '#4DB6AC', width: 150 }]}><Text style={styles.boxText}>Zooming</Text></View>
    </Zoom>
  );
}

function IrisWrapper() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => setShow(s => !s), 2000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Iris show={show} duration={650}>
      <View style={[styles.box, { backgroundColor: '#FFB74D', width: 150 }]}><Text style={styles.boxText}>Iris Lens</Text></View>
    </Iris>
  );
}

function CurtainWrapper() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => setShow(s => !s), 2000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Curtain show={show} duration={600}>
      <View style={[styles.box, { backgroundColor: '#BA68C8', width: 150 }]}><Text style={styles.boxText}>Curtain</Text></View>
    </Curtain>
  );
}

function PixelateWrapper() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => setShow(s => !s), 2000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Pixelate show={show} duration={800}>
      <View style={[styles.box, { backgroundColor: '#4DD0E1', width: 150 }]}><Text style={styles.boxText}>Pixelized</Text></View>
    </Pixelate>
  );
}

function VortexWrapper() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => setShow(s => !s), 2000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Vortex show={show} duration={700}>
      <View style={[styles.box, { backgroundColor: '#FF8A65', width: 150 }]}><Text style={styles.boxText}>Vortex Spin</Text></View>
    </Vortex>
  );
}

function MaterializeWrapper() {
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setTrigger(true);
    }, 3500);
    return () => clearInterval(timer);
  }, []);
  return (
    <Materialize trigger={trigger} duration={1800} onDone={() => setTrigger(false)}>
      <View style={[styles.box, { backgroundColor: '#90A4AE', width: 150 }]}><Text style={styles.boxText}>Materialize</Text></View>
    </Materialize>
  );
}

function MosaicWrapper() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => setShow(s => !s), 2000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Mosaic show={show} duration={850}>
      <View style={[styles.box, { backgroundColor: '#9CCC65', width: 150 }]}><Text style={styles.boxText}>Grid Mosaic</Text></View>
    </Mosaic>
  );
}

function ConfettiWrapper() {
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setTrigger(true);
    }, 3500);
    return () => clearInterval(timer);
  }, []);
  return (
    <Confetti trigger={trigger} onDone={() => setTrigger(false)} pieces={40} style={styles.fullWidthContainer}>
      <View style={styles.confettiTarget}><Text style={styles.confettiText}>Celebration</Text></View>
    </Confetti>
  );
}

function CoinsWrapper() {
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setTrigger(true);
    }, 3500);
    return () => clearInterval(timer);
  }, []);
  return (
    <Coins trigger={trigger} onDone={() => setTrigger(false)} count={20} style={styles.fullWidthContainer}>
      <View style={styles.coinsTarget}><Text style={styles.coinsText}>Coin Rain</Text></View>
    </Coins>
  );
}

function LikeButtonWrapper() {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => setLiked(l => !l), 2000);
    return () => clearInterval(timer);
  }, []);
  return <LikeButton liked={liked} onToggle={() => {}} size={50} color="#EF5350" />;
}

function EmojiBurstWrapper() {
  const [trigger, setEmojiTrigger] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setEmojiTrigger(true);
    }, 3500);
    return () => clearInterval(timer);
  }, []);
  return (
    <EmojiBurst trigger={trigger} onDone={() => setEmojiTrigger(false)} emojis={['🔥', '🎉', '🚀']} count={12} style={styles.fullWidthContainer}>
      <View style={styles.emojiTarget}><Text style={styles.emojiText}>Emoji Burst</Text></View>
    </EmojiBurst>
  );
}

export default function ActiveRecording() {
  const shouldReset = ${['typewriter', 'scramble', 'bouncein', 'fadeword', 'revealmask', 'decode', 'shuffle', 'capitalize', 'highlight', 'underline', 'strike', 'check', 'cross', 'progressring', 'animatedbar', 'sparkline', 'linechart', 'barchart', 'gauge'].includes(component.name.toLowerCase())};
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (!shouldReset) return;
    const timer = setInterval(() => {
      setKey(k => k + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.showcaseWrapper} key={key}>
        ${component.jsx}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  showcaseWrapper: {
    padding: 24,
    borderWidth: 1,
    borderColor: '#E8F5E9',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 280,
    minHeight: 160,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E3A31',
    textAlign: 'center',
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
  backgroundContainer: {
    width: 300,
    height: 180,
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
  heartTapArea: {
    width: 280,
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
  swipeWrapper: {
    width: 280,
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
    width: 280,
    height: 120,
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
  ringText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  fullWidth: {
    width: 250,
    paddingVertical: 10,
  }
});
`;
}

// Enable or disable Recording Mode in App.tsx
function toggleRecordingMode(enabled) {
  let content = fs.readFileSync(appConfigPath, 'utf8');
  content = content.replace(
    /const RECORDING_MODE = (true|false);/,
    `const RECORDING_MODE = ${enabled};`
  );
  fs.writeFileSync(appConfigPath, content, 'utf8');
  // Wait a small bit for Metro to detect change
  runCmd('sleep 1');
}

// Re-order Tab screens to set target category as first tab
function setTabAsFirst(categoryName) {
  let content = fs.readFileSync(appConfigPath, 'utf8');
  
  // Regex to extract all Tab.Screen elements
  const tabScreensRegex = /<Tab\.Screen[^>]+name="([^"]+)"[^>]*\/>/g;
  const screens = [];
  let match;
  while ((match = tabScreensRegex.exec(content)) !== null) {
    screens.push(match[0]);
  }

  // Find the screen we want to put first
  const targetIndex = screens.findIndex(s => s.includes(`name="${categoryName}"`));
  if (targetIndex !== -1) {
    const targetScreen = screens[targetIndex];
    screens.splice(targetIndex, 1);
    screens.unshift(targetScreen);

    const tabScreensText = screens.join('\n            ');
    content = content.replace(/<Tab\.Navigator[\s\S]+?<\/Tab\.Navigator>/, `<Tab.Navigator
            screenOptions={{
              tabBarScrollEnabled: true,
              tabBarActiveTintColor: '#1B5E20',
              tabBarInactiveTintColor: '#81C784',
              tabBarIndicatorStyle: { 
                backgroundColor: '#4CAF50', 
                height: 3,
                borderRadius: 3,
              }
            }}
          >
            ${tabScreensText}
          </Tab.Navigator>`);
    fs.writeFileSync(appConfigPath, content, 'utf8');
    runCmd('sleep 1.5');
  }
}

// Helper to get crop filter based on output filename
function getFfmpegFilter(filename) {
  const isShowcase = filename.startsWith('showcase_');
  const cropStr = isShowcase ? 'crop=360:600:0:140' : 'crop=360:320:0:230';
  return `fps=15,scale=360:-1:flags=lanczos,${cropStr},split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`;
}

// Record a video and convert to high-quality GIF
async function recordAndConvert(filename, durationSec, isInteractive = false) {
  console.log(`Starting simulator recording: ${filename}.mp4 (${durationSec}s)`);
  
  const tempMp4 = path.resolve('/tmp', `${filename}.mp4`);
  const outputGif = path.resolve(outputDir, `${filename}.gif`);

  // Start simctl recording in background using spawn
  const recordProcess = spawn('xcrun', ['simctl', 'io', 'booted', 'recordVideo', '--force', tempMp4], {
    stdio: 'ignore'
  });

  // If interactive (like swipe or double tap), perform action mid-recording
  if (isInteractive) {
    await delay(1200);
    if (filename.includes('ripple') || filename.includes('jellypress') || filename.includes('tapfeedback')) {
      console.log('Simulating tap...');
      runCmd("osascript -e 'tell application \"System Events\" to tell process \"Simulator\" to tell window 1 to click at {150, 200}'");
    } else if (filename.includes('doubletapheart')) {
      console.log('Simulating double tap...');
      runCmd("osascript -e 'tell application \"System Events\" to tell process \"Simulator\" to tell window 1 to click at {150, 200}'");
      await delay(150);
      runCmd("osascript -e 'tell application \"System Events\" to tell process \"Simulator\" to tell window 1 to click at {150, 200}'");
    } else if (filename.includes('swipereveal')) {
      console.log('Simulating swipe reveal...');
    }
  }

  // Wait for recording duration
  await delay(durationSec * 1000);

  // Kill the simctl recording process to finish recording
  try {
    recordProcess.kill('SIGINT');
  } catch (e) {
    // Already exited
  }

  // Wait for file lock release and file creation
  await delay(2000);

  // Convert to high-quality, lightweight GIF
  console.log(`Converting ${filename}.mp4 to optimized GIF using ffmpeg...`);
  const filter = getFfmpegFilter(filename);
  runCmd(`ffmpeg -y -i "${tempMp4}" -vf "${filter}" "${outputGif}"`);
  
  // Clean up mp4
  if (fs.existsSync(tempMp4)) {
    fs.unlinkSync(tempMp4);
  }
  console.log(`Saved: ${outputGif}`);
}

async function main() {
  console.log('--- STARTING ANIMATION AUTOMATED RECORDER ---');
  
  // Ensure we are booted and app is listening
  runCmd('open -a Simulator');
  await delay(2000);

  // 1. Record the 7 category showcases
  console.log('\n--- PHASE 1: RECORDING CATEGORY SHOWCASES ---');
  toggleRecordingMode(false);
  
  for (const cat of categories) {
    console.log(`Recording showcase for Category: ${cat.name}`);
    
    // Set this category as the first tab in App.tsx to display it
    setTabAsFirst(cat.name);
    
    // Let the screen render and settle
    await delay(3000);

    // Record the scrolling showcase (starts automatically and scroll simulation)
    const recordFilename = `showcase_${cat.name.toLowerCase()}`;
    
    // Start recording for 8 seconds
    console.log(`Starting recording for category: ${cat.name}`);
    const tempMp4 = path.resolve('/tmp', `${recordFilename}.mp4`);
    const outputGif = path.resolve(outputDir, `${recordFilename}.gif`);

    const recordProcess = spawn('xcrun', ['simctl', 'io', 'booted', 'recordVideo', '--force', tempMp4], {
      stdio: 'ignore'
    });

    // Scroll down after 2.5 seconds to show off more animations using AppleScript down arrow
    await delay(2500);
    console.log('Simulating scroll (Down Arrow)...');
    runCmd("osascript -e 'tell application \"Simulator\" to activate' -e 'tell application \"System Events\" to key code 125'");
    await delay(2500);
    runCmd("osascript -e 'tell application \"Simulator\" to activate' -e 'tell application \"System Events\" to key code 125'");
    await delay(3000);

    // Stop recording
    try {
      recordProcess.kill('SIGINT');
    } catch (e) {}

    await delay(2000);
    const filter = getFfmpegFilter(recordFilename);
    runCmd(`ffmpeg -y -i "${tempMp4}" -vf "${filter}" "${outputGif}"`);
    if (fs.existsSync(tempMp4)) {
      fs.unlinkSync(tempMp4);
    }
    console.log(`Saved Category Showcase: ${outputGif}`);
  }

  // 2. Record individual components
  console.log('\n--- PHASE 2: RECORDING INDIVIDUAL COMPONENTS ---');
  toggleRecordingMode(true);

  for (const comp of components) {
    console.log(`\nRecording Component: ${comp.name} (${comp.category})`);
    
    // Write component code to ActiveRecording.tsx
    const code = generateActiveRecordingCode(comp);
    fs.writeFileSync(activeRecordingPath, code, 'utf8');
    
    // Let Metro Fast Refresh reload and display
    await delay(2000);

    // Determine recording duration and interaction requirements
    const isInteractive = ['ripple', 'jellypress', 'tapfeedback', 'doubletapheart', 'swipereveal'].includes(comp.name.toLowerCase());
    const duration = isInteractive ? 4.5 : 3.5;

    await recordAndConvert(`comp_${comp.name.toLowerCase()}`, duration, isInteractive);
  }

  // Restore normal app state
  toggleRecordingMode(false);
  console.log('\n--- RECORDING COMPLETED SUCCESSFULLY ---');
}

main().catch(err => {
  console.error('Recording script failed:', err);
  toggleRecordingMode(false);
});
