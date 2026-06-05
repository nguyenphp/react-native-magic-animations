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
  <img src="./assets/recordings/showcase_texts.gif" width="300" alt="Texts Showcase" />
</p>

### 🟢 Simple

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<Typewriter />`** | <img src="./assets/recordings/comp_typewriter.gif" width="160" alt="Typewriter" /> | Types out text character by character.<br/>` <Typewriter text="Hello World!" speed={50} /> ` |
| **`<Wave />`** | <img src="./assets/recordings/comp_wave.gif" width="160" alt="Wave" /> | Each character bobs up and down in a wave.<br/>` <Wave text="Magic!" amplitude={6} duration={400} /> ` |
| **`<Blink />`** | <img src="./assets/recordings/comp_blink.gif" width="160" alt="Blink" /> | Classic cursor blink — opacity loop.<br/>` <Blink interval={530}>\|</Blink> ` |
| **`<Highlight />`** | <img src="./assets/recordings/comp_highlight.gif" width="160" alt="Highlight" /> | Marker highlight that grows across the text.<br/>` <Highlight text="Important" color="#FDE68A" duration={600} /> ` |
| **`<Underline />`** | <img src="./assets/recordings/comp_underline.gif" width="160" alt="Underline" /> | Self-drawing underline.<br/>` <Underline text="Click here" color="#10B981" thickness={2} /> ` |
| **`<Strike />`** | <img src="./assets/recordings/comp_strike.gif" width="160" alt="Strike" /> | Strikethrough line drawing across.<br/>` <Strike text="$99" color="#EF4444" /> ` |
| **`<BounceIn />`** | <img src="./assets/recordings/comp_bouncein.gif" width="160" alt="BounceIn" /> | Per-character drop with spring bounce.<br/>` <BounceIn text="Welcome" stagger={60} drop={30} /> ` |
| **`<FadeWord />`** | <img src="./assets/recordings/comp_fadeword.gif" width="160" alt="FadeWord" /> | Words fade in one by one.<br/>` <FadeWord text="One word at a time" stagger={100} /> ` |
| **`<RevealMask />`** | <img src="./assets/recordings/comp_revealmask.gif" width="160" alt="RevealMask" /> | Text unmasked left to right via clip.<br/>` <RevealMask text="Reveal" duration={700} /> ` |

### 🟡 Medium

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<Scramble />`** | <img src="./assets/recordings/comp_scramble.gif" width="160" alt="Scramble" /> | Random characters resolving into target text.<br/>` <Scramble text="DECODED" duration={1200} /> ` |
| **`<Counter />`** | <img src="./assets/recordings/comp_counter.gif" width="160" alt="Counter" /> | Animated number with format support.<br/>` <Counter from={0} to={12847} duration={1500} format={(n) => "$"+n.toLocaleString()} /> ` |
| **`<Sparkle />`** | <img src="./assets/recordings/comp_sparkle.gif" width="160" alt="Sparkle" /> | Text decorated with twinkling star particles.<br/>` <Sparkle text="✨ AI Magic" count={8} /> ` |
| **`<Shuffle />`** | <img src="./assets/recordings/comp_shuffle.gif" width="160" alt="Shuffle" /> | Characters shuffle from random positions into place.<br/>` <Shuffle text="Welcome" stagger={40} scatter={80} /> ` |
| **`<Marquee />`** | <img src="./assets/recordings/comp_marquee.gif" width="160" alt="Marquee" /> | Infinite horizontal scroll ticker.<br/>` <Marquee text="🔥 Sale ends tonight" speed={60} spacing={40} /> ` |
| **`<Rotator />`** | <img src="./assets/recordings/comp_rotator.gif" width="160" alt="Rotator" /> | Cycles through words with slide+fade.<br/>` <Rotator words={['code','coffee','RN']} interval={2000} /> ` |
| **`<Decode />`** | <img src="./assets/recordings/comp_decode.gif" width="160" alt="Decode" /> | Hacker-style decoding (Matrix charset).<br/>` <Decode text="ACCESS GRANTED" charset="01ABCDEF" duration={1500} /> ` |
| **`<Capitalize />`** | <img src="./assets/recordings/comp_capitalize.gif" width="160" alt="Capitalize" /> | Characters pop to uppercase sequentially.<br/>` <Capitalize text="emphasis" stagger={80} /> ` |

