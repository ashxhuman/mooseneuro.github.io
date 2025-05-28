"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function CarouselSpacing({ allworkshops }) {
  return (
    <div className="w-full p-12">
      <h2 className="text-5xl font-semibold sm:text-3xl p-10 text-center text-black">
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
                <Card className="w-full h-full border-bg-brand-primary py-0">
                  <CardContent className="flex h-full w-full p-0">
                    <a
                      href={`/workshops/${workshop.id}`}
                      className="flex h-full w-full items-center justify-center"
                    >
                      <img
                        src={workshop.data.image || "/moose_logo.png"}
                        alt={workshop.data.title}
                        className="h-full w-full object-fit hover:border-1 hover:border-highlight-neon"
                      />
                    </a>
                  </CardContent>
                  <p className="text-center h-15 text-sm">
                    {workshop.data.title}
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
