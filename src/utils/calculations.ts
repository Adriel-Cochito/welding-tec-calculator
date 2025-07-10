import { ShapeType, Dimensions } from '../types';

export const calculateVolume = (type: ShapeType, dimensions: Dimensions): number => {
  if (!dimensions) return 0;
  
  // Converter milímetros para metros e diâmetro para raio
  const radiusM = ((dimensions.diameter || 0) / 2) / 1000; // diâmetro/2 depois mm→m
  const heightM = (dimensions.height || 0) / 1000;
  const widthM = (dimensions.width || 0) / 1000;
  const depthM = (dimensions.depth || 0) / 1000;
  const topRadiusM = ((dimensions.topDiameter || 0) / 2) / 1000; // diâmetro/2 depois mm→m
  const bottomRadiusM = ((dimensions.bottomDiameter || 0) / 2) / 1000; // diâmetro/2 depois mm→m
  
  switch(type) {
    case 'cylinder':
      return Math.PI * Math.pow(radiusM, 2) * heightM;
    
    case 'cone':
      return (Math.PI * Math.pow(radiusM, 2) * heightM) / 3;
    
    case 'cube':
      return widthM * heightM * depthM;
    
    case 'conicReduction':
      // Fórmula do tronco de cone: V = (π * h * (R² + R*r + r²)) / 3
      const R = topRadiusM;
      const r = bottomRadiusM;
      const h = heightM;
      return (Math.PI * h * (R * R + R * r + r * r)) / 3;
    
    default:
      return 0;
  }
};