/**
 * Tests for device detection utilities
 */

import { Dimensions } from 'react-native';
import {
  getScreenDimensions,
  isSmallPhone,
  isTablet,
  isLandscape,
  getDeviceType,
  DeviceType,
} from '../src/deviceDetection';
import { DEVICE_BREAKPOINTS } from '../src/config';

// Mock Dimensions
jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(() => ({ width: 414, height: 896 })),
  },
}));

const mockDimensions = jest.mocked(require('react-native').Dimensions.get);

describe('deviceDetection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getScreenDimensions', () => {
    it('should return screen dimensions', () => {
      mockDimensions.mockReturnValue({ width: 414, height: 896 });
      
      const result = getScreenDimensions();
      
      expect(mockDimensions).toHaveBeenCalledWith('window');
      expect(result).toEqual({ width: 414, height: 896 });
    });
  });

  describe('isSmallPhone', () => {
    it('should return true for small phone width', () => {
      mockDimensions.mockReturnValue({ width: DEVICE_BREAKPOINTS.SMALL_PHONE, height: 667 });
      
      const result = isSmallPhone();
      
      expect(result).toBe(true);
    });

    it('should return false for regular phone width', () => {
      mockDimensions.mockReturnValue({ width: DEVICE_BREAKPOINTS.MEDIUM_PHONE, height: 896 });
      
      const result = isSmallPhone();
      
      expect(result).toBe(false);
    });
  });

  describe('isTablet', () => {
    it('should return true for tablet width', () => {
      mockDimensions.mockReturnValue({ width: DEVICE_BREAKPOINTS.TABLET, height: 768 });
      
      const result = isTablet();
      
      expect(result).toBe(true);
    });

    it('should return false for phone width', () => {
      mockDimensions.mockReturnValue({ width: DEVICE_BREAKPOINTS.MEDIUM_PHONE, height: 896 });
      
      const result = isTablet();
      
      expect(result).toBe(false);
    });
  });

  describe('isLandscape', () => {
    it('should return true in landscape orientation', () => {
      mockDimensions.mockReturnValue({ width: 896, height: 414 });
      
      const result = isLandscape();
      
      expect(result).toBe(true);
    });

    it('should return false in portrait orientation', () => {
      mockDimensions.mockReturnValue({ width: 414, height: 896 });
      
      const result = isLandscape();
      
      expect(result).toBe(false);
    });
  });

  describe('getDeviceType', () => {
    it('should return SMALL_PHONE for small phone width', () => {
      mockDimensions.mockReturnValue({ width: DEVICE_BREAKPOINTS.SMALL_PHONE, height: 667 });
      
      const result = getDeviceType();
      
      expect(result).toBe(DeviceType.SMALL_PHONE);
    });

    it('should return MEDIUM_PHONE for medium phone width', () => {
      mockDimensions.mockReturnValue({ width: DEVICE_BREAKPOINTS.MEDIUM_PHONE, height: 896 });
      
      const result = getDeviceType();
      
      expect(result).toBe(DeviceType.MEDIUM_PHONE);
    });

    it('should return LARGE_PHONE for large phone width', () => {
      mockDimensions.mockReturnValue({ width: DEVICE_BREAKPOINTS.LARGE_PHONE, height: 926 });
      
      const result = getDeviceType();
      
      expect(result).toBe(DeviceType.LARGE_PHONE);
    });

    it('should return TABLET for tablet width', () => {
      mockDimensions.mockReturnValue({ width: DEVICE_BREAKPOINTS.TABLET, height: 768 });
      
      const result = getDeviceType();
      
      expect(result).toBe(DeviceType.TABLET);
    });
  });
});