"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getHouses } from "./lib/api";
import ErrorPage from "./error/page";
import { House } from "./types";
import Loading from "./loading/page";

export default function Home() {

  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorStatus, setErrorStatus] = useState('');

   useEffect(() => {
    getHouses()
      .then(({ houses }) => setHouses(houses))
      .catch((e) => {
        setErrorStatus(e.message);
        setError(true)})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (error)   return <ErrorPage errorStatus={errorStatus} handleClick={() => window.location.reload()} />;


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <header className="w-full bg-white shadow-md p-4 mb-6">
        <h1 className="text-3xl font-bold text-center text-black">Residence Vision</h1>
      </header>
      <ul>
        {houses?.map((house) => (
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
    </div>
  );
}
