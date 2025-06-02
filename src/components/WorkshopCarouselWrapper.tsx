"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface Workshops {
  id: string;
  data: {
    title: string;
    image?: string;
    carouselheading: string;
  };
}

interface CarouselSpacingProps {
  allworkshops: Workshops[];
}

export default function CarouselSpacing({
  allworkshops,
}: CarouselSpacingProps) {
  return (
    <div className="w-full p-12">
      <h2 className="text-4xl font-semibold lg:text-5xl p-10 text-center text-black">
        All Workshops
      </h2>
      <Carousel className="w-full">
        <CarouselContent>
          {allworkshops.map((workshop: any) => (
            <CarouselItem
              key={workshop.id}
              className="basis-2/3 md:basis-2/3 lg:basis-1/4"
            >
              <div className="h-full">
                <Card className="flex flex-col w-full h-full border-bg-brand-primary py-0">
                  <CardContent className="h-full w-full p-0">
                    <a
                      href={`/workshops/${workshop.id}`}
                      className="flex h-full w-full items-center justify-center p-0"
                    >
                      <img
                        src={workshop.data.image || "/moose_placeholder.svg"}
                        alt={workshop.data.title}
                        className="h-full w-full object-contain hover:border-1 hover:border-highlight-neon bg-brand-secondary"
                      />
                    </a>
                  </CardContent>
                  <p className="m-1 text-center h-15 text-sm">
                    {workshop.data.carouselheading}
                  </p>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
