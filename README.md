# @umituz/react-native-design-system-responsive

Responsive design utilities for React Native - Screen dimensions, device detection, and responsive sizing utilities following Material Design 3 and iOS HIG principles.

## ✨ Features

- 📱 **Device Detection** - Detect phone, tablet, small devices
- 📐 **Screen Dimensions** - Get current screen width/height
- 🎯 **Responsive Sizing** - Logo, input, icon, and layout sizing
- 🖥️ **Platform Constants** - iOS HIG and Material Design compliance
- ⚡ **React Hook** - `useResponsive` hook for real-time updates
- 🌐 **Universal** - Works on iOS, Android, and Web

## 📦 Installation

```bash
npm install @umituz/react-native-design-system-responsive
```

### Peer Dependencies

```bash
npm install react@18.3.1 react-native@0.76.3 react-native-safe-area-context@^5.6.2
```

## 🚀 Usage

### Hook Usage

```typescript
import { useResponsive } from '@umituz/react-native-design-system-responsive';

const MyComponent = () => {
  const { logoSize, inputHeight, isTablet, fabPosition } = useResponsive();

  return (
    <View>
      <Image width={logoSize} height={logoSize} />
      <TextInput style={{ height: inputHeight }} />
    </View>
  );
};
```

### Utility Functions

```typescript
import {
  isTablet,
  isSmallPhone,
  getResponsiveLogoSize,
  getResponsiveInputHeight,
  getScreenDimensions,
} from '@umituz/react-native-design-system-responsive';

// Device detection
if (isTablet()) {
  // Tablet-specific code
}

// Responsive sizing
const logoSize = getResponsiveLogoSize(140);
const inputHeight = getResponsiveInputHeight(200);

// Screen dimensions
const { width, height } = getScreenDimensions();
```

### Platform Constants

```typescript
import {
  IOS_HIG,
  ANDROID_MATERIAL,
  PLATFORM_CONSTANTS,
  getMinTouchTarget,
} from '@umituz/react-native-design-system-responsive';

// iOS HIG compliance
const buttonSize = IOS_HIG.MIN_TOUCH_TARGET; // 44pt

// Platform-agnostic
const minSize = getMinTouchTarget('button'); // 48pt
```

## 📖 Documentation

Full documentation: [Coming Soon]

## 🤝 Contributing

Contributions welcome! This is part of the universal design system used across 100+ React Native apps.

## 📄 License

MIT © Umit Uz

