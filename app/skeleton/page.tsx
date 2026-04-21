export function HouseSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4 mb-6 w-[400px] animate-pulse">
      <div className="w-[400px] h-[300px] bg-zinc-200 rounded-lg mb-4" />
      <div className="h-5 w-48 bg-zinc-200 rounded mb-2" />
      <div className="h-4 w-36 bg-zinc-200 rounded mb-2" />
      <div className="h-4 w-24 bg-zinc-200 rounded" />
    </div>
  );
}