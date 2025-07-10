export interface Dimensions {
  radius?: number;
  height?: number;
  width?: number;
  depth?: number;
  topRadius?: number; // Para redução cônica
  bottomRadius?: number; // Para redução cônica
}

export type ShapeType = 'cylinder' | 'cone' | 'cube' | 'conicReduction';

export interface Shape {
  id: number;
  type: ShapeType;
  dimensions: Dimensions;
  volume: number;
  isInverted?: boolean; // Para cones invertidos
}

export interface ShapeConfig {
  type: ShapeType;
  displayName: string;
  defaultDimensions: Dimensions;
}