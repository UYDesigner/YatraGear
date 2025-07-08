import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Minus, Plus, Star } from 'lucide-react'

import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import StarReview from '@/components/shopping-view/starReview/StarReview';
import { Button } from '@/components/ui/button';
import { addReviewOfShopProductService, getReviewOfShopProductService } from '@/services/shop/reviewProduct';



const ProductDetails = ({ productDetails, handleAddToCart, user, cartItems }) => {
    const { brandsList } = useSelector((state) => state.adminBrand);
    const [localQuantity, setLocalQuantity] = useState(1);
    const [showMore, setShowMore] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [reviewMsg, setReviewMsg] = useState("")
    const [rating, setRating] = useState(0)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { reviews } = useSelector((state) => state.shopReview)




    const {

        featuredImage,
        images = [],
        productName,
        price,
        offerPrice,
        featuredDescription,
        Description,
        weight,
        weightType,
        type,
        isNewArrival,
        ratings,
        qty,
        review,
        brandId,
    } = productDetails;

    const hasOffer = offerPrice > 0 && offerPrice < price;
    const brandInfo = brandsList?.find((brand) => brand?._id === brandId);



    const handleThumbnailClick = (index) => {
        setSelectedImageIndex(index);
    };

    const handleMinus = () => {
        if (localQuantity > 1) setLocalQuantity(localQuantity - 1);
    };

    const handlePlus = () => {

        if (localQuantity + 1 > productDetails.qty) {
            toast.error(`Only ${productDetails.qty} quantity can be added for this product`)
            return;
        }
        setLocalQuantity(localQuantity + 1)

    }

    const handleRatingChange = (getRating) => {
        setRating(getRating)
    }

    const handleSubmitReview = async () => {
        // console.log({ productId: productDetails._id, userId: user?.id, userName: user?.userName, reviewMessage: reviewMsg, reviewValue: rating })
        try {
            const response = await dispatch(addReviewOfShopProductService({
                productId: productDetails._id,
                userId: user?.id,
                userName: user?.userName,
                reviewMessage: reviewMsg,
                reviewValue: rating
            })).unwrap();

            // Correct: pass ID, don't assign
            dispatch(getReviewOfShopProductService(productDetails._id));

            toast.success(response.message || "Review added successfully!");
        } catch (error) {
            toast.error(error?.message || "Something went wrong while submitting review.");
        } finally {
            setReviewMsg("")
            setRating(0)
        }
    };





    // console.log(cartItems, "cartitems")

    useEffect(() => {
        if (!productDetails || !cartItems) return;

        const itemInCart = cartItems.find((item) => (
            item.productId === productDetails._id
        ));
        // console.log(itemInCart, "itemincart")
        if (itemInCart) {
            setLocalQuantity(itemInCart.quantity)
        }

    }, [cartItems, productDetails])

    useEffect(() => {
        if (!images || images.length === 0) return;

        const interval = setInterval(() => {
            setSelectedImageIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images]);


    useEffect(() => {

        if (productDetails._id)
            dispatch(getReviewOfShopProductService(productDetails._id))
    }, [productDetails?._id])

    // console.log(reviews, "all reviews")


    const isInCart = cartItems?.find((item) => item.productId === productDetails._id);


    return (
        <div className='max-w-[1500px] lg:mt-10 mx-auto p-6 '>
            <div className=" w-full grid   lg:grid-cols-[72%_28%] gap-10">
                {/* Left: Images */}
                <div className=" lg:border-r-1 lg:pr-7 pb-10">
                    <div className="flex gap-4 flex-col items-center  md:flex-row">
                        {/* Left: Thumbnails */}
                        {images.length > 0 && (
                            <div className="flex flex-row md:flex-col gap-2 max-h-[450px] overflow-scroll order-2 md:order-1">
                                {images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Image ${idx + 1}`}
                                        className="w-20 h-20 object-cover border rounded-md cursor-pointer hover:opacity-80"
                                        onClick={() => handleThumbnailClick(idx)}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Right: Featured Image */}
                        <div className='flex-1 order-1 md:order-2'>
                            <img
                                src={images[selectedImageIndex] || featuredImage}
                                alt={productName}
                                className="w-full h-[250px] md:h-[450px] object-contain  "
                            />
                        </div>



                    </div>

                    <div className='details mt-7 flex flex-col gap-4'>
                        <div>
                            <h2 className='text-[#616630] font-roboto  font-bold text-xl '> PRODUCT DETAILS</h2>
                            {brandInfo?.image && (
                                <img src={brandInfo.image} alt="Brand" className='w-30' />
                            )}

                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                            <p className={`text-gray-600 whitespace-pre-line ${!showMore ? 'line-clamp-4' : ''}`}>
                                {Description}
                            </p>
                            {Description.length > 200 && (
                                <button
                                    onClick={() => setShowMore(!showMore)}
                                    className="text-blue-600 mt-1 text-sm hover:underline"
                                >
                                    {showMore ? 'Show less' : 'Show more'}
                                </button>
                            )}
                        </div>
                    </div>


                </div>

                {/* Right: Details */}
                <div className="space-y-6">
                    <h1 className=" text-2xl lg:text-3xl font-bold text-gray-800">
                        {productName}

                    </h1>

                    {/* review stars ------------ */}

                    <div className="flex items-center gap-2 ">
                        <StarReview rating={ratings} />
                        <span className="text-gray-600 text-sm">({ratings} ratings)</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {hasOffer ? (
                            <>
                                <span className="text-green-600 font-bold text-2xl lg:text-3xl">${offerPrice}</span>
                                <span className="line-through text-gray-400">${price}</span>
                            </>
                        ) : (
                            <span className="text-gray-800 font-bold text-2xl lg:text-3xl">${price}</span>
                        )}
                    </div>
                    <p className="text-gray-600 text-sm">{featuredDescription}</p>





                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                        <p><strong>Type:</strong> {type}</p>
                        <p><strong>Weight:</strong> {weight} {weightType}</p>
                        <p><strong>Stock:</strong> {qty > 0 ? `${qty} available` : 'Out of stock'}</p>
                        <p><strong>Arrival:</strong> {isNewArrival ? '🆕 New Arrival' : '—'}</p>
                    </div>
                    <div className='text-[15px] font-semibold'>
                        <span className='text-[#616630]'>SAVE TODAY! Pay $199.99 with $20 in CLUB Points upon approval to use on today's order.</span>
                        <span className='underline'> Apply today
                            or see if you're pre-approved</span>
                    </div>
                    <div>
                        <img src="https://assets.basspro.com/image/upload/c_scale,f_auto,q_auto,w_500/v1685026764/DigitalCreative/2023/Site-Elements/PDP-Banners/ReadTheGuideToTents.jpg" alt="" className='w-full h-20'
                            onClick={() => navigate('/shop/info')}
                        />
                    </div>
                    <div className="gty">
                        <h2 className='text-[#616630] text-xl'>Quantity : </h2>
                        <div className='flex gap-3 items-center mt-4'>
                            {
                                isInCart ? (
                                    <span className="text-gray-700 font-medium text-lg">
                                        {localQuantity} item{localQuantity > 1 ? 's' : ''} in your cart
                                    </span>


                                )
                                    :
                                    (
                                        <>
                                            <button onClick={() => { handleMinus() }} className='border p-1 cursor-pointer hover:bg-gray-50 '><Minus /></button>
                                            <span className='border p-4 px-6 text-2xl '>{localQuantity}</span>
                                            <button onClick={() => { handlePlus() }} className='border p-1 cursor-pointer hover:bg-gray-50 '><Plus /></button></>
                                    )
                            }
                        </div>
                    </div>

                    {
                        qty > 0 ? (

                            isInCart ? (
                                <button onClick={() => navigate('/shop/cart')} className="bg-[#b8a81c] hover:bg-[#8c8651] w-full px-6 py-2 font-medium text-white">
                                    Go to Cart
                                </button>
                            ) : (
                                <button onClick={() => handleAddToCart(productDetails._id, localQuantity)} className="bg-[#616630] w-full hover:bg-[#767b46] px-6 py-2 font-medium text-white transition-all">
                                    Add to Cart
                                </button>
                            )
                        )
                            :
                            (
                                <button
                                    disabled={qty <= 0}
                                    onClick={() => handleAddToCart
                                        (productDetails._id, localQuantity)} className="bg-gray-300 text-gray-500 cursor-not-allowed w-full  px-6 py-2 font-medium  transition-all">
                                    Out of stock
                                </button>
                            )
                    }
                    {/* write a review  */}
                    <div className='mt-6 flex flex-col gap-2'>
                        <Label>Write a review</Label>
                        <StarReview rating={rating} handleRatingChange={handleRatingChange} />

                        <div className='flex gap-2'>
                            <Input
                                name="reviewMsg"
                                value={reviewMsg}
                                onChange={(e) => setReviewMsg(e.target.value)}
                                placeholder="Write your review..."
                            />
                            <Button
                                onClick={handleSubmitReview}
                                disabled={reviewMsg.trim() === ""}
                                className="text-[14px] font-semibold rounded-sm"
                            >
                                Submit
                            </Button>
                        </div>

                        {/* All reviews list */}
                        <div className="mt-6 space-y-2">
                            {reviews && reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div
                                        key={review._id}
                                        className="flex items-start gap-3 bg-white rounded border border-gray-100 px-3 py-2"
                                    >
                                        {/* Avatar */}
                                        <Avatar className="bg-gray-100 rounded-full w-9 h-9 flex items-center justify-center">
                                            <AvatarFallback className="text-gray-700 font-medium text-sm">
                                                {review.userName?.[0]?.toUpperCase() || 'U'}
                                            </AvatarFallback>
                                        </Avatar>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-center">
                                                <p className="font-medium text-gray-800 text-[13px]">{review.userName}</p>
                                                <p className="text-gray-400 text-[11px]">{new Date(review.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex items-center gap-1 my-0.5">
                                                <StarReview rating={review.reviewValue} />
                                            </div>
                                            <p className="text-gray-700 text-[13px] leading-snug">{review.reviewMessage}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className='text-gray-500 text-sm'>No reviews yet. Be the first to review!</p>
                            )}
                        </div>

                    </div>




                </div>
            </div>
            {/* important note */}
            <div className='mt-15 mb-10'>
                <p className='text-[#292b18] font-semibold mb-7'>Important Notice</p>
                <div className='space-y-2'>
                    <h4 className='text-[#2f311b] font-semibold'>Notice-- YatraGear Item Packahing. </h4>
                    <p className='font-light' >Please note that this item ships in its own packaging, so the contents may be identified.</p>
                    <p><span className='text-sky-600 font-semibold'>WARNING:</span> California's Proposition 65</p>
                </div>
            </div>
        </div >
    )
}

export default ProductDetails