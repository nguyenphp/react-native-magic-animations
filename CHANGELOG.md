# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] — 2026-06-05

### 🎉 Massive expansion — 65+ new animations across 7 categories

This release more than triples the library, adds 4 new categories, and gives `<ThanosSnap />` a complete visual overhaul.

### Added

**📝 Text** — 16 new animations

- 🟢 `<Blink />` — cursor-style opacity blink
- 🟢 `<Highlight />` — marker highlight that sweeps across text
- 🟢 `<Underline />` — self-drawing underline
- 🟢 `<Strike />` — animated strikethrough
- 🟢 `<BounceIn />` — per-character drop with spring bounce
- 🟢 `<FadeWord />` — words fade in one by one
- 🟢 `<RevealMask />` — text unmasked by a moving clip
- 🟡 `<Counter />` — animated number with format support
- 🟡 `<Sparkle />` — text with twinkling star particles
- 🟡 `<Shuffle />` — characters shuffle from random positions into place
- 🟡 `<Marquee />` — infinite horizontal scroll
- 🟡 `<Rotator />` — cycles through a list of words
- 🟡 `<Decode />` — hacker-style decoding
- 🟡 `<Capitalize />` — characters pop up to uppercase
- 🔴 `<Glitch />` — RGB-split cyberpunk glitch
- 🔴 `<Neon />` — neon glow with flicker

**🎁 View** — 20 new animations

- 🟢 `<Pop />`, `<Drop />`, `<Spin />`, `<Tilt />`, `<Wobble />`
- 🟡 `<JellyPress />` — squash & stretch on press
- 🟡 `<Magnetic />` — attracted to dragging finger
- 🟡 `<Shake />` — error shake
- 🟡 `<Wiggle />` — iOS edit-mode wiggle
- 🟡 `<Pulse />` — pulsing ring (notification badge)
- 🟡 `<RubberBand />` — elastic stretch
- 🟡 `<Heart />` — realistic heartbeat (BPM control)
- 🟡 `<Flash />` — color flash overlay
- 🟡 `<Glow />` — pulsing shadow glow
- 🟡 `<Sparkles />` — twinkling stars around content
- 🟡 `<Stamp />` — APPROVED/PAID slam with dust ring
- 🟡 `<Ripple />` — material-style ripple (multi-touch)
- 🟡 `<FlipCard />` — 3D card flip with front/back
- 🔴 `<Tilt3D />` — 3D parallax tilt with glare
- 🔴 `<Shatter />` — content breaks into shards with gravity

**🌌 Background** — 8 new animations

- 🟢 `<GradientShift />` — color-cycling background
- 🟡 `<Stars />` — twinkling starfield
- 🟡 `<Snow />` — drifting snowflakes with wind
- 🟡 `<Rain />` — angled rain streaks
- 🟡 `<Bubbles />` — rising bubbles with sway
- 🟡 `<Fireflies />` — glowing wandering particles
- 🟡 `<Waves />` — layered SVG waves at bottom
- 🔴 `<MatrixRain />` — Matrix code rain

**🚪 Transition (in/out)** — 8 new animations (new category)

- 🟢 `<CrossFade />` — opacity fade
- 🟢 `<Zoom />` — scale-in with spring
- 🟡 `<Iris />` — circular reveal from a point
- 🟡 `<Curtain />` — stage curtain split
- 🟡 `<Pixelate />` — tile-based dissolve
- 🟡 `<Vortex />` — swirl into center
- 🔴 `<Materialize />` — particles assemble (paired with `<ThanosSnap />`)
- 🔴 `<Mosaic />` — cascading tile flip from origin

**✋ Gesture** — 4 new animations (new category)

- 🟢 `<TapFeedback />` — subtle press scale
- 🟢 `<LongPressGrow />` — grows while held
- 🟢 `<DoubleTapHeart />` — Instagram-style double-tap
- 🟡 `<SwipeReveal />` — swipe to reveal actions

**🎉 Decoration** — 10 new animations (new category)

- 🟢 `<Check />`, `<Cross />`, `<Star />`, `<Badge />`, `<Notification />`
- 🟡 `<Confetti />` — confetti burst
- 🟡 `<LikeButton />` — heart fill + particles
- 🟡 `<EmojiBurst />` — emoji burst with gravity
- 🟡 `<RatingStars />` — staggered star reveal
- 🟡 `<Coins />` — coin rain

**📊 Charts** — 6 new animations (new category)

- 🟢 `<ProgressRing />`, `<AnimatedBar />`, `<Sparkline />`
- 🟡 `<LineChart />`, `<BarChart />`, `<Gauge />`

### Changed

- **`<ThanosSnap />` — complete rewrite** for cinematic disintegration:
  - Particles now disperse from a moving **wipe edge** (configurable `direction`) instead of a radial fan — feels like the movie effect instead of an explosion.
  - Smaller, denser pixels (4dp default with adaptive sizing); dust-tone color palette (warm grays/ash instead of bright sand).
  - Curved trajectories with sine wiggle, rotation, and upward lift drift.
  - Content fade synchronized with the wipe; pixels ramp-in to mask the fade visually.
  - New props: `direction` (`'left' | 'right' | 'up' | 'down'`), `colors`, `pixelSize`.
- **Logo** updated to new magic wand artwork.

### Migration

This release is fully backward-compatible. `<ThanosSnap />` retains its existing `trigger`/`duration`/`onDone` API; new props are optional.

```diff
- <ThanosSnap trigger={dismiss} duration={1400}>
+ <ThanosSnap trigger={dismiss} duration={1800} direction="right">
    <Card />
  </ThanosSnap>
```

---

## [0.1.0] — 2026-06-05 (initial release)

### Added

- 📝 Text: `<Typewriter />`, `<Wave />`, `<Scramble />`
- 🎁 View: `<Breathe />`, `<Float />`, `<FadeIn />`, `<PaperPlane />`, `<ThanosSnap />`, `<FireBurn />`, `<TearReveal />`
- 🌌 Background: `<Aurora />`