### 🔴 Complex

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<Glitch />`** | <img src="./assets/recordings/comp_glitch.gif" width="160" alt="Glitch" /> | RGB split + offset for cyberpunk glitch.<br/>` <Glitch text="SYSTEM ERROR" intensity={1} speed={80} /> ` |
| **`<Neon />`** | <img src="./assets/recordings/comp_neon.gif" width="160" alt="Neon" /> | Neon glow with realistic flicker.<br/>` <Neon text="OPEN 24/7" color="#FF00E5" glowRadius={12} flicker /> ` |

---

## 🎁 View

<p align="center">
  <img src="./assets/recordings/showcase_views.gif" width="300" alt="Views Showcase" />
</p>

### 🟢 Simple

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<Breathe />`** | <img src="./assets/recordings/comp_breathe.gif" width="160" alt="Breathe" /> | Subtle pulsing scale.<br/>` <Breathe minScale={0.97} maxScale={1.03}><Card /></Breathe> ` |
| **`<Float />`** | <img src="./assets/recordings/comp_float.gif" width="160" alt="Float" /> | Continuous up/down float.<br/>` <Float amplitude={8} duration={1800}><Logo /></Float> ` |
| **`<FadeIn />`** | <img src="./assets/recordings/comp_fadein.gif" width="160" alt="FadeIn" /> | Mount-time fade + slide from direction.<br/>` <FadeIn from="bottom" duration={500} delay={200}><Text /></FadeIn> ` |
| **`<Pop />`** | <img src="./assets/recordings/comp_pop.gif" width="160" alt="Pop" /> | Scale-in with spring overshoot.<br/>` <Pop delay={0}><Badge /></Pop> ` |
| **`<Drop />`** | <img src="./assets/recordings/comp_drop.gif" width="160" alt="Drop" /> | Falls from above with spring bounce.<br/>` <Drop height={40}><Toast /></Drop> ` |
| **`<Spin />`** | <img src="./assets/recordings/comp_spin.gif" width="160" alt="Spin" /> | Continuous rotation.<br/>` <Spin duration={2000} direction="cw"><RefreshIcon /></Spin> ` |
| **`<Tilt />`** | <img src="./assets/recordings/comp_tilt.gif" width="160" alt="Tilt" /> | Continuous gentle tilt back-and-forth.<br/>` <Tilt angle={3}><Icon /></Tilt> ` |
| **`<Wobble />`** | <img src="./assets/recordings/comp_wobble.gif" width="160" alt="Wobble" /> | Quick wobble rotation on trigger.<br/>` <Wobble trigger={error}><Input /></Wobble> ` |

