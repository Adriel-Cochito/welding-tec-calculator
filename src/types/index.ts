export interface Dimensions {
  radius?: number;
  height?: number;
  width?: number;
  depth?: number;
  topRadius?: number;
  bottomRadius?: number;
  diameter?: number; // Para cilindro e cone
  topDiameter?: number; // Para redução cônica
  bottomDiameter?: number; // Para redução cônica
}

export type ShapeType = 'cylinder' | 'cone' | 'cube' | 'conicReduction';

export interface Shape {
  id: number;
  type: ShapeType;
  dimensions: Dimensions;
  volume: number;
  isInverted?: boolean;
}

export interface ShapeConfig {
  type: ShapeType;
  displayName: string;
  defaultDimensions: Dimensions;
}