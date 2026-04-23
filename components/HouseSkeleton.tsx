export function HouseSkeleton() {
  return (
    <div className="w-[768px] flex flex-row bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden animate-pulse">
      <div className="w-72 shrink-0 h-45 bg-zinc-200" />
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="flex flex-col gap-3">
          <div className="h-7 w-36 bg-zinc-200 rounded" />
          <div className="h-5 w-64 bg-zinc-200 rounded" />
          <div className="h-4 w-32 bg-zinc-200 rounded" />
        </div>
        <div className="h-9 w-28 bg-zinc-200 rounded self-end" />
      </div>
    </div>
  );
}
