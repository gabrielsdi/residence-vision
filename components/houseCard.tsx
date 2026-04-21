'use client'
import { useState } from 'react'
import { HeartIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { House } from '@/app/types'

export function HouseCard({ house }: { house: House }) {
  const [liked, setLiked] = useState<boolean>(false)

  return (
    <div className="w-full max-w-3xl flex flex-row bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden">   
      <div className="relative w-72 h-45 shrink-0">
        <Image
          src={house.photoURL}
          alt={`Photo of ${house.address}`}
          fill
          className="object-cover"
        />
      </div>

   
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <span className="text-2xl font-bold">${house.price.toLocaleString()}</span>
            <Button
              size='icon'
              variant='ghost'
              onClick={() => setLiked(!liked)}
              className='rounded-full'
            >
              <HeartIcon className={cn('w-5 h-5', liked ? 'fill-red-500 stroke-red-500' : 'stroke-muted-foreground')} />
            </Button>
          </div>
          <div>
            <h2 className="text-base font-bold">{house.address}</h2>
            <p className="text-sm text-muted-foreground">{house.homeowner}</p>
          </div>
        </div>

        <Button className="self-end">View details</Button>
      </div>
    </div>
  )
}