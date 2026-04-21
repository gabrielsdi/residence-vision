"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getHouses } from "./lib/api";
import ErrorPage from "./error/page";
import { House } from "./types";
import { HouseSkeleton } from "./skeleton/page";

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
    <header className="w-full bg-white shadow-md p-4 mb-6">
      <h1 className="text-3xl font-bold text-center text-black">Residence Vision</h1>
    </header>
    <ul>
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i}><HouseSkeleton /></li>
      ))}
    </ul>
  </div>
);
  if (error) return <ErrorPage errorStatus={errorStatus} handleClick={() => window.location.reload()} />;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <header className="w-full bg-white shadow-md p-4 mb-6">
        <h1 className="text-3xl font-bold text-center text-black">Residence Vision</h1>
      </header>

      <InfiniteScroll
        dataLength={houses.length}
        next={fetchMoreHouses}   
        hasMore={hasMore}     
        loader={
  isFetchingMore ? (
    <ul>
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
        <ul>
          {houses.map((house) => (
            <li key={house.id}>
              <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4 mb-6">
                <Image
                  src={house.photoURL}
                  alt={`Photo of ${house.address}`}
                  width={400}
                  height={300}
                  className="rounded-lg mb-4"
                />
                <h2 className="text-xl text-black font-bold">{house.address}</h2>
                <p className="text-black">Homeowner: {house.homeowner}</p>
                <p className="text-black">Price: ${house.price.toLocaleString()}</p>
              </div>
            </li> 
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}