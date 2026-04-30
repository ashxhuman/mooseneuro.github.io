"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { formatDate } from "@/utils";
interface BlogPost {
  id: string;
  data: {
    title: string;
    image?: string;
    date: Date;
  };
}

interface Props {
  blogs: BlogPost[];
}

export default function BlogCarouselWrapper({ blogs }: Props) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {blogs.map((blog) => (
          <CarouselItem key={blog.id} className="object-cover">
            <a href={`/blogs/${blog.id}`} className="block w-full h-64 sm:h-80 md:h-[600px]">
              <div className="w-full h-full flex flex-col relative">
                {blog.data.image && (
                  <img
                    src={blog.data.image}
                    alt={blog.data.title}
                    className="w-full h-full object-cover hover:brightness-90 transition-all duration-300 absolute inset-0"
                  />
                )}
                <div className="p-3 sm:p-5 flex flex-col gap-2 absolute bottom-0 left-0 right-0 bg-black/50">
                  <h3 className="font-semibold text-lg sm:text-2xl md:text-4xl lg:text-5xl line-clamp-2 text-white pb-1" dangerouslySetInnerHTML={{ __html: blog.data.title }}>
                  </h3>
                  <time dateTime={new Date(blog.data.date).toISOString()} className="text-xs sm:text-sm text-gray-200 mb-1 sm:mb-2">
                    {formatDate(blog.data.date)}
                  </time>
                </div>
              </div>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 z-10 size-10 bg-white/80 hover:bg-white border-none shadow-md" />
      <CarouselNext className="right-3 z-10 size-10 bg-white/80 hover:bg-white border-none shadow-md" />
    </Carousel>
  );
}
