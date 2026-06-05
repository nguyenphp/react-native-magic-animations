<p align="center">
  <img src="./assets/logo.png" width="280" alt="react-native-magic-animations" />
</p>

<h1 align="center">react-native-magic-animations</h1>

<p align="center">
  Magical, high-performance animations for React Native — just wrap and go.
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/react-native-magic-animations?color=86EFAC&style=flat-square" />
  <img src="https://img.shields.io/npm/dm/react-native-magic-animations?color=A7F3D0&style=flat-square" />
  <img src="https://img.shields.io/github/license/nguyenphp/react-native-magic-animations?color=6EE7B7&style=flat-square" />
</p>

<p align="center">
  <strong>80+ animations</strong> across text, view, background, in/out transitions, gestures, decorations, and charts — all 60fps via Reanimated 3.
</p>

---

## Installation

```bash
npm install react-native-magic-animations
```

### Peer dependencies

```bash
npm install react-native-reanimated react-native-svg
```

> Follow the [react-native-reanimated install guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started) for native setup.

---

## Quick start

```jsx
import { Typewriter, Magnetic, JellyPress, Confetti, Aurora } from 'react-native-magic-animations'

<Aurora style={{ flex: 1 }}>
  <Typewriter text="Welcome ✨" speed={50} />
  <Magnetic>
    <JellyPress onPress={celebrate}>
      <Button title="Tap me" />
    </JellyPress>
  </Magnetic>
  <Confetti trigger={paid} pieces={120} />
</Aurora>
```

---

## Table of Contents

