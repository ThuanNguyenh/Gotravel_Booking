import { Modal, Avatar, Button, Pagination, useDisclosure, ModalContent, Spinner } from "@nextui-org/react"
import { NextIcon } from "../../assets/NextIcon";
import { FacebookIcon } from "../../assets/FacebookIcon";
import { Twitter } from "../../assets/twitter";
import { Instagram } from "../../assets/insta";
import { GoogleIcon } from "../../assets/GoogleIcon";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CommentStar from "./commentStar";



function TourDetailReview() {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  //comment star
  const [commentStar, setCommentStar] = useState(0); // For CommentStar component

  const handleCommentStarChange = (stars) => {
    setCommentStar(stars);
  };


  //fetch comment api and switch page
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/comments`);
        const data = await response.json();
        const first20Comments = data.comments.slice(0, 20);
        setComments(first20Comments);
        console.log(first20Comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, []);

  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  //fetch rating
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`https://dummyjson.com/products/${productId}`); // Replace with your actual API endpoint
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

    return (
      <div>
        <div className="flex flex-row justify-between items-center pt-3 pb-5">
          <div className="text-xl font-semibold">User Rating & Reviews</div>
          <div>
            <Button
              radius="sm"
              className="bg-[#01B7F2] text-white font-semibold"
              onPress={onOpen}
            >
              Give your review
            </Button>
          </div>
        </div>

        <div className="flex flex-row gap-5 items-center">
          <div className=" flex text-5xl font-semibold pl-3">
            {product.rating.toFixed(1)}
            <div className="rating2">
              <label title="text" htmlFor="star1"></label>
            </div>
          </div>

          <div className="flex flex-col pr-10">
            <div className="font-semibold">Very Good</div>
            <div>237 Reviews</div>
          </div>

        </div>

        <div className="py-5">
          <div className="flex flex-col gap-5">
            {comments.length > 0 ? (
              comments.slice(startIndex, endIndex).map((comment) => (
                <div
                  key={comment.id}
                  className="flex flex-row gap-2 p-4 border-t-1 border-gray-300"
                >
                  <div>
                    <Avatar
                      src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                      size="lg"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold">
                      5.0 Amazing | {comment.user.username}
                    </div>
                    <div className="text-foreground">{comment.body}</div>
                  </div>
                </div>
              ))
            ) : (
              <Spinner size="lg" className="p-40" />
            )}
          </div>
        </div>

        <div className=" flex justify-center">
          <Pagination
            total={Math.ceil(comments.length / 5)}
            initialPage={1}
            onChange={handlePageChange}
          />
        </div>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="full"
          hideCloseButton
          className="w-[35%] "
          motionProps={{
            variants: {
              enter: {
                x: "33%",
                opacity: 1,
                transition: {
                  duration: 0.5,
                  ease: "easeOut",
                },
              },
              exit: {
                x: "100%",
                opacity: 0,
                transition: {
                  duration: 0.5,
                  ease: "easeIn",
                },
              },
            },
          }}
        >
          <ModalContent>
            <div className="flex flex-col h-full w-full gap-5 p-5 justify-between">
              
              <div className="flex flex-col items-start">
                <div className="text-xl font-semibold">Rate Amenities</div>
                <CommentStar numberOfStars={commentStar} onChange={handleCommentStarChange}/>
              </div>
              
              <div className="flex flex-col ">
                <div className="text-xl font-semibold pt-10">Comment</div>
                <div className="flex flex-row items-center gap-5 ">
                  <textarea
                    rows={4}
                    cols={50}
                    placeholder="Your review here..."
                    className="mt-2 p-2 border rounded"
                  />
                  <Button
                    isIconOnly
                    radius="sm"
                    size="lg"
                    className="bg-[#01B7F2]"
                  >
                    <NextIcon />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-5 bottom-5">
                <div className="flex text-xl font-semibold text-[#01b6f2]">About Us</div>
                  <div className="flex flex-row gap-5 justify-center">
                    <FacebookIcon />
                    <Twitter />
                    <Instagram />
                    <GoogleIcon />
                  </div>
              </div>
            </div>
          </ModalContent>
        </Modal>
      </div>
    );
}

export default TourDetailReview