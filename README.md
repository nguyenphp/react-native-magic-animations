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

---

## Installation

```bash
npm install react-native-magic-animations
```

### Peer dependencies

```bash
npm install react-native-reanimated react-native-svg
```

> Follow [react-native-reanimated installation guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started) to complete setup.

---

## Usage

```jsx
import { Typewriter, Wave, Scramble, Float, Breathe, FadeIn, Aurora } from 'react-native-magic-animations'
```

---

## Animations

### Text

#### `<Typewriter />`
Types out text character by character.

```jsx
<Typewriter text="Hello World!" speed={50} onDone={() => console.log('done')} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | required | Text to type |
| `speed` | `number` | `50` | Ms per character |
| `onDone` | `() => void` | — | Callback when done |

---

#### `<Wave />`
Each character bobs up and down in a wave pattern.

```jsx
<Wave text="Magic!" amplitude={6} duration={400} style={{ fontSize: 24 }} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | required | Text to animate |
| `amplitude` | `number` | `6` | Bounce height in px |
| `duration` | `number` | `400` | Ms per cycle |

---

#### `<Scramble />`
Randomizes characters then resolves to the real text.

```jsx
<Scramble text="Hello World!" duration={1200} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | required | Target text |
| `duration` | `number` | `1200` | Total animation duration |
| `onDone` | `() => void` | — | Callback when resolved |

---

### View

#### `<Float />`
Component floats up and down continuously.

```jsx
<Float amplitude={8} duration={1800}>
  <Image source={logo} />
</Float>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `amplitude` | `number` | `8` | Float distance in px |
| `duration` | `number` | `1800` | Ms per cycle |

---

#### `<Breathe />`
Subtle scale pulse like a breathing effect.

```jsx
<Breathe minScale={0.97} maxScale={1.03}>
  <View style={styles.card} />
</Breathe>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `minScale` | `number` | `0.97` | Minimum scale |
| `maxScale` | `number` | `1.03` | Maximum scale |
| `duration` | `number` | `2000` | Ms per cycle |

---

#### `<FadeIn />`
Fades in from a direction on mount.

```jsx
<FadeIn from="bottom" duration={500} delay={200}>
  <Text>Appeared!</Text>
</FadeIn>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `from` | `'bottom' \| 'top' \| 'left' \| 'right' \| 'none'` | `'bottom'` | Slide direction |
| `duration` | `number` | `500` | Animation duration |
| `delay` | `number` | `0` | Delay before start |
| `offset` | `number` | `20` | Slide distance in px |

---

### Background

#### `<Aurora />`
Animated pastel gradient blobs — like iOS 16 wallpaper.

```jsx
<Aurora colors={['#86EFAC', '#A7F3D0', '#6EE7B7', '#34D399']} style={{ flex: 1 }}>
  {/* your content */}
</Aurora>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colors` | `string[]` | pastel greens | Blob colors |
| `speed` | `number` | `3000` | Animation speed in ms |

---

## License

MIT
