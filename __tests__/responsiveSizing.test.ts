/**
 * Tests for responsive sizing utilities
 */

import { Dimensions } from 'react-native';
import {
  getResponsiveLogoSize,
  getResponsiveInputHeight,
  getResponsiveIconContainerSize,
  getResponsiveMaxWidth,
  getResponsiveFontSize,
  getResponsiveGridColumns,
} from '../src/responsiveSizing';
import { DEVICE_BREAKPOINTS, SIZE_CONSTRAINTS, RESPONSIVE_PERCENTAGES } from '../src/config';

// Mock Dimensions
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  Dimensions: {
    get: jest.fn(),
  },
}));

describe('responsiveSizing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getResponsiveLogoSize', () => {
    it('should return smaller size for small phones', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: DEVICE_BREAKPOINTS.SMALL_PHONE, height: 667 });
      
      const result = getResponsiveLogoSize();
      
      expect(result).toBeLessThanOrEqual(SIZE_CONSTRAINTS.LOGO_MAX_SMALL);
      expect(result).toBeGreaterThanOrEqual(SIZE_CONSTRAINTS.LOGO_MIN_SMALL);
    });

    it('should return larger size for tablets', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: DEVICE_BREAKPOINTS.TABLET, height: 768 });
      
      const result = getResponsiveLogoSize();
      
      expect(result).toBeLessThanOrEqual(SIZE_CONSTRAINTS.LOGO_MAX_TABLET);
      expect(result).toBeGreaterThanOrEqual(SIZE_CONSTRAINTS.LOGO_MIN_TABLET);
    });

    it('should return base size for standard phones', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: DEVICE_BREAKPOINTS.MEDIUM_PHONE, height: 896 });
      
      const result = getResponsiveLogoSize(150);
      
      expect(result).toBe(150);
    });
  });

  describe('getResponsiveInputHeight', () => {
    it('should return smaller height for small devices', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: DEVICE_BREAKPOINTS.SMALL_PHONE, height: 667 });
      
      const result = getResponsiveInputHeight();
      
      expect(result).toBeLessThanOrEqual(SIZE_CONSTRAINTS.INPUT_MAX_SMALL);
    });

    it('should return base height for large devices', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: DEVICE_BREAKPOINTS.MEDIUM_PHONE, height: 926 });
      
      const result = getResponsiveInputHeight(250);
      
      expect(result).toBe(SIZE_CONSTRAINTS.INPUT_MAX_LARGE); // Capped at max
    });
  });

  describe('getResponsiveIconContainerSize', () => {
    it('should return smaller size for small phones', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: DEVICE_BREAKPOINTS.SMALL_PHONE, height: 667 });
      
      const result = getResponsiveIconContainerSize();
      
      expect(result).toBeLessThanOrEqual(SIZE_CONSTRAINTS.ICON_MAX_SMALL);
    });

    it('should return larger size for tablets', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: DEVICE_BREAKPOINTS.TABLET, height: 768 });
      
      const result = getResponsiveIconContainerSize();
      
      expect(result).toBeLessThanOrEqual(SIZE_CONSTRAINTS.ICON_MAX_TABLET);
    });
  });

  describe('getResponsiveMaxWidth', () => {
    it('should return percentage width for small phones', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: DEVICE_BREAKPOINTS.SMALL_PHONE, height: 667 });
      
      const result = getResponsiveMaxWidth();
      
      expect(result).toBe(DEVICE_BREAKPOINTS.SMALL_PHONE * RESPONSIVE_PERCENTAGES.CONTENT_SMALL_PHONE);
    });

    it('should return capped width for tablets', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: DEVICE_BREAKPOINTS.TABLET, height: 768 });
      
      const result = getResponsiveMaxWidth();
      
      expect(result).toBe(SIZE_CONSTRAINTS.CONTENT_MAX_TABLET); // Capped at max
    });
  });

  describe('getResponsiveFontSize', () => {
    it('should scale down font size for small phones', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: DEVICE_BREAKPOINTS.SMALL_PHONE, height: 667 });
      
      const result = getResponsiveFontSize(20);
      
      expect(result).toBe(20 * RESPONSIVE_PERCENTAGES.FONT_SMALL_PHONE);
    });

    it('should scale up font size for tablets', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: DEVICE_BREAKPOINTS.TABLET, height: 768 });
      
      const result = getResponsiveFontSize(20);
      
      expect(result).toBe(20 * RESPONSIVE_PERCENTAGES.FONT_TABLET);
    });

    it('should respect minimum font size', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: DEVICE_BREAKPOINTS.SMALL_PHONE, height: 667 });
      
      const result = getResponsiveFontSize(10);
      
      expect(result).toBe(SIZE_CONSTRAINTS.FONT_MIN_SIZE); // Minimum font size
    });
  });

  describe('getResponsiveGridColumns', () => {
    it('should return mobile columns for phones', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: DEVICE_BREAKPOINTS.MEDIUM_PHONE, height: 896 });
      
      const result = getResponsiveGridColumns(2, 4);
      
      expect(result).toBe(2);
    });

    it('should return tablet columns for tablets', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: DEVICE_BREAKPOINTS.TABLET, height: 768 });
      
      const result = getResponsiveGridColumns(2, 4);
      
      expect(result).toBe(4);
    });
  });
});