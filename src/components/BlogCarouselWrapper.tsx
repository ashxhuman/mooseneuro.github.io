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
  slug: string;
}

interface Props {
  blogs: BlogPost[];
}

export default function BlogCarouselWrapper({ blogs }: Props) {
  return (
    <Carousel className="w-full p-10">
      <CarouselContent>
        {blogs.map((blog) => (
          <CarouselItem key={blog.slug} className="pl-6 object-cover">
            <a href={`/blogs/${blog.slug}`} className="block w-full h-[600px]">
              <div className="w-full h-full flex flex-col relative">
                {blog.data.image && (
                  <img
                    src={blog.data.image}
                    alt={blog.data.title}
                    className="w-full h-full object-cover hover:brightness-90 transition-all duration-300 group-hover:scale-105 absolute inset-0"
                  />
                )}
                <div className="p-5 flex-1 h-35 flex flex-col justify-between absolute bottom-0 left-0 right-0 bg-black/40">
                  <h3 className="font-semibold text-5xl h-full line-clamp-2 text-white">
                    {blog.data.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-100 mb-4">
                    <time dateTime={new Date(blog.data.date).toISOString()} className="text-sm">
                      {formatDate(blog.data.date)}
                    </time>
                  </div>
                </div>
              </div>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}