### 🟡 Medium

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<PaperPlane />`** | <img src="./assets/recordings/comp_paperplane.gif" width="160" alt="PaperPlane" /> | Paper-plane flight path animation.<br/>` <PaperPlane trigger={sent} duration={1500}><MailIcon /></PaperPlane> ` |
| **`<JellyPress />`** | <img src="./assets/recordings/comp_jellypress.gif" width="160" alt="JellyPress" /> | Squash & stretch on press — replaces Touchables.<br/>` <JellyPress onPress={buy} amount={0.06}><Button /></JellyPress> ` |
| **`<Magnetic />`** | <img src="./assets/recordings/comp_magnetic.gif" width="160" alt="Magnetic" /> | Component is attracted toward dragging finger.<br/>` <Magnetic strength={0.4}><CTA /></Magnetic> ` |
| **`<Shake />`** | <img src="./assets/recordings/comp_shake.gif" width="160" alt="Shake" /> | Horizontal shake for error feedback.<br/>` <Shake trigger={loginFailed} amount={8}><TextInput /></Shake> ` |
| **`<Wiggle />`** | <img src="./assets/recordings/comp_wiggle.gif" width="160" alt="Wiggle" /> | iOS edit-mode wiggle.<br/>` <Wiggle active={editing}><AppIcon /></Wiggle> ` |
| **`<Pulse />`** | <img src="./assets/recordings/comp_pulse.gif" width="160" alt="Pulse" /> | Pulsing ring around content (notifications).<br/>` <Pulse color="#EF4444"><LiveBadge /></Pulse> ` |
| **`<RubberBand />`** | <img src="./assets/recordings/comp_rubberband.gif" width="160" alt="RubberBand" /> | Elastic scale stretch on trigger.<br/>` <RubberBand trigger={pop}><Logo /></RubberBand> ` |
| **`<Heart />`** | <img src="./assets/recordings/comp_heart.gif" width="160" alt="Heart" /> | Realistic heartbeat pulse with BPM control.<br/>` <Heart beating bpm={72}><HeartIcon /></Heart> ` |
| **`<Flash />`** | <img src="./assets/recordings/comp_flash.gif" width="160" alt="Flash" /> | Quick color flash overlay.<br/>` <Flash trigger={photoTaken} color="#FFF"><Camera /></Flash> ` |
| **`<Glow />`** | <img src="./assets/recordings/comp_glow.gif" width="160" alt="Glow" /> | Pulsing glow shadow.<br/>` <Glow color="#60A5FA" intensity={1}><Card /></Glow> ` |
| **`<Sparkles />`** | <img src="./assets/recordings/comp_sparkles.gif" width="160" alt="Sparkles" /> | Twinkling stars scattered around content.<br/>` <Sparkles count={14} colors={['#FDE68A']}><Award /></Sparkles> ` |
| **`<Stamp />`** | <img src="./assets/recordings/comp_stamp.gif" width="160" alt="Stamp" /> | "PAID/APPROVED" stamp slam with dust ring.<br/>` <Stamp trigger={approved} text="PAID" color="#16A34A" /> ` |
| **`<Ripple />`** | <img src="./assets/recordings/comp_ripple.gif" width="160" alt="Ripple" /> | Material-style ripple from tap point.<br/>` <Ripple color="rgba(255,255,255,0.45)" onPress={fn}><Tile /></Ripple> ` |
| **`<FlipCard />`** | <img src="./assets/recordings/comp_flipcard.gif" width="160" alt="FlipCard" /> | 3D card flip between front/back faces.<br/>` <FlipCard flipped={open} front={<F />} back={<B />} /> ` |

### 🔴 Complex

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<ThanosSnap />`** | <img src="./assets/recordings/comp_thanossnap.gif" width="160" alt="ThanosSnap" /> | Cinematic disintegration with directional wipe.<br/>` <ThanosSnap trigger={dismiss} direction="right" duration={1800}><Card /></ThanosSnap> ` |
| **`<FireBurn />`** | <img src="./assets/recordings/comp_fireburn.gif" width="160" alt="FireBurn" /> | Flames burning at the base of content.<br/>` <FireBurn intensity={1.2}><Item /></FireBurn> ` |
| **`<TearReveal />`** | <img src="./assets/recordings/comp_tearreveal.gif" width="160" alt="TearReveal" /> | Drag-to-tear paper reveal interaction.<br/>` <TearReveal direction="right" onTorn={fn}><Content /></TearReveal> ` |
| **`<Tilt3D />`** | <img src="./assets/recordings/comp_tilt3d.gif" width="160" alt="Tilt3D" /> | 3D parallax tilt that follows the drag.<br/>` <Tilt3D maxTilt={15} glare><Card /></Tilt3D> ` |
| **`<Shatter />`** | <img src="./assets/recordings/comp_shatter.gif" width="160" alt="Shatter" /> | Breaks content into shards falling with gravity.<br/>` <Shatter trigger={broken} shards={24} gravity={1}><Glass /></Shatter> ` |

---

## 🌌 Background

<p align="center">
  <img src="./assets/recordings/showcase_backgrounds.gif" width="300" alt="Backgrounds Showcase" />
</p>

### 🟢 Simple

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<GradientShift />`** | <img src="./assets/recordings/comp_gradientshift.gif" width="160" alt="GradientShift" /> | Background color interpolates through a palette.<br/>` <GradientShift colors={['#FBCFE8','#C7D2FE']} speed={4000}><App /></GradientShift> ` |

### 🟡 Medium

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<Aurora />`** | <img src="./assets/recordings/comp_aurora.gif" width="160" alt="Aurora" /> | Pastel gradient blobs drifting slowly.<br/>` <Aurora colors={['#86EFAC','#A7F3D0']} style={{ flex: 1 }}><Content /></Aurora> ` |
| **`<Stars />`** | <img src="./assets/recordings/comp_stars.gif" width="160" alt="Stars" /> | Twinkling starfield.<br/>` <Stars density={80} twinkle color="#FFFFFF"><Hero /></Stars> ` |
| **`<Snow />`** | <img src="./assets/recordings/comp_snow.gif" width="160" alt="Snow" /> | Drifting snowflakes with wind + sway.<br/>` <Snow flakes={60} wind={25}><Scene /></Snow> ` |
| **`<Rain />`** | <img src="./assets/recordings/comp_rain.gif" width="160" alt="Rain" /> | Falling rain streaks at angle.<br/>` <Rain drops={100} angle={15}><Scene /></Rain> ` |
| **`<Bubbles />`** | <img src="./assets/recordings/comp_bubbles.gif" width="160" alt="Bubbles" /> | Rising bubbles with sway.<br/>` <Bubbles count={30}><Scene /></Bubbles> ` |
| **`<Fireflies />`** | <img src="./assets/recordings/comp_fireflies.gif" width="160" alt="Fireflies" /> | Glowing particles wandering with pulse.<br/>` <Fireflies count={25} color="#FDE68A"><Scene /></Fireflies> ` |
| **`<Waves />`** | <img src="./assets/recordings/comp_waves.gif" width="160" alt="Waves" /> | Layered SVG waves at bottom of container.<br/>` <Waves colors={['#0EA5E9','#0284C7']} height={180}><Hero /></Waves> ` |

