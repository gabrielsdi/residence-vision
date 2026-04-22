"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getHouses } from "./lib/api";
import ErrorPage from "./error/page";
import { House } from "./types";
import { HouseSkeleton } from "./skeleton/page";
import { HouseCard } from "@/components/houseCard";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";


const PER_PAGE = 10;

export default function Home() {
  const [houses, setHouses] = useState<House[]>([]);
  const [favoritesHouses, setFavoritesHouses] = useState<House[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");

  //Filter status
  const [homeowner, setHomeowner] = useState('');
const [address, setAddress] = useState('');
const [sortBy, setSortBy] = useState('');
const [showFavorites, setShowFavorites] = useState(false);

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
  } catch (e: Error | unknown) {
    const errorMsg = e instanceof Error ? e.message : 'Unknown error';
    setErrorStatus(errorMsg);
    setError(true);
  } finally {
    setIsFetchingMore(false);
  }
};



const clearFilters = () => {
  setHomeowner('');
  setAddress('');
    setSortBy('');
    setFavoritesHouses([]);
}

const addFavoriteHouse = (house: House) => {
  setFavoritesHouses((prev) => [...prev, house]);
}

const isFiltering = !!homeowner || !!address || showFavorites;


const filteredHouses = houses.filter(house => {
  if (showFavorites && !favoritesHouses.some(fav => fav.id === house.id)) return false;
  if (homeowner && !house.homeowner.toLowerCase().includes(homeowner.toLowerCase())) return false;
  if (address && !house.address.toLowerCase().includes(address.toLowerCase())) return false;
  return true;
}).sort((a, b) => {
  if (sortBy === 'Lowest price') return a.price - b.price;
  if (sortBy === 'Highest price') return b.price - a.price;
  return 0;
});

  if (error) return <ErrorPage errorStatus={errorStatus} handleClick={() => window.location.reload()} />;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     
  <Header />
  <Sidebar 
    onHomeownerChange={setHomeowner}
    onAddressChange={setAddress}
    onSortByChange={setSortBy}
    onShowFavoritesChange={setShowFavorites}
    onClearFilter={clearFilters}
  />
  {loading && (
    <ul className="flex flex-col gap-4 w-full max-w-3xl px-4 pt-26">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i}><HouseSkeleton /></li>
      ))}
    </ul>
  )}
      
      <InfiniteScroll className="pt-26 w-full"
      style={{ minWidth: '100%', overflow: 'visible' }}
        dataLength={houses.length}
        next={fetchMoreHouses}   
        hasMore={!isFiltering && hasMore}      
        loader={
  isFetchingMore ? (
    <ul className="flex flex-col gap-4 w-full max-w-3xl px-4 min-w-0">
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
          {filteredHouses.map((house) => (
            <li key={house.id} className="w-full">              
              <HouseCard house={house} onLike={addFavoriteHouse} />
            </li> 
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}