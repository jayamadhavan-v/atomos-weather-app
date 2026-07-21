
import { GlassCard } from './GlassCard';

export function WeatherCard({ title, value, icon: Icon, description }) {
  return (
    <GlassCard className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-white/70">
        <h3 className="text-sm font-medium">{title}</h3>
        {Icon && <Icon className="w-5 h-5" />}
      </div>
      <div>
        <div className="text-3xl font-light text-white text-glow">{value}</div>
        {description && <div className="text-xs text-white/50 mt-1">{description}</div>}
      </div>
    </GlassCard>
  );
}
