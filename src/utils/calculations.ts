import { ShapeType, Dimensions } from '../types';

export const calculateVolume = (type: ShapeType, dimensions: Dimensions): number => {
  if (!dimensions) return 0;
  
  switch(type) {
    case 'cylinder':
      return Math.PI * Math.pow(dimensions.radius || 0, 2) * (dimensions.height || 0);
    
    case 'cone':
      return (Math.PI * Math.pow(dimensions.radius || 0, 2) * (dimensions.height || 0)) / 3;
    
    case 'cube':
      return (dimensions.width || 0) * (dimensions.height || 0) * (dimensions.depth || 0);
    
    case 'conicReduction':
      // Fórmula do tronco de cone: V = (π * h * (R² + R*r + r²)) / 3
      const R = dimensions.topRadius || 0;
      const r = dimensions.bottomRadius || 0;
      const h = dimensions.height || 0;
      return (Math.PI * h * (R * R + R * r + r * r)) / 3;
    
    default:
      return 0;
  }
};