- [📝 Text](#-text)
- [🎁 View](#-view)
- [🌌 Background](#-background)
- [🚪 Transition (in/out)](#-transition-inout)
- [✋ Gesture](#-gesture)
- [🎉 Decoration](#-decoration)
- [📊 Charts](#-charts)

Each section is split by complexity: 🟢 simple · 🟡 medium · 🔴 complex.

---

## 📝 Text

<p align="center">
  <img src="./assets/recordings/showcase_texts.gif" width="360" alt="Texts Showcase" />
</p>

### 🟢 Simple

#### `<Typewriter />`
<img src="./assets/recordings/comp_typewriter.gif" width="360" alt="Typewriter" />

Types out text character by character.
```jsx
<Typewriter text="Hello World!" speed={50} onDone={() => {}} />
```

#### `<Wave />`
<img src="./assets/recordings/comp_wave.gif" width="360" alt="Wave" />

Each character bobs up and down in a wave.
```jsx
<Wave text="Magic!" amplitude={6} duration={400} />
```

#### `<Blink />`
<img src="./assets/recordings/comp_blink.gif" width="360" alt="Blink" />

Classic cursor blink — opacity loop.
```jsx
<Blink interval={530}>|</Blink>
```

#### `<Highlight />`
<img src="./assets/recordings/comp_highlight.gif" width="360" alt="Highlight" />

Marker highlight that grows across the text.
```jsx
<Highlight text="Important" color="#FDE68A" duration={600} />
```

#### `<Underline />`
<img src="./assets/recordings/comp_underline.gif" width="360" alt="Underline" />

Self-drawing underline.
```jsx
<Underline text="Click here" color="#10B981" thickness={2} />
```

#### `<Strike />`
<img src="./assets/recordings/comp_strike.gif" width="360" alt="Strike" />

Strikethrough line drawing across.
```jsx
<Strike text="$99" color="#EF4444" />
```

#### `<BounceIn />`
<img src="./assets/recordings/comp_bouncein.gif" width="360" alt="BounceIn" />

Per-character drop with spring bounce.
```jsx
<BounceIn text="Welcome" stagger={60} drop={30} />
```

#### `<FadeWord />`
<img src="./assets/recordings/comp_fadeword.gif" width="360" alt="FadeWord" />

Words fade in one by one.
```jsx
<FadeWord text="One word at a time" stagger={100} />
```

#### `<RevealMask />`
<img src="./assets/recordings/comp_revealmask.gif" width="360" alt="RevealMask" />

Text unmasked left to right via clip.
```jsx
<RevealMask text="Reveal" duration={700} />
```

### 🟡 Medium

#### `<Scramble />`
<img src="./assets/recordings/comp_scramble.gif" width="360" alt="Scramble" />

Random characters resolving into target text.
```jsx
<Scramble text="DECODED" duration={1200} />
```

#### `<Counter />`
<img src="./assets/recordings/comp_counter.gif" width="360" alt="Counter" />

Animated number with format support.
```jsx
<Counter from={0} to={12847} duration={1500} format={(n) => `$${n.toLocaleString()}`} />
```

#### `<Sparkle />`
<img src="./assets/recordings/comp_sparkle.gif" width="360" alt="Sparkle" />

Text with twinkling star particles around it.
```jsx
<Sparkle text="✨ AI Magic" colors={['#A78BFA','#60A5FA','#F472B6']} count={8} />
```

#### `<Shuffle />`
<img src="./assets/recordings/comp_shuffle.gif" width="360" alt="Shuffle" />

Characters shuffle from random positions into place.
```jsx
<Shuffle text="Welcome" stagger={40} scatter={80} />
```

#### `<Marquee />`
<img src="./assets/recordings/comp_marquee.gif" width="360" alt="Marquee" />

Infinite horizontal scroll ticker.
```jsx
<Marquee text="🔥 Sale ends tonight" speed={60} spacing={40} />
```

#### `<Rotator />`
<img src="./assets/recordings/comp_rotator.gif" width="360" alt="Rotator" />

Cycles through a list of words with slide+fade.
```jsx
<Rotator words={['code','coffee','RN']} interval={2000} />
```

#### `<Decode />`
<img src="./assets/recordings/comp_decode.gif" width="360" alt="Decode" />

Hacker-style decoding (Matrix charset).
```jsx
<Decode text="ACCESS GRANTED" charset="01ABCDEF" duration={1500} />
```

#### `<Capitalize />`
<img src="./assets/recordings/comp_capitalize.gif" width="360" alt="Capitalize" />

Each character pops up to uppercase in sequence.
```jsx
<Capitalize text="emphasis" stagger={80} />
```

### 🔴 Complex

#### `<Glitch />`
<img src="./assets/recordings/comp_glitch.gif" width="360" alt="Glitch" />

RGB split + offset for cyberpunk glitch.
```jsx
<Glitch text="SYSTEM ERROR" intensity={1} speed={80} />
```

#### `<Neon />`
<img src="./assets/recordings/comp_neon.gif" width="360" alt="Neon" />

Neon glow with realistic flicker.
```jsx
<Neon text="OPEN 24/7" color="#FF00E5" glowRadius={12} flicker />
```

---

## 🎁 View

<p align="center">
  <img src="./assets/recordings/showcase_views.gif" width="360" alt="Views Showcase" />
</p>

### 🟢 Simple

#### `<Breathe />`
<img src="./assets/recordings/comp_breathe.gif" width="360" alt="Breathe" />

Subtle pulsing scale.
```jsx
<Breathe minScale={0.97} maxScale={1.03}><Card /></Breathe>
```

#### `<Float />`
<img src="./assets/recordings/comp_float.gif" width="360" alt="Float" />

Continuous up/down float.
```jsx
<Float amplitude={8} duration={1800}><Logo /></Float>
```

#### `<FadeIn />`
<img src="./assets/recordings/comp_fadein.gif" width="360" alt="FadeIn" />

Mount-time fade + slide from direction.
```jsx
<FadeIn from="bottom" duration={500} delay={200}><Text /></FadeIn>
```

#### `<Pop />`
<img src="./assets/recordings/comp_pop.gif" width="360" alt="Pop" />

Scale-in with spring overshoot.
```jsx
<Pop delay={0}><Badge /></Pop>
```

#### `<Drop />`
<img src="./assets/recordings/comp_drop.gif" width="360" alt="Drop" />

Falls from above with spring bounce.
```jsx
<Drop height={40}><Toast /></Drop>
```

#### `<Spin />`
<img src="./assets/recordings/comp_spin.gif" width="360" alt="Spin" />

Continuous rotation.
```jsx
<Spin duration={2000} direction="cw"><RefreshIcon /></Spin>
```

#### `<Tilt />`
<img src="./assets/recordings/comp_tilt.gif" width="360" alt="Tilt" />

Continuous gentle tilt back-and-forth.
```jsx
<Tilt angle={3}><Icon /></Tilt>
```

#### `<Wobble />`
<img src="./assets/recordings/comp_wobble.gif" width="360" alt="Wobble" />

Quick wobble rotation on trigger.
```jsx
<Wobble trigger={error}><Input /></Wobble>
```

### 🟡 Medium

#### `<PaperPlane />`
<img src="./assets/recordings/comp_paperplane.gif" width="360" alt="PaperPlane" />

Paper-plane flight path animation.
```jsx
<PaperPlane trigger={sent} duration={1500}><MailIcon /></PaperPlane>
```

#### `<JellyPress />`
<img src="./assets/recordings/comp_jellypress.gif" width="360" alt="JellyPress" />

Squash & stretch on press — replaces TouchableOpacity.
```jsx
<JellyPress onPress={buy} amount={0.06}><Button /></JellyPress>
```

#### `<Magnetic />`
<img src="./assets/recordings/comp_magnetic.gif" width="360" alt="Magnetic" />

Component is attracted toward dragging finger.
```jsx
<Magnetic strength={0.4}><CTA /></Magnetic>
```

#### `<Shake />`
<img src="./assets/recordings/comp_shake.gif" width="360" alt="Shake" />

Horizontal shake for error feedback.
```jsx
<Shake trigger={loginFailed} amount={8}><TextInput /></Shake>
```

#### `<Wiggle />`
<img src="./assets/recordings/comp_wiggle.gif" width="360" alt="Wiggle" />

iOS edit-mode wiggle.
```jsx
<Wiggle active={editing}><AppIcon /></Wiggle>
```

#### `<Pulse />`
<img src="./assets/recordings/comp_pulse.gif" width="360" alt="Pulse" />

Pulsing ring around content (notification badge).
```jsx
<Pulse color="#EF4444"><LiveBadge /></Pulse>
```

#### `<RubberBand />`
<img src="./assets/recordings/comp_rubberband.gif" width="360" alt="RubberBand" />

Elastic scale stretch on trigger.
```jsx
<RubberBand trigger={pop}><Logo /></RubberBand>
```

#### `<Heart />`
<img src="./assets/recordings/comp_heart.gif" width="360" alt="Heart" />

Realistic heartbeat pulse with BPM control.
```jsx
<Heart beating bpm={72}><HeartIcon /></Heart>
```

#### `<Flash />`
<img src="./assets/recordings/comp_flash.gif" width="360" alt="Flash" />

Quick color flash overlay.
```jsx
<Flash trigger={photoTaken} color="#FFF"><Camera /></Flash>
```

#### `<Glow />`
<img src="./assets/recordings/comp_glow.gif" width="360" alt="Glow" />

Pulsing glow shadow.
```jsx
<Glow color="#60A5FA" intensity={1}><Card /></Glow>
```

#### `<Sparkles />`
<img src="./assets/recordings/comp_sparkles.gif" width="360" alt="Sparkles" />

Twinkling stars scattered around the content.
```jsx
<Sparkles count={14} colors={['#FDE68A','#F472B6','#A78BFA']}><Award /></Sparkles>
```

#### `<Stamp />`
<img src="./assets/recordings/comp_stamp.gif" width="360" alt="Stamp" />

"PAID/APPROVED" stamp slam with dust ring.
```jsx
<Stamp trigger={approved} text="PAID" color="#16A34A" />
```

#### `<Ripple />`
<img src="./assets/recordings/comp_ripple.gif" width="360" alt="Ripple" />

Material-style ripple from tap point (multi-touch).
```jsx
<Ripple color="rgba(255,255,255,0.45)" onPress={fn}><Tile /></Ripple>
```

#### `<FlipCard />`
<img src="./assets/recordings/comp_flipcard.gif" width="360" alt="FlipCard" />

3D card flip between front/back faces.
```jsx
<FlipCard flipped={open} front={<F />} back={<B />} axis="Y" />
```

### 🔴 Complex

#### `<ThanosSnap />`
<img src="./assets/recordings/comp_thanossnap.gif" width="360" alt="ThanosSnap" />

Cinematic disintegration with directional wipe.
```jsx
<ThanosSnap trigger={dismiss} direction="right" duration={1800}>
  <Card />
</ThanosSnap>
```

#### `<FireBurn />`
<img src="./assets/recordings/comp_fireburn.gif" width="360" alt="FireBurn" />

Flames burning at the base of content.
```jsx
<FireBurn intensity={1.2}><Item /></FireBurn>
```

#### `<TearReveal />`
<img src="./assets/recordings/comp_tearreveal.gif" width="360" alt="TearReveal" />

Drag-to-tear paper reveal interaction.
```jsx
<TearReveal direction="right" onTorn={fn}><Content /></TearReveal>
```

#### `<Tilt3D />`
<img src="./assets/recordings/comp_tilt3d.gif" width="360" alt="Tilt3D" />

3D parallax tilt that follows the drag, with optional glare.
```jsx
<Tilt3D maxTilt={15} perspective={1000} glare><Card /></Tilt3D>
```

#### `<Shatter />`
<img src="./assets/recordings/comp_shatter.gif" width="360" alt="Shatter" />

Breaks content into shards that fall with gravity.
```jsx
<Shatter trigger={broken} shards={24} gravity={1}><Glass /></Shatter>
```

---

## 🌌 Background

<p align="center">
  <img src="./assets/recordings/showcase_backgrounds.gif" width="360" alt="Backgrounds Showcase" />
</p>

### 🟢 Simple

#### `<GradientShift />`
<img src="./assets/recordings/comp_gradientshift.gif" width="360" alt="GradientShift" />

Background color interpolates through a color palette.
```jsx
<GradientShift colors={['#FBCFE8','#C7D2FE','#A7F3D0']} speed={4000}>
  <App />
</GradientShift>
```

### 🟡 Medium

#### `<Aurora />`
<img src="./assets/recordings/comp_aurora.gif" width="360" alt="Aurora" />

Pastel gradient blobs drifting — iOS 16 wallpaper feel.
```jsx
<Aurora colors={['#86EFAC','#A7F3D0','#6EE7B7']} style={{ flex: 1 }}>
  <Content />
</Aurora>
```

#### `<Stars />`
<img src="./assets/recordings/comp_stars.gif" width="360" alt="Stars" />

Twinkling starfield.
```jsx
<Stars density={80} twinkle color="#FFFFFF"><Hero /></Stars>
```

#### `<Snow />`
<img src="./assets/recordings/comp_snow.gif" width="360" alt="Snow" />

Drifting snowflakes with rotation + wind.
```jsx
<Snow flakes={60} wind={25}><Scene /></Snow>
```

#### `<Rain />`
<img src="./assets/recordings/comp_rain.gif" width="360" alt="Rain" />

Falling rain streaks at angle.
```jsx
<Rain drops={100} angle={15} color="rgba(165,190,210,0.5)"><Scene /></Rain>
```

#### `<Bubbles />`
<img src="./assets/recordings/comp_bubbles.gif" width="360" alt="Bubbles" />

Rising bubbles with sway.
```jsx
<Bubbles count={30} colors={['rgba(167,243,208,0.6)']}><Scene /></Bubbles>
```

#### `<Fireflies />`
<img src="./assets/recordings/comp_fireflies.gif" width="360" alt="Fireflies" />

Glowing particles wandering with pulse.
```jsx
<Fireflies count={25} color="#FDE68A"><NightScene /></Fireflies>
```

#### `<Waves />`
<img src="./assets/recordings/comp_waves.gif" width="360" alt="Waves" />

Layered SVG waves at bottom of container.
```jsx
<Waves colors={['#0EA5E9','#0284C7','#0369A1']} height={180}><Hero /></Waves>
```

### 🔴 Complex

#### `<MatrixRain />`
<img src="./assets/recordings/comp_matrixrain.gif" width="360" alt="MatrixRain" />

Falling columns of characters — Matrix code rain.
```jsx
<MatrixRain charset="01アイウエオ" color="#22C55E" fontSize={14}><Content /></MatrixRain>
```

---

## 🚪 Transition (in/out)

<p align="center">
  <img src="./assets/recordings/showcase_transitions.gif" width="360" alt="Transitions Showcase" />
</p>

Use `show={boolean}` to toggle in/out, or `trigger={boolean}` + `onDone` for one-shot.

### 🟢 Simple

#### `<CrossFade />`
<img src="./assets/recordings/comp_crossfade.gif" width="360" alt="CrossFade" />

Opacity fade.
```jsx
<CrossFade show={visible}><View /></CrossFade>
```

#### `<Zoom />`
<img src="./assets/recordings/comp_zoom.gif" width="360" alt="Zoom" />

Scale from 0 with spring.
```jsx
<Zoom show={visible} duration={400}><View /></Zoom>
```

### 🟡 Medium

#### `<Iris />`
<img src="./assets/recordings/comp_iris.gif" width="360" alt="Iris" />

Circular reveal/conceal from a point (Looney Tunes style).
```jsx
<Iris show={visible} origin={{ x: 0.5, y: 0.5 }} duration={600}>
  <Modal />
</Iris>
```

#### `<Curtain />`
<img src="./assets/recordings/comp_curtain.gif" width="360" alt="Curtain" />

Stage curtain split open/close.
```jsx
<Curtain show={open} direction="horizontal" color="#1F2937"><View /></Curtain>
```

#### `<Pixelate />`
<img src="./assets/recordings/comp_pixelate.gif" width="360" alt="Pixelate" />

Tile-based dissolve.
```jsx
<Pixelate show={visible} pixelSize={20} color="#FFFFFF" duration={800}>
  <Image />
</Pixelate>
```

#### `<Vortex />`
<img src="./assets/recordings/comp_vortex.gif" width="360" alt="Vortex" />

Swirl into center with rotation + scale.
```jsx
<Vortex show={visible} rotations={2.5} duration={900}><Card /></Vortex>
```

### 🔴 Complex

#### `<Materialize />`
<img src="./assets/recordings/comp_materialize.gif" width="360" alt="Materialize" />

Particles assemble into the view — pair with `<ThanosSnap />`.
```jsx
<Materialize trigger={mounted} direction="left" duration={1800}>
  <Card />
</Materialize>
```

#### `<Mosaic />`
<img src="./assets/recordings/comp_mosaic.gif" width="360" alt="Mosaic" />

Tile cascade flip — LED display reveal.
```jsx
<Mosaic show={visible} cols={10} rows={6} origin="topLeft">
  <Banner />
</Mosaic>
```

---

## ✋ Gesture

<p align="center">
  <img src="./assets/recordings/showcase_gestures.gif" width="360" alt="Gestures Showcase" />
</p>

### 🟢 Simple

#### `<TapFeedback />`
<img src="./assets/recordings/comp_tapfeedback.gif" width="360" alt="TapFeedback" />

Subtle scale-down on press.
```jsx
<TapFeedback scale={0.95}><Button /></TapFeedback>
```

#### `<LongPressGrow />`
<img src="./assets/recordings/comp_longpressgrow.gif" width="360" alt="LongPressGrow" />

Content grows while held.
```jsx
<LongPressGrow growScale={1.1} onLongPress={fn}><Item /></LongPressGrow>
```

#### `<DoubleTapHeart />`
<img src="./assets/recordings/comp_doubletapheart.gif" width="360" alt="DoubleTapHeart" />

Instagram-style double-tap heart pop.
```jsx
<DoubleTapHeart onLike={fn}><Photo /></DoubleTapHeart>
```

### 🟡 Medium

#### `<SwipeReveal />`
<img src="./assets/recordings/comp_swipereveal.gif" width="360" alt="SwipeReveal" />

Swipe-left to reveal action buttons.
```jsx
<SwipeReveal actions={[{ label: 'Delete', color: '#EF4444', onPress: fn }]}>
  <Row />
</SwipeReveal>
```

---

## 🎉 Decoration

<p align="center">
  <img src="./assets/recordings/showcase_decorations.gif" width="360" alt="Decorations Showcase" />
</p>

### 🟢 Simple

#### `<Check />`
<img src="./assets/recordings/comp_check.gif" width="360" alt="Check" />

Animated SVG checkmark drawing.
```jsx
<Check size={32} color="#16A34A" trigger={success} />
```

#### `<Cross />`
<img src="./assets/recordings/comp_cross.gif" width="360" alt="Cross" />

Animated SVG X drawing.
```jsx
<Cross size={32} color="#EF4444" trigger={failed} />
```

#### `<Star />`
<img src="./assets/recordings/comp_star.gif" width="360" alt="Star" />

Star icon with optional twinkle.
```jsx
<Star size={24} color="#FDE68A" twinkle />
```

#### `<Badge />`
<img src="./assets/recordings/comp_badge.gif" width="360" alt="Badge" />

Number badge with pop-on-change animation.
```jsx
<Badge value={5} color="#EF4444" size={22} />
```

#### `<Notification />`
<img src="./assets/recordings/comp_notification.gif" width="360" alt="Notification" />

Bell shake when active.
```jsx
<Notification ringing={hasNew}><BellIcon /></Notification>
```

### 🟡 Medium

#### `<Confetti />`
<img src="./assets/recordings/comp_confetti.gif" width="360" alt="Confetti" />

Falling confetti burst.
```jsx
<Confetti trigger={paid} pieces={100} colors={['#FDE68A','#86EFAC','#F472B6']} />
```

#### `<LikeButton />`
<img src="./assets/recordings/comp_likebutton.gif" width="360" alt="LikeButton" />

Heart fill + particle burst on toggle.
```jsx
<LikeButton liked={isLiked} onToggle={setLiked} size={32} />
```

#### `<EmojiBurst />`
<img src="./assets/recordings/comp_emojiburst.gif" width="360" alt="EmojiBurst" />

Burst of emojis from a point with gravity.
```jsx
<EmojiBurst trigger={cheer} emojis={['🎉','✨','💖']} count={18} />
```

#### `<RatingStars />`
<img src="./assets/recordings/comp_ratingstars.gif" width="360" alt="RatingStars" />

Stars bounce in one-by-one.
```jsx
<RatingStars value={4} max={5} size={24} activeColor="#FDE68A" />
```

#### `<Coins />`
<img src="./assets/recordings/comp_coins.gif" width="360" alt="Coins" />

Coin rain from top.
```jsx
<Coins trigger={reward} count={30} emoji="🪙" size={28} />
```

---

## 📊 Charts

<p align="center">
  <img src="./assets/recordings/showcase_charts.gif" width="360" alt="Charts Showcase" />
</p>

### 🟢 Simple

#### `<ProgressRing />`
<img src="./assets/recordings/comp_progressring.gif" width="360" alt="ProgressRing" />

Animated circular progress.
```jsx
<ProgressRing value={0.72} size={120} strokeWidth={10} color="#10B981" />
```

#### `<AnimatedBar />`
<img src="./assets/recordings/comp_animatedbar.gif" width="360" alt="AnimatedBar" />

Horizontal progress bar that grows.
```jsx
<AnimatedBar value={0.6} height={12} color="#10B981" />
```

#### `<Sparkline />`
<img src="./assets/recordings/comp_sparkline.gif" width="360" alt="Sparkline" />

Mini line chart that draws itself.
```jsx
<Sparkline data={[3,5,2,8,6,9]} width={120} height={40} color="#10B981" />
```

### 🟡 Medium

#### `<LineChart />`
<img src="./assets/recordings/comp_linechart.gif" width="360" alt="LineChart" />

Line chart with stroke-dash animation + dots.
```jsx
<LineChart data={[12,19,8,15,22,18,25]} width={320} height={180} />
```

#### `<BarChart />`
<img src="./assets/recordings/comp_barchart.gif" width="360" alt="BarChart" />

Bars grow from bottom with stagger.
```jsx
<BarChart data={[40,80,30,60,90,55]} width={320} height={180} stagger={100} />
```

#### `<Gauge />`
<img src="./assets/recordings/comp_gauge.gif" width="360" alt="Gauge" />

Semi-circle gauge with animated arc.
```jsx
<Gauge value={0.65} size={200} color="#10B981" />
```

---

## License

MIT © Nguyen Pham (Percy)
