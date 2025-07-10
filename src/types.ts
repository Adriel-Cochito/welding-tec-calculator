export interface Dimensions {
  radius?: number;
  height?: number;
  width?: number;
  depth?: number;
}

export type ShapeType = 'cylinder' | 'cone' | 'cube';

export interface Shape {
  id: number;
  type: ShapeType;
  dimensions: Dimensions;
  volume: number;
}

export interface ShapeConfig {
  type: ShapeType;
  displayName: string;
  defaultDimensions: Dimensions;
}