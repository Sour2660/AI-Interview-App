interface TimerProps {
  seconds: number;
}

function Timer({ seconds }: TimerProps) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-700 shadow-sm">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Session timer</p>
      <p className="mt-3 text-3xl font-semibold">{`${minutes.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`}</p>
      <p className="mt-1 text-sm text-slate-500">Keep your answers clear and concise.</p>
    </div>
  );
}

export default Timer;
