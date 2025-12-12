/**
 * Tests for validation utilities
 */

import {
  ResponsiveValidationError,
  validateNumber,
  validateFontSize,
  validateScreenDimensions,
  validateSafeAreaInsets,
  validateGridColumns,
  clamp,
  safePercentage,
} from '../src/validation';

describe('validation', () => {
  describe('ResponsiveValidationError', () => {
    it('should create error with correct name and message', () => {
      const error = new ResponsiveValidationError('Test error');
      
      expect(error.name).toBe('ResponsiveValidationError');
      expect(error.message).toBe('[Responsive] Test error');
    });
  });

  describe('validateNumber', () => {
    it('should return valid number', () => {
      const result = validateNumber(100, 'testParam');
      expect(result).toBe(100);
    });

    it('should throw for undefined', () => {
      expect(() => validateNumber(undefined, 'testParam')).toThrow(ResponsiveValidationError);
    });

    it('should throw for null', () => {
      expect(() => validateNumber(null, 'testParam')).toThrow(ResponsiveValidationError);
    });

    it('should throw for NaN', () => {
      expect(() => validateNumber(NaN, 'testParam')).toThrow(ResponsiveValidationError);
    });

    it('should throw for infinite', () => {
      expect(() => validateNumber(Infinity, 'testParam')).toThrow(ResponsiveValidationError);
    });

    it('should throw for negative when min is 0', () => {
      expect(() => validateNumber(-10, 'testParam', 0)).toThrow(ResponsiveValidationError);
    });

    it('should throw for value above max', () => {
      expect(() => validateNumber(1000, 'testParam', 0, 500)).toThrow(ResponsiveValidationError);
    });

    it('should accept boundary values', () => {
      expect(validateNumber(0, 'testParam', 0, 100)).toBe(0);
      expect(validateNumber(100, 'testParam', 0, 100)).toBe(100);
    });
  });

  describe('validateFontSize', () => {
    it('should return valid font size', () => {
      const result = validateFontSize(16);
      expect(result).toBe(16);
    });

    it('should throw for font size below minimum', () => {
      expect(() => validateFontSize(0)).toThrow(ResponsiveValidationError);
    });

    it('should throw for font size above maximum', () => {
      expect(() => validateFontSize(2000)).toThrow(ResponsiveValidationError);
    });
  });

  describe('validateScreenDimensions', () => {
    it('should not throw for valid dimensions', () => {
      expect(() => validateScreenDimensions(414, 896)).not.toThrow();
    });

    it('should throw for invalid width', () => {
      expect(() => validateScreenDimensions(-100, 896)).toThrow(ResponsiveValidationError);
    });

    it('should throw for invalid height', () => {
      expect(() => validateScreenDimensions(414, -100)).toThrow(ResponsiveValidationError);
    });
  });

  describe('validateSafeAreaInsets', () => {
    it('should not throw for valid insets', () => {
      const insets = { top: 44, bottom: 34, left: 0, right: 0 };
      expect(() => validateSafeAreaInsets(insets)).not.toThrow();
    });

    it('should throw for non-object', () => {
      expect(() => validateSafeAreaInsets(null)).toThrow(ResponsiveValidationError);
      expect(() => validateSafeAreaInsets('string')).toThrow(ResponsiveValidationError);
    });

    it('should handle missing properties with defaults', () => {
      const insets = { top: 44 };
      expect(() => validateSafeAreaInsets(insets)).not.toThrow();
    });

    it('should throw for negative inset values', () => {
      const insets = { top: -10, bottom: 34, left: 0, right: 0 };
      expect(() => validateSafeAreaInsets(insets)).toThrow(ResponsiveValidationError);
    });
  });

  describe('validateGridColumns', () => {
    it('should not throw for valid column values', () => {
      expect(() => validateGridColumns(2, 4)).not.toThrow();
    });

    it('should not throw for undefined values', () => {
      expect(() => validateGridColumns()).not.toThrow();
    });

    it('should throw for invalid column count', () => {
      expect(() => validateGridColumns(0)).toThrow(ResponsiveValidationError);
      expect(() => validateGridColumns(25)).toThrow(ResponsiveValidationError);
    });
  });

  describe('clamp', () => {
    it('should return value within range', () => {
      expect(clamp(50, 0, 100)).toBe(50);
    });

    it('should clamp to minimum', () => {
      expect(clamp(-10, 0, 100)).toBe(0);
    });

    it('should clamp to maximum', () => {
      expect(clamp(150, 0, 100)).toBe(100);
    });

    it('should handle boundary values', () => {
      expect(clamp(0, 0, 100)).toBe(0);
      expect(clamp(100, 0, 100)).toBe(100);
    });
  });

  describe('safePercentage', () => {
    it('should calculate correct percentage', () => {
      expect(safePercentage(100, 0.5)).toBe(50);
      expect(safePercentage(200, 0.25)).toBe(50);
    });

    it('should clamp percentage to 0-1 range', () => {
      expect(safePercentage(100, -0.5)).toBe(0);
      expect(safePercentage(100, 1.5)).toBe(100);
    });

    it('should validate base value', () => {
      expect(() => safePercentage(-100, 0.5)).toThrow(ResponsiveValidationError);
    });
  });
});