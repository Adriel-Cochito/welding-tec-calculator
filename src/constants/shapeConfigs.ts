import { ShapeConfig } from '../types';

export const shapeConfigs: ShapeConfig[] = [
  {
    type: 'cylinder',
    displayName: 'Cilindro',
    defaultDimensions: { radius: 1, height: 2 }
  },
  {
    type: 'cone',
    displayName: 'Cone',
    defaultDimensions: { radius: 1, height: 2 }
  },
  {
    type: 'cube',
    displayName: 'Cubo',
    defaultDimensions: { width: 2, height: 2, depth: 2 }
  },
  {
    type: 'conicReduction',
    displayName: 'Redução Cônica',
    defaultDimensions: { topRadius: 1.5, bottomRadius: 1, height: 2 }
  }
];