import React, { useState, useEffect } from 'react';
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
  const shouldReset = true;
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
        <Typewriter text="Hello, Magic Animations!" style={styles.text} speed={60} />
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
