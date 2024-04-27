import { Button, Image, Tabs, Tab } from "@nextui-org/react";
import { LocationIcon } from "../../assets/LocationIcon";
import { HeartIcon } from "../../assets/heart";
import { ShareIcon } from "../../assets/Share";
import TourDetailDes from "./tourDetailDes";
import TourDetailReview from "./tourDetailReview";

import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

function TourDetail() {


    //fetch tour detail based id
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await fetch(`https://dummyjson.com/products/${productId}`);
            const data = await response.json();
            setProduct(data);
          } catch (error) {
            console.error('Error fetching product details:', error);
          }
        };
        fetchProduct();
    }, [productId]);
  
    if (!product) {
      return <div>Loading...</div>;
    }

    return(
        <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between pt-10">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold pb-5">{product.title}</h1>
                    <div className="flex flex-row underline"><LocationIcon/>Jibhi, Himachal Pradesh, India</div>
                    <div className="flex flex-row gap-1 items-center">
                        <p className="rounded-md bg-[#01B7F2] p-1 text-white font-semibold">{product.rating.toFixed(1)}</p>
                        <p className="font-semibold">Very Good</p>
                        <p className="underline">100 reviews</p>
                    </div>
                </div>

                <div className="flex flex-col gap-5 items-end justify-between">
                    <h1 className="text-3xl font-bold">${product.price}/night</h1>
                    <div className="flex flex-row gap-3">
                        <Button isIconOnly variant="bordered" className="border-[#01B7F2]"><HeartIcon/></Button>
                        <Button isIconOnly variant="bordered" className="border-[#01B7F2]"><ShareIcon/></Button>
                        <Link to={`/checkout`}>
                            <Button className="bg-[#01B7F2] text-white font-semibold">Book Now</Button>
                        </Link>
                    </div>
                </div>

            </div>
            <div className="">
                <div className="grid grid-cols-2">
                    <Image className="h-full px-2" src={product.thumbnail}/>
                    <div className="grid grid-cols-2 gap-2">
                        {product.images.slice(0,4).map((imageUrl, index) => (
                            <Image key={index} className="w-80 h-48" src={imageUrl}/>
                        ))}
                    
                    </div>
                </div>
            </div>
            <div>
                <Tabs size="lg" variant="underlined" color="primary">
                    <Tab title="Overview">
                        <TourDetailDes/>
                    </Tab>
                    <Tab  title="Review">
                        <TourDetailReview/>
                    </Tab>
                </Tabs>
            </div>
            <div>
                <div className="text-xl font-semibold pb-5">
                    Location/Map
                </div>
                <div className="flex w-full justify-center">
                    <iframe
                        className=" flex w-4/5 h-96"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13594.86430887069!2d77.3405611!3d31.5868329!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3905af6c857711cf%3A0x443ba8a6671fa200!2sWhispering%20Pines%20Cottages%2C%20Tandi!5e0!3m2!1svi!2s!4v1706603462304!5m2!1svi!2s"
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </div>
    )
}

export default TourDetail;