### 🔴 Complex

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<MatrixRain />`** | <img src="./assets/recordings/comp_matrixrain.gif" width="160" alt="MatrixRain" /> | Falling columns of Matrix code rain.<br/>` <MatrixRain charset="01アイウエオ" color="#22C55E" /><Content /></MatrixRain> ` |

---

## 🚪 Transition (in/out)

<p align="center">
  <img src="./assets/recordings/showcase_transitions.gif" width="300" alt="Transitions Showcase" />
</p>

Use `show={boolean}` to toggle in/out, or `trigger={boolean}` + `onDone` for one-shot.

### 🟢 Simple

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<CrossFade />`** | <img src="./assets/recordings/comp_crossfade.gif" width="160" alt="CrossFade" /> | Opacity fade transition.<br/>` <CrossFade show={visible}><View /></CrossFade> ` |
| **`<Zoom />`** | <img src="./assets/recordings/comp_zoom.gif" width="160" alt="Zoom" /> | Scale from 0 with spring bounce.<br/>` <Zoom show={visible} duration={400}><View /></Zoom> ` |

### 🟡 Medium

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<Iris />`** | <img src="./assets/recordings/comp_iris.gif" width="160" alt="Iris" /> | Circular reveal/conceal from a point.<br/>` <Iris show={visible} origin={{ x: 0.5, y: 0.5 }} duration={600}><Modal /></Iris> ` |
| **`<Curtain />`** | <img src="./assets/recordings/comp_curtain.gif" width="160" alt="Curtain" /> | Stage curtain split open/close.<br/>` <Curtain show={open} direction="horizontal" color="#1F2937"><View /></Curtain> ` |
| **`<Pixelate />`** | <img src="./assets/recordings/comp_pixelate.gif" width="160" alt="Pixelate" /> | Tile-based dissolve.<br/>` <Pixelate show={visible} pixelSize={20}><Image /></Pixelate> ` |
| **`<Vortex />`** | <img src="./assets/recordings/comp_vortex.gif" width="160" alt="Vortex" /> | Swirl into center with rotation + scale.<br/>` <Vortex show={visible} rotations={2.5} duration={900}><Card /></Vortex> ` |

### 🔴 Complex

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<Materialize />`** | <img src="./assets/recordings/comp_materialize.gif" width="160" alt="Materialize" /> | Particles assemble into view — pair with ThanosSnap.<br/>` <Materialize trigger={mounted} direction="left" duration={1800}><Card /></Materialize> ` |
| **`<Mosaic />`** | <img src="./assets/recordings/comp_mosaic.gif" width="160" alt="Mosaic" /> | Tile cascade flip — LED display reveal.<br/>` <Mosaic show={visible} cols={10} rows={6}><Banner /></Mosaic> ` |

---

## ✋ Gesture

<p align="center">
  <img src="./assets/recordings/showcase_gestures.gif" width="300" alt="Gestures Showcase" />
</p>

### 🟢 Simple

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<TapFeedback />`** | <img src="./assets/recordings/comp_tapfeedback.gif" width="160" alt="TapFeedback" /> | Subtle scale-down on press.<br/>` <TapFeedback scale={0.95}><Button /></TapFeedback> ` |
| **`<LongPressGrow />`** | <img src="./assets/recordings/comp_longpressgrow.gif" width="160" alt="LongPressGrow" /> | Content grows while held.<br/>` <LongPressGrow growScale={1.1} onLongPress={fn}><Item /></LongPressGrow> ` |
| **`<DoubleTapHeart />`** | <img src="./assets/recordings/comp_doubletapheart.gif" width="160" alt="DoubleTapHeart" /> | Instagram-style double-tap heart pop.<br/>` <DoubleTapHeart onLike={fn}><Photo /></DoubleTapHeart> ` |

### 🟡 Medium

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<SwipeReveal />`** | <img src="./assets/recordings/comp_swipereveal.gif" width="160" alt="SwipeReveal" /> | Swipe-left to reveal action buttons.<br/>` <SwipeReveal actions={[{ label: 'Delete', color: '#EF4444', onPress: fn }]}><Row /></SwipeReveal> ` |

