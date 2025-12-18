import { useTheme } from '@/contexts/ThemeContext';

interface AuraBackgroundProps {
  forceColor?: string;
}

export function AuraBackground({ forceColor }: AuraBackgroundProps) {
  const { character } = useTheme();
  
  // Use forced color for auth pages (default blue), otherwise use character color
  const auraColor = forceColor || character.color;
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Primary aura - top right */}
      <div 
        className="absolute top-[-20%] right-[-10%] w-[70%] h-[60%] rounded-full blur-[150px] opacity-[0.12]"
        style={{ backgroundColor: auraColor }}
      />
      {/* Secondary aura - bottom left */}
      <div 
        className="absolute bottom-[-15%] left-[-20%] w-[60%] h-[50%] rounded-full blur-[130px] opacity-[0.10]"
        style={{ backgroundColor: auraColor }}
      />
      {/* Center accent glow */}
      <div 
        className="absolute top-[40%] left-[40%] w-[40%] h-[35%] rounded-full blur-[100px] opacity-[0.06]"
        style={{ backgroundColor: auraColor }}
      />
      {/* Subtle top glow */}
      <div 
        className="absolute top-[5%] left-[20%] w-[30%] h-[25%] rounded-full blur-[80px] opacity-[0.05]"
        style={{ backgroundColor: auraColor }}
      />
    </div>
  );
}
