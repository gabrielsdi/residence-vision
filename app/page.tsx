"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { House as HouseIcon } from "lucide-react";
import { getHouses } from "./lib/api";
import ErrorPage from "./error/page";
import { House } from "./types";
import { HouseSkeleton } from "./skeleton/page";
import { HouseCard } from "@/components/houseCard";


const PER_PAGE = 10;

export default function Home() {
  const [houses, setHouses] = useState<House[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");

  // Carga inicial
  useEffect(() => {
    getHouses({ page: 1, perPage: PER_PAGE })
      .then(({ houses }) => {
        setHouses(houses);
        setHasMore(houses.length === PER_PAGE);
      })
      .catch((e) => {
        setErrorStatus(e.message);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);


 const fetchMoreHouses = async () => {
  if (isFetchingMore) return; 
  setIsFetchingMore(true);
  const nextPage = page + 1;
  try {
    const { houses: newHouses } = await getHouses({ page: nextPage, perPage: PER_PAGE });
    setHouses((prev) => [...prev, ...newHouses]);
    setPage(nextPage);
    setHasMore(newHouses.length === PER_PAGE);
  } catch (e: any) {
    setErrorStatus(e.message);
    setError(true);
  } finally {
    setIsFetchingMore(false);
  }
};

  if (loading) return (
  <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <header className="w-full bg-white shadow-md p-4 mb-6 top-0 z-10 fixed">
        <div className="flex items-center justify-start gap-2">
          <HouseIcon className="w-10 h-10 text-indigo-500" />
          <h1 className="text-xl font-bold text-indigo-500">Residence Vision</h1>
        </div>
      </header>
      <div className="pt-24 w-full"></div>
    <ul className="flex flex-col gap-4 w-full max-w-3xl px-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i}><HouseSkeleton /></li>
      ))}
    </ul>
  </div>
);
  if (error) return <ErrorPage errorStatus={errorStatus} handleClick={() => window.location.reload()} />;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <header className="w-full bg-white shadow-md p-4 mb-6 top-0 z-10 fixed">
        <div className="flex items-center align-bottom justify-start gap-2">
          <HouseIcon className="w-10 h-10 text-indigo-500" />
          <h1 className="text-xl font-bold text-indigo-500">Residence Vision</h1>
        </div>
      </header>

      <div className="pt-24 w-full"></div>

      <InfiniteScroll
        dataLength={houses.length}
        next={fetchMoreHouses}   
        hasMore={hasMore}     
        loader={
  isFetchingMore ? (
    <ul className="flex flex-col gap-4 w-full max-w-3xl px-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i}><HouseSkeleton /></li>
      ))}
    </ul>
  ) : null
}
        endMessage={
          <p className="text-center text-gray-400 py-6">No hay más propiedades.</p>
        }
        scrollThreshold={0.9}
      >
        <ul className="flex flex-col gap-4 w-full max-w-3xl px-4">
          {houses.map((house) => (
            <li key={house.id} className="w-full">              
              <HouseCard house={house} />
            </li> 
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}