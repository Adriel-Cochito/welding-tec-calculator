import { ShapeConfig } from '../types';

export const shapeConfigs: ShapeConfig[] = [
  {
    type: 'cylinder',
    displayName: 'Cilindro',
    defaultDimensions: { diameter: 200, height: 200 }
  },
  {
    type: 'cone',
    displayName: 'Cone',
    defaultDimensions: { diameter: 200, height: 200 }
  },
  {
    type: 'cube',
    displayName: 'Cubo',
    defaultDimensions: { width: 200, height: 200, depth: 200 }
  },
  {
    type: 'conicReduction',
    displayName: 'Redução Cônica',
    defaultDimensions: { topDiameter: 300, bottomDiameter: 200, height: 200 }
  }
];