import { Modal, Avatar, Button, Pagination, useDisclosure, ModalContent, Spinner, Textarea } from "@nextui-org/react";
import { NextIcon } from "../../assets/NextIcon";
import { FacebookIcon } from "../../assets/FacebookIcon";
import { Twitter } from "../../assets/twitter";
import { Instagram } from "../../assets/insta";
import { GoogleIcon } from "../../assets/GoogleIcon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentStar from "./commentStar";
import axios from "axios";

function TourDetailReview() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Comment star
  const [commentStar, setCommentStar] = useState(0); // Initialize with 0 or any default value

  const handleCommentStarChange = (stars) => {
    setCommentStar(stars);
  };

  // Comment text
  const [commentText, setCommentText] = useState("");

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  //switch Page
  const [currentPage, setCurrentPage] = useState(1);


  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fetch tour detail based on ID
  const { tourId } = useParams();
  const [allrating, setRating] = useState(); // Initialize with null to handle loading state

  // get userId from localStorage
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const userId = user?.userId;

  // Get token from localStorage
  const token = localStorage.getItem("accessToken");

  // Get tour rating data
  const getRating = async () => {
    try {

      const response = await axios.get(
        `http://localhost:8080/api/v1/feedback/allOfTour/${tourId}`
      );
      setRating(response.data);
      console.log("Rating this tour: ", response.data);
    } catch (error) {
      console.log("Error fetching rating");
    }
  };

  useEffect(() => {
    getRating();
  }, []);

  // Function to post rating and comment
  const postRatingAndComment = async () => {
    try {
      if (!token) {
        alert("You need to be logged in to post a review.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const postData = {
        userId: userId,
        tourId: tourId,
        rating: commentStar,
        comment: commentText,
      };

      const response = await axios.post(
        `http://localhost:8080/api/v1/feedback/create`,
        postData,
        config
      );

      console.log("Posted successfully:", response.data);
      // Optionally, fetch the new set of comments/rating after posting
      getRating();
      onOpenChange(false); // Close the modal after posting
    } catch (error) {
      console.error("Error posting rating and comment:", error);
    }
  };

  //Average rating
  const calculateAverageRating = () => {
    if (!allrating || allrating.length === 0) {
      return "No ratings"; // Return a message if there are no ratings
    }
  
    const totalRating = allrating.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRating / allrating.length;
    return averageRating.toFixed(1); // Return the average rating rounded to 1 decimal place
  };

  //total rating
  const totalRating = () => {
    return allrating ? allrating.length : 0; // Return the length of the rating array, or 0 if rating is null or empty
  };

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
            <div className="flex text-5xl font-semibold pl-3">
              {calculateAverageRating()}
              <div className="rating2">
                <label title="text" htmlFor="star1"></label>
              </div>
            </div>
            <div className="flex flex-col pr-10">
              <div className="font-semibold">Very Good</div>
              <div>{totalRating()} Reviews</div> 
            </div>
      </div>

      <div className="py-5">
        <div className="flex flex-col gap-5">
          {allrating ? (
            allrating.slice(startIndex, endIndex).map((rate) => (
              <div
                key={rate.feedbackId}
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
                    {rate.rating} Amazing | {rate.userName}
                  </div>
                  <div className="text-foreground">{rate.comment}</div>
                </div>
              </div>
            ))
          ) : (
            <Spinner size="lg" className="p-40" />
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <Pagination
          total={Math.ceil((allrating ? allrating.length : 0) / 5)}
          initialPage={1}
          onChange={handlePageChange}
        />
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="full"
        hideCloseButton
        className="w-[35%]"
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
              <CommentStar numberOfStars={commentStar} onChange={handleCommentStarChange} />
            </div>

            <div className="flex flex-col">
              <div className="text-xl font-semibold pt-10">Comment</div>
              <div className="flex flex-row items-center gap-2">
                <Textarea
                  rows={4}
                  cols={50}
                  placeholder="Your review here..."
                  className="mt-2 p-2 w-3/4 border rounded"
                  value={commentText}
                  onChange={handleCommentTextChange}
                />
                <Button
                  isIconOnly
                  radius="sm"
                  size="lg"
                  className="bg-[#01B7F2]"
                  onPress={postRatingAndComment}
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

export default TourDetailReview;
