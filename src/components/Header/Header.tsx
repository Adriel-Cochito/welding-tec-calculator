import React from 'react';
import { Calculator } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="card mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welding Tec</h1>
          <p className="text-gray-600">Calculadora de Volume de Tanques</p>
        </div>
        <Calculator className="text-blue-600" size={48} />
      </div>
    </div>
  );
};

export default Header;