---

## 🎉 Decoration

<p align="center">
  <img src="./assets/recordings/showcase_decorations.gif" width="300" alt="Decorations Showcase" />
</p>

### 🟢 Simple

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<Check />`** | <img src="./assets/recordings/comp_check.gif" width="160" alt="Check" /> | Animated SVG checkmark drawing.<br/>` <Check size={32} color="#16A34A" trigger={success} /> ` |
| **`<Cross />`** | <img src="./assets/recordings/comp_cross.gif" width="160" alt="Cross" /> | Animated SVG X drawing.<br/>` <Cross size={32} color="#EF4444" trigger={failed} /> ` |
| **`<Star />`** | <img src="./assets/recordings/comp_star.gif" width="160" alt="Star" /> | Star icon with optional twinkle.<br/>` <Star size={24} color="#FDE68A" twinkle /> ` |
| **`<Badge />`** | <img src="./assets/recordings/comp_badge.gif" width="160" alt="Badge" /> | Number badge with pop animation on change.<br/>` <Badge value={5} color="#EF4444" size={22} /> ` |
| **`<Notification />`** | <img src="./assets/recordings/comp_notification.gif" width="160" alt="Notification" /> | Bell shake animation when ringing is active.<br/>` <Notification ringing={hasNew}><BellIcon /></Notification> ` |

### 🟡 Medium

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<Confetti />`** | <img src="./assets/recordings/comp_confetti.gif" width="160" alt="Confetti" /> | Falling confetti burst animation.<br/>` <Confetti trigger={paid} pieces={100} /> ` |
| **`<LikeButton />`** | <img src="./assets/recordings/comp_likebutton.gif" width="160" alt="LikeButton" /> | Heart fill + particle burst on toggle.<br/>` <LikeButton liked={isLiked} onToggle={setLiked} size={32} /> ` |
| **`<EmojiBurst />`** | <img src="./assets/recordings/comp_emojiburst.gif" width="160" alt="EmojiBurst" /> | Burst of emojis from point with gravity.<br/>` <EmojiBurst trigger={cheer} emojis={['🎉','✨']} count={18} /> ` |
| **`<RatingStars />`** | <img src="./assets/recordings/comp_ratingstars.gif" width="160" alt="RatingStars" /> | Stars bounce in one-by-one.<br/>` <RatingStars value={4} max={5} size={24} /> ` |
| **`<Coins />`** | <img src="./assets/recordings/comp_coins.gif" width="160" alt="Coins" /> | Coin rain from the top of container.<br/>` <Coins trigger={reward} count={30} size={28} /> ` |

---

## 📊 Charts

<p align="center">
  <img src="./assets/recordings/showcase_charts.gif" width="300" alt="Charts Showcase" />
</p>

### 🟢 Simple

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<ProgressRing />`** | <img src="./assets/recordings/comp_progressring.gif" width="160" alt="ProgressRing" /> | Animated circular progress.<br/>` <ProgressRing value={0.72} size={120} strokeWidth={10} color="#10B981" /> ` |
| **`<AnimatedBar />`** | <img src="./assets/recordings/comp_animatedbar.gif" width="160" alt="AnimatedBar" /> | Horizontal progress bar that grows.<br/>` <AnimatedBar value={0.6} height={12} color="#10B981" /> ` |
| **`<Sparkline />`** | <img src="./assets/recordings/comp_sparkline.gif" width="160" alt="Sparkline" /> | Mini line chart that draws itself.<br/>` <Sparkline data={[3,5,2,8,6,9]} width={120} height={40} /> ` |

### 🟡 Medium

| Component | Preview | Description & Usage |
| :--- | :---: | :--- |
| **`<LineChart />`** | <img src="./assets/recordings/comp_linechart.gif" width="160" alt="LineChart" /> | Line chart with stroke-dash animation + dots.<br/>` <LineChart data={[12,19,8,15,22,18,25]} width={320} height={180} /> ` |
| **`<BarChart />`** | <img src="./assets/recordings/comp_barchart.gif" width="160" alt="BarChart" /> | Bars grow from bottom with stagger.<br/>` <BarChart data={[40,80,30,60,90,55]} width={320} height={180} /> ` |
| **`<Gauge />`** | <img src="./assets/recordings/comp_gauge.gif" width="160" alt="Gauge" /> | Semi-circle gauge with animated arc.<br/>` <Gauge value={0.65} size={200} color="#10B981" /> ` |

---

## License

MIT © Nguyen Pham (Percy)
