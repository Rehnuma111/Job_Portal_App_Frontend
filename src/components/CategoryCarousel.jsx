import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];
const CategoryCarousel = () => {
  return (
    <section className="w-full px-1 sm:px-4 my-10">
      <Carousel className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-[80%] xs:basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center px-1"
            >
              <Button
                variant="ghost"
                className="rounded-full w-full text-xs sm:text-sm md:text-base py-2 px-3 sm:px-4 whitespace-nowrap border border-gray-200 bg-white/80 hover:bg-[#f6f4fd] text-[#4B2996] font-semibold shadow-none transition-all font-sans"
                style={{ minWidth: 120 }}
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:flex justify-between items-center w-full absolute top-1/2 left-0 px-2 z-10 pointer-events-none">
          <div className="pointer-events-auto">
            <CarouselPrevious />
          </div>
          <div className="pointer-events-auto">
            <CarouselNext />
          </div>
        </div>
      </Carousel>
      <div className="sm:hidden text-center text-xs text-gray-400 mt-2 select-none">Swipe left/right to see more categories</div>
    </section>
  );
};

export default CategoryCarousel;
