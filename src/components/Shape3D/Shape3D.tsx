import React from 'react';
import { ShapeType, Dimensions } from '../../types';

interface Shape3DProps {
  type: ShapeType;
  dimensions: Dimensions;
  isInverted?: boolean;
}

const Shape3D: React.FC<Shape3DProps> = ({ type, dimensions, isInverted = false }) => {
  const scale = 0.05;
  const centerX = 150;
  const centerY = 150;

  const renderCylinder = () => {
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
  };

  const renderCone = () => {
    const coneRadius = Math.max((dimensions.radius || 0) * scale, 10);
    const coneHeight = Math.max((dimensions.height || 0) * scale, 20);
    
    const topY = isInverted ? centerY + coneHeight/2 : centerY - coneHeight/2;
    const bottomY = isInverted ? centerY - coneHeight/2 : centerY + coneHeight/2;
    const baseY = isInverted ? centerY - coneHeight/2 : centerY + coneHeight/2;
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300">
        <defs>
          <linearGradient id={`coneGradient-${Date.now()}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#065F46" />
          </linearGradient>
        </defs>
        <polygon 
          points={`${centerX},${topY} ${centerX - coneRadius},${bottomY} ${centerX + coneRadius},${bottomY}`}
          fill={`url(#coneGradient-${Date.now()})`}
          stroke="#065F46"
          strokeWidth="2"
        />
        <ellipse 
          cx={centerX} 
          cy={baseY} 
          rx={coneRadius} 
          ry={coneRadius/3}
          fill="#34D399"
          stroke="#065F46"
          strokeWidth="2"
        />
      </svg>
    );
  };

  const renderConicReduction = () => {
    const topRadius = Math.max((dimensions.topRadius || 0) * scale, 10);
    const bottomRadius = Math.max((dimensions.bottomRadius || 0) * scale, 10);
    const reductionHeight = Math.max((dimensions.height || 0) * scale, 20);
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300">
        <defs>
          <linearGradient id={`reductionGradient-${Date.now()}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>
        </defs>
        {/* Corpo da redução cônica */}
        <polygon 
          points={`${centerX - topRadius},${centerY - reductionHeight/2} ${centerX + topRadius},${centerY - reductionHeight/2} ${centerX + bottomRadius},${centerY + reductionHeight/2} ${centerX - bottomRadius},${centerY + reductionHeight/2}`}
          fill={`url(#reductionGradient-${Date.now()})`}
          stroke="#5B21B6"
          strokeWidth="2"
        />
        {/* Elipse superior */}
        <ellipse 
          cx={centerX} 
          cy={centerY - reductionHeight/2} 
          rx={topRadius} 
          ry={topRadius/3}
          fill="#A78BFA"
          stroke="#5B21B6"
          strokeWidth="2"
        />
        {/* Elipse inferior */}
        <ellipse 
          cx={centerX} 
          cy={centerY + reductionHeight/2} 
          rx={bottomRadius} 
          ry={bottomRadius/3}
          fill="#7C3AED"
          stroke="#5B21B6"
          strokeWidth="2"
        />
      </svg>
    );
  };

  const renderCube = () => {
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
  };

  switch(type) {
    case 'cylinder':
      return renderCylinder();
    case 'cone':
      return renderCone();
    case 'conicReduction':
      return renderConicReduction();
    case 'cube':
      return renderCube();
    default:
      return null;
  }
};

export default Shape3D;