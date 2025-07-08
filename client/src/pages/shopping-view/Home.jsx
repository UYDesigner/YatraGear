import React from 'react';
import fishHero from '../../assets/fish-hero.avif';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useSelector } from 'react-redux';
import FeatureCard from '@/components/shopping-view/heroSecition/FeatureCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const { features } = useSelector(state => state.adminFeaturedImage)
  const { categoryList } = useSelector((store) => store.adminCategory);
  const { brandsList } = useSelector((store) => store.adminBrand);
  const { productList } = useSelector((state) => state.adminProduct)
  const navigate = useNavigate();

  const hotThisWeekProductsList = productList?.filter(
    (product) => product?.offerType === 'HOT THIS WEEK'
  );

  const newArrivalProductList = productList?.filter((product) => product.isNewArrival === true)
  // console.log(newArrivalProductList, "new arrival")

  const handleNavigateFromHomeToListing = (getCurrentItem, section) => {

    sessionStorage.removeItem('filters')
    // console.log(getCurrentItem, section)
    const currentFilter = {
      [section]: [getCurrentItem]
    }

    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    navigate('/shop/listing')
  }


  return (
    <div className='w-full mt-2 lg:mt-5'>
      {/* Hero Banner Carousel */}

      <div className='w-full relative'>
        <Carousel
          opts={{
            loop: true,
            align: "center",
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnMouseEnter: false,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            { features && features.length > 0 &&  features.map((slide, index) => (
              <CarouselItem
                key={index}
                className="w-full"
              >
                <div className="relative w-full lg:h-120">
                  <img
                    src={slide.image}
                    alt={slide.name}
                    className="w-full h-full object-contain lg:object-cover"
                  />
                </div>
              </CarouselItem>
            ))}

          </CarouselContent>
        </Carousel>

        {/* Brand Carousel */}
        {brandsList && brandsList.length > 0 && (
          <div className="w-full mt-8 px-2 lg:px-8 overflow-hidden lg:absolute lg:top-100">
            {/* <h2 className="text-xl font-semibold mb-4 w-full  flex  justify-center  lg:hidden">Shop By Brands</h2> */}
            <Carousel
              opts={{
                loop: true,
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent className="flex items-center">
                {brandsList.map((brand, index) => (
                  <CarouselItem
                    key={index}
                    onClick={() => handleNavigateFromHomeToListing(brand._id, "brand")}
                    className="basis-1/4 sm:basis-1/4 md:basis-1/6 lg:basis-1/9 px-2"
                  >
                    <div className="bg-[#eae9e5] rounded-xl p-2 lg:p-6 shadow hover:scale-105 transition-transform flex flex-col items-center">
                      <img
                        src={brand.image}
                        alt={brand.brandName}
                        className=" h-15 w-15 md:w-25 md:h-25 object-contain mb-2"
                      />
                      <p className="text-sm font-medium text-center hidden lg:block">{brand.brandName}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation Buttons at Bottom Center */}
              <div className="w-full h-12 relative hidden lg:flex">
                <CarouselPrevious className="absolute top-6 lg:top-8  left-0 bg-gray-100 rounded-full hover:bg-gray-200" />
                <CarouselNext className="bg-gray-100 rounded-full top-6 lg:top-8 left-10 hover:bg-gray-200" />
              </div>


            </Carousel>
          </div >
        )}
      </div>
      {/* Shop By hot this week */}
      <div className=' max-w-[1600px]  md:py-5 mx-auto w-full  lg:mt-40'>
        {productList && hotThisWeekProductsList && hotThisWeekProductsList.length > 0 && (
          <div className="w-full mt-8 px-2 lg:px-8  overflow-hidden ">
            <h2 className="text-xl lg:text-2xl pb-4 md:pb-7 font-bold mb-4 w-full text-center tracking-wide  text-[#454a1b] ">
              HOT THIS WEEK
            </h2>

            <Carousel
              opts={{
                loop: true,
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent className="flex items-center">
                {hotThisWeekProductsList.map((product) => (
                  <CarouselItem
                    key={product._id}
                    className="basis-1/2 md:basis-1/3 lg:basis-1/5"
                  >
                    <FeatureCard product={product} key={product._id} />
                  </CarouselItem>
                ))}
              </CarouselContent>



            </Carousel>
          </div >
        )}


      </div>

      {/* second poster */}
      <div className='w-full relative  lg:h-100 my-10 md:my-15'>
        <img src={fishHero} alt="" className="w-full h-full object-contain lg:object-cover" />
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <div className="bg-black/50 text-white p-6 rounded-xl max-w-2xl">
            <h2 className="text-xl md:text-4xl font-bold leading-tight mb-2">
              Pack Smart. Trek Bold.
            </h2>
            <p className=" text-sm md:text-xl">
              With <span className="font-semibold">YatraGear</span>, you're always ready —<br />
              <span className="text-yellow-400 font-semibold">Save up to 45%</span> on outdoor essentials!
            </p>
          </div>
        </div>
      </div>



      {/* Shop by categories */}
      <div className=' max-w-[1600px]  lg:my-10   mx-auto w-full  '>
        {categoryList && categoryList?.length > 0 && (
          <div className="w-full    overflow-hidden ">
            <h2 className="text-xl lg:text-2xl pb-4 md:pb-7 font-bold mb-4 w-full text-center tracking-wide  text-[#454a1b] ">
              SHOP BY CATEGORY
            </h2>

            <Carousel
              opts={{
                loop: true,
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent className="flex items-center">
                {categoryList?.map((category) => (
                  <CarouselItem
                    key={category._id}
                    onClick={() => handleNavigateFromHomeToListing(category._id, "category")}
                    className="basis-1/2 md:basis-1/3 lg:basis-1/5 px-1"
                  >
                    <div className=" pb-5 hover:scale-102 transition-transform flex flex-col items-center">
                      <img
                        src={category.image}
                        alt={category.category}
                        className=" h-[200px] lg:h-[280px] w-full object-cover mb-2"
                      />
                      <p className="text-xl  font-medium text-center hidden lg:block">{category.category}</p>
                    </div>

                  </CarouselItem>
                ))}
              </CarouselContent>



            </Carousel>
          </div >
        )}


      </div>

      {/* brands */}
      {brandsList && brandsList.length > 0 && (
        <div className=" max-w-[1700px] mx-auto w-full my-13 md:mt-20 px-2 lg:px-8 overflow-hidden ">
          {/* <h2 className="text-xl font-semibold mb-4 w-full  flex  justify-center  lg:hidden">Shop By Brands</h2> */}
          <h2 className="text-xl lg:text-2xl pb-4 md:pb-7 font-bold mb-4 w-full text-center tracking-wide  text-[#454a1b] ">
            SHOP BY BRAND
          </h2>
          <Carousel
            opts={{
              loop: true,
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="flex items-center">
              {brandsList.map((brand, index) => (
                <CarouselItem
                  key={index}
                  onClick={() => handleNavigateFromHomeToListing(brand._id, "brand")}
                  className="basis-1/4 sm:basis-1/4 md:basis-1/6 lg:basis-1/9 px-2"
                >
                  <div className=" transition-transform flex flex-col items-center">
                    <img
                      src={brand.image}
                      alt={brand.brandName}
                      className=" h-15 w-15 md:w-25 md:h-25 object-contain mb-2"
                    />
                    {/* <p className="text-sm font-medium text-center hidden lg:block">{brand.brandName}</p> */}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons at Bottom Center */}
            <div className="w-full h-12 hidden lg:block">
              <CarouselPrevious className="absolute top-6 lg:top-8  left-0 bg-gray-100 rounded-full hover:bg-gray-200" />
              <CarouselNext className="bg-gray-100 rounded-full top-8 right-2 hover:bg-gray-200" />
            </div>


          </Carousel>
        </div >
      )}

      {/* Third Poster */}
      <div className='w-full my-8 md:my-16'>
        <div className="w-full relative bg-gradient-to-r from-red-800 to-red-600 py-2 md:py-6 px-4 text-center  shadow-lg">
          <h1 className="text-white text-xl lg:text-4xl font-extrabold mb-2 md:mb-4 drop-shadow-md font-lobster">YatraGear</h1>
          <p className="inline-block bg-black/50 text-white text-[12px] lg:text-lg px-5 py-2 md:py-3 rounded-lg">
            <span className="text-blue-400 font-semibold underline underline-offset-2 cursor-pointer">Sign Up</span> for exclusive deals & offers!
          </p>

        </div>
        <div className='w-full h-3 bg-[#243126] '> </div>
      </div>

      {/* NEW ARRIVAL */}
      <div className=' max-w-[1600px] mb-15   mx-auto w-full '>
        {productList && newArrivalProductList && newArrivalProductList?.length > 0 && (
          <div className="w-full mt-8 px-2 lg:px-8  overflow-hidden ">
            <h2 className="text-xl lg:text-2xl pb-4 md:pb-7 font-bold mb-4 w-full text-center tracking-wide  text-[#454a1b] ">
              NEW ARRIVAL
            </h2>

            <Carousel
              opts={{
                loop: true,
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent className="flex items-center">
                {newArrivalProductList.map((product) => (
                  <CarouselItem
                    key={product._id}
                    className="basis-1/2 md:basis-1/3 lg:basis-1/5"
                  >
                    <FeatureCard product={product} key={product._id} />
                  </CarouselItem>
                ))}
              </CarouselContent>



            </Carousel>
          </div >
        )}


      </div>

      {/* Footer */}




    </div >
  );
};

export default Home;



{/* Mobile Ticket Image (Optional) */ }
{/* 
      <div className='w-full h-[200px] flex md:hidden'>
        <img
          src={ticket}
          alt="ticket"
          className="w-full h-full object-center mt-1"
        />
      </div> 
      */}