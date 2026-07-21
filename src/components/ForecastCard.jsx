import { GlassCard } from './GlassCard';

export function ForecastCard({ day, temp, icon: Icon }) {
  return (
    <GlassCard className="flex flex-col items-center justify-center text-center gap-3 p-4">
      <div className="text-sm text-white/70">{day}</div>
      {Icon && <Icon className="w-8 h-8 text-white my-2" />}
      <div className="text-lg font-medium text-white">{temp}</div>
    </GlassCard>
  );
}
