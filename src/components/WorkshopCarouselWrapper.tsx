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
    <div className="w-full p-11">
      <h2 className="text-center text-2xl font-bold mb-4">All Workshops</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {allworkshops.map((workshop: any) => (
            <CarouselItem
              key={workshop.id}
              className="basis-2/3 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-2">
                <Card className="w-full h-full">
                  <CardContent className="flex aspect-square items-center justify-center">
                    <a
                      href={`/workshops/${workshop.id}`}
                      className="text-center"
                    >
                      <img
                        src={workshop.data.image || "/images/placeholder.png"}
                        alt={workshop.data.title}
                        className="object-cover"
                      />
                    </a>
                  </CardContent>
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
