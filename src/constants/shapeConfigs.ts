import { ShapeConfig } from '../types';

export const shapeConfigs: ShapeConfig[] = [
  {
    type: 'cylinder',
    displayName: 'Cilindro',
    defaultDimensions: { diameter: 2000, height: 2000 }
  },
  {
    type: 'cone',
    displayName: 'Cone',
    defaultDimensions: { diameter: 2000, height: 2000 }
  },
  {
    type: 'cube',
    displayName: 'Cubo',
    defaultDimensions: { width: 2000, height: 2000, depth: 2000 }
  },
  {
    type: 'conicReduction',
    displayName: 'Redução Cônica',
    defaultDimensions: { topDiameter: 3000, bottomDiameter: 2000, height: 2000 }
  }
];