import React, { useCallback } from 'react';
import { RotateCcw } from 'lucide-react';
import { Shape, Dimensions } from '../../types';

interface DimensionInputsProps {
  shape: Shape;
  onUpdate: (id: number, dimensions: Dimensions) => void;
  onToggleInvert?: (id: number) => void;
}

const DimensionInputs: React.FC<DimensionInputsProps> = ({ 
  shape, 
  onUpdate,
  onToggleInvert 
}) => {
  const handleInputChange = useCallback((key: keyof Dimensions, value: string) => {
    const numValue = parseFloat(value) || 0;
    const newDimensions = { ...shape.dimensions, [key]: numValue };
    onUpdate(shape.id, newDimensions);
  }, [shape.id, shape.dimensions, onUpdate]);

  const renderCylinderInputs = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Raio (m)</label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={shape.dimensions.radius || ''}
          onChange={(e) => handleInputChange('radius', e.target.value)}
          className="input-field"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Altura (m)</label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={shape.dimensions.height || ''}
          onChange={(e) => handleInputChange('height', e.target.value)}
          className="input-field"
        />
      </div>
    </div>
  );

  const renderConeInputs = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Raio da Base (m)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={shape.dimensions.radius || ''}
            onChange={(e) => handleInputChange('radius', e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Altura (m)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={shape.dimensions.height || ''}
            onChange={(e) => handleInputChange('height', e.target.value)}
            className="input-field"
          />
        </div>
      </div>
      {onToggleInvert && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleInvert(shape.id)}
            className="btn-primary flex items-center gap-2 text-sm px-3 py-1"
          >
            <RotateCcw size={14} />
            {shape.isInverted ? 'Normal' : 'Inverter'}
          </button>
          <span className="text-sm text-gray-600">
            {shape.isInverted ? 'Cone invertido (ponta para baixo)' : 'Cone normal (ponta para cima)'}
          </span>
        </div>
      )}
    </div>
  );

  const renderConicReductionInputs = () => (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Raio Superior (m)</label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={shape.dimensions.topRadius || ''}
          onChange={(e) => handleInputChange('topRadius', e.target.value)}
          className="input-field"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Raio Inferior (m)</label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={shape.dimensions.bottomRadius || ''}
          onChange={(e) => handleInputChange('bottomRadius', e.target.value)}
          className="input-field"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Altura (m)</label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={shape.dimensions.height || ''}
          onChange={(e) => handleInputChange('height', e.target.value)}
          className="input-field"
        />
      </div>
    </div>
  );

  const renderCubeInputs = () => (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Largura (m)</label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={shape.dimensions.width || ''}
          onChange={(e) => handleInputChange('width', e.target.value)}
          className="input-field"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Altura (m)</label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={shape.dimensions.height || ''}
          onChange={(e) => handleInputChange('height', e.target.value)}
          className="input-field"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Profundidade (m)</label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={shape.dimensions.depth || ''}
          onChange={(e) => handleInputChange('depth', e.target.value)}
          className="input-field"
        />
      </div>
    </div>
  );

  switch(shape.type) {
    case 'cylinder':
      return renderCylinderInputs();
    case 'cone':
      return renderConeInputs();
    case 'conicReduction':
      return renderConicReductionInputs();
    case 'cube':
      return renderCubeInputs();
    default:
      return null;
  }
};

export default DimensionInputs;