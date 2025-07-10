import React, { useState, useCallback } from 'react';
import { Trash2, Plus, Calculator } from 'lucide-react';
import { Shape, ShapeType, Dimensions, ShapeConfig } from './types';

const WeldingTecVolumeCalculator: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShape, setSelectedShape] = useState<ShapeType | ''>('');

  const shapeConfigs: ShapeConfig[] = [
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
    }
  ];

  const calculateVolume = useCallback((type: ShapeType, dimensions: Dimensions): number => {
    if (!dimensions) return 0;
    
    switch(type) {
      case 'cylinder':
        return Math.PI * Math.pow(dimensions.radius || 0, 2) * (dimensions.height || 0);
      case 'cone':
        return (Math.PI * Math.pow(dimensions.radius || 0, 2) * (dimensions.height || 0)) / 3;
      case 'cube':
        return (dimensions.width || 0) * (dimensions.height || 0) * (dimensions.depth || 0);
      default:
        return 0;
    }
  }, []);

  const addShape = useCallback(() => {
    if (!selectedShape) return;
    
    const config = shapeConfigs.find(c => c.type === selectedShape);
    if (!config) return;

    const newShape: Shape = {
      id: Date.now(),
      type: selectedShape,
      dimensions: config.defaultDimensions,
      volume: calculateVolume(selectedShape, config.defaultDimensions)
    };
    
    setShapes(prev => [...prev, newShape]);
    setSelectedShape('');
  }, [selectedShape, calculateVolume, shapeConfigs]);

  const removeShape = useCallback((id: number) => {
    setShapes(prev => prev.filter(shape => shape.id !== id));
  }, []);

  const updateDimensions = useCallback((id: number, newDimensions: Dimensions) => {
    setShapes(prev => prev.map(shape => 
      shape.id === id 
        ? { ...shape, dimensions: newDimensions, volume: calculateVolume(shape.type, newDimensions) }
        : shape
    ));
  }, [calculateVolume]);

  const getTotalVolume = useCallback((): number => {
    return shapes.reduce((total, shape) => total + (shape.volume || 0), 0);
  }, [shapes]);

  const getShapeDisplayName = useCallback((type: ShapeType): string => {
    const config = shapeConfigs.find(c => c.type === type);
    return config?.displayName || type;
  }, [shapeConfigs]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welding Tec</h1>
              <p className="text-gray-600">Calculadora de Volume de Tanques</p>
            </div>
            <Calculator className="text-blue-600" size={48} />
          </div>
        </div>

        {/* Add Shape Section */}
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4">Adicionar Forma</h2>
          <div className="flex gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Forma</label>
              <select 
                value={selectedShape} 
                onChange={(e) => setSelectedShape(e.target.value as ShapeType | '')}
                className="input-field w-48"
              >
                <option value="">Selecione uma forma</option>
                {shapeConfigs.map(config => (
                  <option key={config.type} value={config.type}>
                    {config.displayName}
                  </option>
                ))}
              </select>
            </div>
            <button 
              onClick={addShape}
              disabled={!selectedShape}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={16} />
              Adicionar
            </button>
          </div>
        </div>

        {/* Shapes List */}
        <div className="space-y-6">
          {shapes.map((shape, index) => (
            <ShapeCard
              key={shape.id}
              shape={shape}
              index={index}
              onUpdate={updateDimensions}
              onRemove={removeShape}
              displayName={getShapeDisplayName(shape.type)}
            />
          ))}
        </div>

        {/* Total Volume */}
        {shapes.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-6 mt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Volume Total do Tanque
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                {getTotalVolume().toFixed(2)} m³
              </p>
              <p className="text-sm text-blue-700 mt-1">
                {shapes.length} forma{shapes.length !== 1 ? 's' : ''} adicionada{shapes.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        )}

        {shapes.length === 0 && (
          <div className="bg-gray-100 rounded-lg p-12 text-center">
            <Calculator size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">
              Adicione formas geométricas para calcular o volume do tanque
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface ShapeCardProps {
  shape: Shape;
  index: number;
  onUpdate: (id: number, dimensions: Dimensions) => void;
  onRemove: (id: number) => void;
  displayName: string;
}

const ShapeCard: React.FC<ShapeCardProps> = ({ shape, index, onUpdate, onRemove, displayName }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">
          {displayName} #{index + 1}
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
            <Shape3D type={shape.type} dimensions={shape.dimensions} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface DimensionInputsProps {
  shape: Shape;
  onUpdate: (id: number, dimensions: Dimensions) => void;
}

const DimensionInputs: React.FC<DimensionInputsProps> = ({ shape, onUpdate }) => {
  const handleInputChange = useCallback((key: keyof Dimensions, value: string) => {
    const numValue = parseFloat(value) || 0;
    const newDimensions = { ...shape.dimensions, [key]: numValue };
    onUpdate(shape.id, newDimensions);
  }, [shape.id, shape.dimensions, onUpdate]);

  switch(shape.type) {
    case 'cylinder':
      return (
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

    case 'cone':
      return (
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
      );

    case 'cube':
      return (
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

    default:
      return null;
  }
};

interface Shape3DProps {
  type: ShapeType;
  dimensions: Dimensions;
}

const Shape3D: React.FC<Shape3DProps> = ({ type, dimensions }) => {
  const scale = 50;
  const centerX = 150;
  const centerY = 150;

  switch(type) {
    case 'cylinder':
      const cylRadius = Math.max((dimensions.radius || 0) * scale, 10);
      const cylHeight = Math.max((dimensions.height || 0) * scale, 20);
      return (
        <svg width="300" height="300" viewBox="0 0 300 300">
          <defs>
            <linearGradient id={`cylGradient-${Date.now()}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A90E2" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
          </defs>
          <rect 
            x={centerX - cylRadius} 
            y={centerY - cylHeight/2} 
            width={cylRadius * 2} 
            height={cylHeight}
            fill={`url(#cylGradient-${Date.now()})`}
            stroke="#1E3A8A"
            strokeWidth="2"
          />
          <ellipse 
            cx={centerX} 
            cy={centerY - cylHeight/2} 
            rx={cylRadius} 
            ry={cylRadius/3}
            fill="#60A5FA"
            stroke="#1E3A8A"
            strokeWidth="2"
          />
          <ellipse 
            cx={centerX} 
            cy={centerY + cylHeight/2} 
            rx={cylRadius} 
            ry={cylRadius/3}
            fill="#3B82F6"
            stroke="#1E3A8A"
            strokeWidth="2"
          />
        </svg>
      );

    case 'cone':
      const coneRadius = Math.max((dimensions.radius || 0) * scale, 10);
      const coneHeight = Math.max((dimensions.height || 0) * scale, 20);
      return (
        <svg width="300" height="300" viewBox="0 0 300 300">
          <defs>
            <linearGradient id={`coneGradient-${Date.now()}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#065F46" />
            </linearGradient>
          </defs>
          <polygon 
            points={`${centerX},${centerY - coneHeight/2} ${centerX - coneRadius},${centerY + coneHeight/2} ${centerX + coneRadius},${centerY + coneHeight/2}`}
            fill={`url(#coneGradient-${Date.now()})`}
            stroke="#065F46"
            strokeWidth="2"
          />
          <ellipse 
            cx={centerX} 
            cy={centerY + coneHeight/2} 
            rx={coneRadius} 
            ry={coneRadius/3}
            fill="#34D399"
            stroke="#065F46"
            strokeWidth="2"
          />
        </svg>
      );

    case 'cube':
      const cubeSize = Math.max(Math.min(dimensions.width || 0, dimensions.height || 0, dimensions.depth || 0) * scale, 20);
      return (
        <svg width="300" height="300" viewBox="0 0 300 300">
          <defs>
            <linearGradient id={`cubeGradient-${Date.now()}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
          </defs>
          <rect 
            x={centerX - cubeSize/2} 
            y={centerY - cubeSize/2} 
            width={cubeSize} 
            height={cubeSize}
            fill={`url(#cubeGradient-${Date.now()})`}
            stroke="#92400E"
            strokeWidth="2"
          />
          <polygon 
            points={`${centerX - cubeSize/2},${centerY - cubeSize/2} ${centerX - cubeSize/2 + 20},${centerY - cubeSize/2 - 20} ${centerX + cubeSize/2 + 20},${centerY - cubeSize/2 - 20} ${centerX + cubeSize/2},${centerY - cubeSize/2}`}
            fill="#FCD34D"
            stroke="#92400E"
            strokeWidth="2"
          />
          <polygon 
            points={`${centerX + cubeSize/2},${centerY - cubeSize/2} ${centerX + cubeSize/2 + 20},${centerY - cubeSize/2 - 20} ${centerX + cubeSize/2 + 20},${centerY + cubeSize/2 - 20} ${centerX + cubeSize/2},${centerY + cubeSize/2}`}
            fill="#FBBF24"
            stroke="#92400E"
            strokeWidth="2"
          />
        </svg>
      );

    default:
      return null;
  }
};

export default WeldingTecVolumeCalculator;