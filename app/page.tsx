"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getHouses } from "./lib/api";
import ErrorPage from "./error/page";
import { House } from "./types";
import { HouseSkeleton } from "../components/HouseSkeleton";
import { HouseCard } from "@/components/HouseCard";
import { SideBar } from "@/components/SideBar";
import { ERROR_MESSAGES } from "./const/error";
import { v4 as uuidv4 } from "uuid";

const PER_PAGE = 10;
const EMPTY_HOUSE_MESSAGE = "No more houses to load";
const FILTERED_HOUSE_MESSAGE = "No results for the applied filters";

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

  const toggleFavoriteHouse = (house: House) => {
    setFavoritesHouses((prev) => {
      const isFavorite = prev.some((fav) => fav.id === house.id);
      if (isFavorite) return prev.filter((fav) => fav.id !== house.id);
      return [...prev, house];
    });
  };

  const fetchHouses = () => {
    getHouses({ page: 1, perPage: PER_PAGE })
      .then(({ houses }) => {
        // Has to add this because the IDs of the houses are not unique and it causes issues with favorites feature
        const housesWithUid = houses.map((h) => ({ ...h, uuid: uuidv4() }));
        setHouses(housesWithUid);
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
      const housesWithUid = newHouses.map((h) => ({ ...h, uuid: uuidv4() }));
      setHouses((prev) => [...prev, ...housesWithUid]);
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

  const showFilteredMessage =
    filteredHouses.length === 0 && !isFetchingMore && houses.length > 0;

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
    <div className="flex flex-col flex-1 items-center font-sans dark:bg-black">
      <SideBar
        onHomeownerChange={setHomeowner}
        onAddressChange={setAddress}
        onSortByChange={setSortBy}
        onShowFavoritesChange={setShowFavorites}
        onClearFilter={clearFilters}
      />

      {showFilteredMessage && (
        <p className="text-center text-primary py-6">
          {FILTERED_HOUSE_MESSAGE}
        </p>
      )}

      <InfiniteScroll
        className=" w-full"
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
            <p className="text-center text-primary py-6">
              {EMPTY_HOUSE_MESSAGE}
            </p>
          )
        }
        scrollThreshold={0.9}
      >
        <ul className="flex flex-col gap-4 w-full max-w-3xl px-4">
          {filteredHouses.map((house) => (
            <li key={house.uuid} className="w-full">
              <HouseCard house={house} onLikeToggle={toggleFavoriteHouse} />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}
