import { ShapeConfig } from '../types';

export const shapeConfigs: ShapeConfig[] = [
  {
    type: 'cylinder',
    displayName: 'Cilindro',
    defaultDimensions: { diameter: 1500, height: 2000 }
  },
  {
    type: 'cone',
    displayName: 'Cone',
    defaultDimensions: { diameter: 1500, height: 2000 }
  },
  {
    type: 'cube',
    displayName: 'Cubo',
    defaultDimensions: { width: 1500, height: 1500, depth: 1500 }
  },
  {
    type: 'conicReduction',
    displayName: 'Redução Cônica',
    defaultDimensions: { topDiameter: 1000, bottomDiameter: 500, height: 1000 }
  }
];