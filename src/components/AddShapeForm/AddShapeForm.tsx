import React from 'react';
import { Plus } from 'lucide-react';
import { ShapeType } from '../../types';
import { shapeConfigs } from '../../constants/shapeConfigs';

interface AddShapeFormProps {
  selectedShape: ShapeType | '';
  onShapeSelect: (shape: ShapeType | '') => void;
  onAddShape: () => void;
}

const AddShapeForm: React.FC<AddShapeFormProps> = ({
  selectedShape,
  onShapeSelect,
  onAddShape
}) => {
  return (
    <div className="card mb-6">
        <p>Adicione varias formas geométricas para calcular o volume total do tanque</p>
        <br />
      <h2 className="text-xl font-semibold mb-4">Adicionar Forma</h2>
      
      <div className="flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-2">Tipo de Forma</label>
          <select 
            value={selectedShape} 
            onChange={(e) => onShapeSelect(e.target.value as ShapeType | '')}
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
          onClick={onAddShape}
          disabled={!selectedShape}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default AddShapeForm;