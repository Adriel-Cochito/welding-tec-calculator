import { ShapeConfig } from '../types';

export const shapeConfigs: ShapeConfig[] = [
  {
    type: 'cylinder',
    displayName: 'Cilindro',
    defaultDimensions: { radius: 1000, height: 2000 }
  },
  {
    type: 'cone',
    displayName: 'Cone',
    defaultDimensions: { radius: 1000, height: 2000 }
  },
  {
    type: 'cube',
    displayName: 'Cubo',
    defaultDimensions: { width: 2000, height: 2000, depth: 2000 }
  },
  {
    type: 'conicReduction',
    displayName: 'Redução Cônica',
    defaultDimensions: { topRadius: 1500, bottomRadius: 1000, height: 2000 }
  }
];