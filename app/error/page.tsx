"use client";

export default function ErrorPage({ errorStatus, handleClick }: { 
  errorStatus: string; 
  handleClick: () => void 
}) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black">
      <h1 className="text-2xl font-bold mb-4">{errorStatus}</h1>
      <p className="text-red-500">Ops houses can't be loaded</p>
      <button onClick={handleClick} className="mt-4 underline text-sm">
        Retry
      </button>
    </div>
  );
}