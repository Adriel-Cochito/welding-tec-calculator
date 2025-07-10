import React, { useState, useCallback } from 'react';
import { Calculator } from 'lucide-react';
import { Shape, ShapeType, Dimensions } from './types';
import { calculateVolume } from './utils/calculations';
import { shapeConfigs } from './constants/shapeConfigs';
import Header from './components/Header';
import AddShapeForm from './components/AddShapeForm';
import ShapeCard from './components/ShapeCard';

const WeldingTecVolumeCalculator: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShape, setSelectedShape] = useState<ShapeType | ''>('');

  const addShape = useCallback(() => {
    if (!selectedShape) return;
    
    const config = shapeConfigs.find(c => c.type === selectedShape);
    if (!config) return;

    const newShape: Shape = {
      id: Date.now(),
      type: selectedShape,
      dimensions: config.defaultDimensions,
      volume: calculateVolume(selectedShape, config.defaultDimensions),
      isInverted: false
    };
    
    setShapes(prev => [...prev, newShape]);
    setSelectedShape('');
  }, [selectedShape]);

  const removeShape = useCallback((id: number) => {
    setShapes(prev => prev.filter(shape => shape.id !== id));
  }, []);

  const updateDimensions = useCallback((id: number, newDimensions: Dimensions) => {
    setShapes(prev => prev.map(shape => 
      shape.id === id 
        ? { ...shape, dimensions: newDimensions, volume: calculateVolume(shape.type, newDimensions) }
        : shape
    ));
  }, []);

  const toggleInvert = useCallback((id: number) => {
    setShapes(prev => prev.map(shape => 
      shape.id === id 
        ? { ...shape, isInverted: !shape.isInverted }
        : shape
    ));
  }, []);

  const getTotalVolume = useCallback((): number => {
    return shapes.reduce((total, shape) => total + (shape.volume || 0), 0);
  }, [shapes]);

  const getShapeDisplayName = useCallback((type: ShapeType): string => {
    const config = shapeConfigs.find(c => c.type === type);
    return config?.displayName || type;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <AddShapeForm
          selectedShape={selectedShape}
          onShapeSelect={setSelectedShape}
          onAddShape={addShape}
        />

        {/* Shapes List */}
        <div className="space-y-6">
          {shapes.map((shape, index) => (
            <ShapeCard
              key={shape.id}
              shape={shape}
              index={index}
              onUpdate={updateDimensions}
              onRemove={removeShape}
              onToggleInvert={toggleInvert}
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
                {(getTotalVolume() * 1000).toFixed(2)} L
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

export default WeldingTecVolumeCalculator;
