import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { ShowcaseCard } from '../components/ShowcaseCard';
import {
  CrossFade,
  Zoom,
  Iris,
  Curtain,
  Pixelate,
  Vortex,
  Materialize,
  Mosaic,
} from 'react-native-magic-animations';

export function TransitionsScreen() {
  const [showCrossFade, setShowCrossFade] = useState(true);
  const [showZoom, setShowZoom] = useState(true);
  const [showIris, setShowIris] = useState(true);
  const [showCurtain, setShowCurtain] = useState(true);
  const [showPixelate, setShowPixelate] = useState(true);
  const [showVortex, setShowVortex] = useState(true);
  const [materializeTrigger, setMaterializeTrigger] = useState(false);
  const [showMosaic, setShowMosaic] = useState(true);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setShowCrossFade(prev => !prev);
      setShowZoom(prev => !prev);
      setShowIris(prev => !prev);
      setShowCurtain(prev => !prev);
      setShowPixelate(prev => !prev);
      setShowVortex(prev => !prev);
      setMaterializeTrigger(true);
      setShowMosaic(prev => !prev);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const renderContent = (label: string, color: string) => (
    <View style={[styles.box, { backgroundColor: color }]}>
      <Text style={styles.boxText}>{label}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ShowcaseCard 
        title="CrossFade" 
        description="Fades elements in and out smoothly"
        actionButton={<Button title="Toggle" color="#2E7D32" onPress={() => setShowCrossFade(prev => !prev)} />}
      >
        <CrossFade show={showCrossFade} duration={600} style={styles.transitionContainer}>
          {renderContent('Hello World', '#81C784')}
        </CrossFade>
      </ShowcaseCard>

      <ShowcaseCard 
        title="Zoom" 
        description="Scales elements in and out"
        actionButton={<Button title="Toggle" color="#2E7D32" onPress={() => setShowZoom(prev => !prev)} />}
      >
        <Zoom show={showZoom} duration={500} style={styles.transitionContainer}>
          {renderContent('Zooming Content', '#4DB6AC')}
        </Zoom>
      </ShowcaseCard>

      <ShowcaseCard 
        title="Iris" 
        description="Circular lens iris transition"
        actionButton={<Button title="Toggle" color="#2E7D32" onPress={() => setShowIris(prev => !prev)} />}
      >
        <Iris show={showIris} duration={600} origin={{ x: 0.5, y: 0.5 }} style={styles.transitionContainer}>
          {renderContent('Iris Lens', '#FFB74D')}
        </Iris>
      </ShowcaseCard>

      <ShowcaseCard 
        title="Curtain" 
        description="Sliding split curtain transition"
        actionButton={<Button title="Toggle" color="#2E7D32" onPress={() => setShowCurtain(prev => !prev)} />}
      >
        <Curtain show={showCurtain} duration={600} style={styles.transitionContainer}>
          {renderContent('Curtain Open', '#BA68C8')}
        </Curtain>
      </ShowcaseCard>

      <ShowcaseCard 
        title="Pixelate" 
        description="Dissolves view using low-res pixelating block animation"
        actionButton={<Button title="Toggle" color="#2E7D32" onPress={() => setShowPixelate(prev => !prev)} />}
      >
        <Pixelate show={showPixelate} duration={800} style={styles.transitionContainer}>
          {renderContent('Pixelized', '#4DD0E1')}
        </Pixelate>
      </ShowcaseCard>

      <ShowcaseCard 
        title="Vortex" 
        description="Spins and swirls elements into view"
        actionButton={<Button title="Toggle" color="#2E7D32" onPress={() => setShowVortex(prev => !prev)} />}
      >
        <Vortex show={showVortex} duration={700} style={styles.transitionContainer}>
          {renderContent('Vortex Spin', '#FF8A65')}
        </Vortex>
      </ShowcaseCard>

      <ShowcaseCard 
        title="Materialize" 
        description="Particle assembly transition"
        actionButton={<Button title="Trigger" color="#2E7D32" onPress={() => {
          setMaterializeTrigger(false);
          setTimeout(() => setMaterializeTrigger(true), 50);
        }} />}
      >
        <Materialize trigger={materializeTrigger} duration={1800} onDone={() => setMaterializeTrigger(false)} style={styles.transitionContainer}>
          {renderContent('Materialized', '#90A4AE')}
        </Materialize>
      </ShowcaseCard>

      <ShowcaseCard 
        title="Mosaic" 
        description="Random grid mosaic blocks fade and scaling transition"
        actionButton={<Button title="Toggle" color="#2E7D32" onPress={() => setShowMosaic(prev => !prev)} />}
      >
        <Mosaic show={showMosaic} duration={850} style={styles.transitionContainer}>
          {renderContent('Grid Mosaic', '#9CCC65')}
        </Mosaic>
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
  transitionContainer: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 200,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
