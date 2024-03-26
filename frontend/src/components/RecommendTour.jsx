import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { StarIcon } from "../assets/starIcon";
import { HeartIcon } from "../assets/heart";

function RecommendTour() {
  //heart button
  const [liked, setLiked] = useState(false);

  //fetch api
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        // Limit the products to the first 20 items
        const first20Products = data.products.slice(0, 8);
        setProducts(first20Products);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <h1 className="py-10 text-3xl font-extrabold">Recommended Tour</h1>
        <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="border-small border-blue-400">
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <CardBody className="p-0">
                    <div className="relative group">
                      <Link to={`/tourDetail/${product.id}`}>
                        <Image
                          shadow="sm"
                          radius="lg"
                          width="100%"
                          className="w-full object-cover h-[300px]"
                          src={product.thumbnail}
                          alt={product.title}
                        />
                      </Link>
                      <div className="absolute bottom-0 right-0 text-white p-2">
                        <p className="z-10 relative flex gap-1">
                          <StarIcon />
                          {parseFloat(product.rating).toFixed(1)}
                        </p>
                      </div>
                      <div className="absolute top-0 right-0 text-white p-2">
                        <div className="z-10 relative flex gap-1">
                          <Button
                            isIconOnly
                            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                            radius="full"
                            variant="light"
                            onPress={() => setLiked((v) => !v)}
                          >
                            <HeartIcon
                              className={
                                liked ? "[&>path]:stroke-transparent" : ""
                              }
                              fill={liked ? "red" : "none"}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="justify-between">
                    <div className="flex flex-col font-semibold text-lg">
                      <h1 className="">{product.title.length > 10 ? product.title.substring(0, 12) + '...' : product.title}</h1>
                      <p className="text-medium font-light">{product.brand}</p>
                      <h1>
                        ${product.price}{" "}
                        <span className="font-light">night</span>
                      </h1>
                    </div>
                    <div>
                      <Button
                        radius="full"
                        className="text-white bg-[#4bacf1] font-semibold"
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardFooter>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default RecommendTour;
