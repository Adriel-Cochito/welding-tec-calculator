import React from 'react';
import { Trash2 } from 'lucide-react';
import { Shape, Dimensions } from '../../types';
import DimensionInputs from '../DimensionInputs';
import Shape3D from '../Shape3D';

interface ShapeCardProps {
  shape: Shape;
  index: number;
  onUpdate: (id: number, dimensions: Dimensions) => void;
  onRemove: (id: number) => void;
  onToggleInvert: (id: number) => void;
  displayName: string;
}

const ShapeCard: React.FC<ShapeCardProps> = ({ 
  shape, 
  index, 
  onUpdate, 
  onRemove, 
  onToggleInvert,
  displayName 
}) => {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">
          {displayName} #{index + 1}
          {shape.isInverted && <span className="text-sm text-gray-500 ml-2">(Invertido)</span>}
        </h3>
        <button 
          onClick={() => onRemove(shape.id)}
          className="text-red-600 hover:text-red-800 p-1 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div>
          <h4 className="font-medium mb-3">Dimensões</h4>
          <DimensionInputs 
            shape={shape} 
            onUpdate={onUpdate}
            onToggleInvert={shape.type === 'cone' ? onToggleInvert : undefined}
          />
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Volume:</p>
            <p className="text-lg font-semibold text-blue-600">
              {(shape.volume || 0).toFixed(2)} m³
            </p>
          </div>
        </div>
        
        {/* 3D Visualization */}
        <div>
          <h4 className="font-medium mb-3">Visualização 3D</h4>
          <div className="flex justify-center">
            <Shape3D 
              type={shape.type} 
              dimensions={shape.dimensions} 
              isInverted={shape.isInverted}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShapeCard;