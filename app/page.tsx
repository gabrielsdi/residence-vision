"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getHouses } from "./lib/api";
import ErrorPage from "./error/page";
import { House } from "./types";
import { HouseSkeleton } from "./skeleton/page";
import { HouseCard } from "@/components/HouseCard";
import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import { ERROR_MESSAGES } from "./const/error";

const PER_PAGE = 10;
const EMPTY_HOUSE_MESSAGE = "No more houses to load";

export default function Home() {
  const [houses, setHouses] = useState<House[]>([]);
  const [favoritesHouses, setFavoritesHouses] = useState<House[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");

  //Filter status
  const [homeowner, setHomeowner] = useState("");
  const [address, setAddress] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  const isFiltering = !!homeowner || !!address || showFavorites;

  const clearFilters = () => {
    setHomeowner("");
    setAddress("");
    setSortBy("");
    setFavoritesHouses([]);
  };

  const addFavoriteHouse = (house: House) => {
    setFavoritesHouses((prev) => [...prev, house]);
  };

  const handleHouseClick = (house: House) => {
    console.log("Click", house);
  };

  const fetchHouses = () => {
    getHouses({ page: 1, perPage: PER_PAGE })
      .then(({ houses }) => {
        setHouses(houses);
        setHasMore(houses.length === PER_PAGE);
      })
      .catch((e: Error | unknown) => {
        const errorMsg =
          e instanceof Error ? e.message : ERROR_MESSAGES.UNKNOWN_ERROR;
        setErrorStatus(errorMsg);
        setError(true);
      });
  };

  const fetchMoreHouses = async () => {
    if (isFetchingMore) return;
    setIsFetchingMore(true);
    const nextPage = page + 1;
    try {
      const { houses: newHouses } = await getHouses({
        page: nextPage,
        perPage: PER_PAGE,
      });
      setHouses((prev) => [...prev, ...newHouses]);
      setPage(nextPage);
      setHasMore(newHouses.length === PER_PAGE);
    } catch (e: Error | unknown) {
      const errorMsg =
        e instanceof Error ? e.message : ERROR_MESSAGES.UNKNOWN_ERROR;
      setErrorStatus(errorMsg);
      setError(true);
    } finally {
      setIsFetchingMore(false);
    }
  };

  const filteredHouses = houses
    .filter((house) => {
      if (showFavorites && !favoritesHouses.some((fav) => fav.id === house.id))
        return false;
      if (
        homeowner &&
        !house.homeowner.toLowerCase().includes(homeowner.toLowerCase())
      )
        return false;
      if (
        address &&
        !house.address.toLowerCase().includes(address.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "Lowest price") return a.price - b.price;
      if (sortBy === "Highest price") return b.price - a.price;
      return 0;
    });

  useEffect(() => {
    fetchHouses();
  }, []);

  if (error)
    return (
      <ErrorPage
        errorStatus={errorStatus}
        handleClick={() => window.location.reload()}
      />
    );

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <SideBar
        onHomeownerChange={setHomeowner}
        onAddressChange={setAddress}
        onSortByChange={setSortBy}
        onShowFavoritesChange={setShowFavorites}
        onClearFilter={clearFilters}
      />

      <InfiniteScroll
        className="pt-26 w-full"
        style={{ minWidth: "100%", overflow: "visible" }}
        dataLength={houses.length}
        next={fetchMoreHouses}
        hasMore={!isFiltering && hasMore}
        loader={
          isFetchingMore ? (
            <ul className="flex flex-col gap-4 w-full max-w-3xl px-4 min-w-0">
              {Array.from({ length: 3 }).map((_, i) => (
                <li key={i}>
                  <HouseSkeleton />
                </li>
              ))}
            </ul>
          ) : null
        }
        endMessage={
          !isFiltering && (
            <p className="text-center text-gray-400 py-6">
              {EMPTY_HOUSE_MESSAGE}
            </p>
          )
        }
        scrollThreshold={0.9}
      >
        <ul className="flex flex-col gap-4 w-full max-w-3xl px-4">
          {filteredHouses.map((house, index) => (
            <li key={`${house.id}-${index}`} className="w-full">
              <HouseCard
                house={house}
                onLikeToggle={addFavoriteHouse}
                onClick={handleHouseClick}
              />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}
