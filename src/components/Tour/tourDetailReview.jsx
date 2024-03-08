import { Modal, Avatar, Button, Pagination, Slider, useDisclosure, ModalContent, Spinner } from "@nextui-org/react"
import { NextIcon } from "../../assets/NextIcon";
import { FacebookIcon } from "../../assets/FacebookIcon";
import { Twitter } from "../../assets/twitter";
import { Instagram } from "../../assets/insta";
import { GoogleIcon } from "../../assets/GoogleIcon";

import { useEffect, useState } from "react";

const rating = [
  {
    label: "Food",
    defaultValue: 2.5,
  },
  {
    label: "Child Friendliness",
    defaultValue: 4,
  },
  {
    label: "Location",
    defaultValue: 5,
  },
  {
    label: "Amenities",
    defaultValue: 3,
  },
  {
    label: "Hospitality",
    defaultValue: 1,
  },
];


function TourDetailReview() {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  //fetch comment api
  const [comments, setComments] = useState([]);

  useEffect(() => {
      const fetchComment = async () => {
        try {
          const response = await fetch(`https://dummyjson.com/comments`);
          const data = await response.json();
          const first5comment = data.comments.slice(0 , 5)
          setComments(first5comment);
          console.log(first5comment)
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
      fetchComment();
  }, [] );

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

        <div className="flex flex-row gap-2 justify-around">
          <div className="text-5xl font-semibold">4.2</div>
          <div className="flex flex-col pr-10">
            <div className="font-semibold">Very Good</div>
            <div>237 Reviews</div>
          </div>

          {rating.map((rating, index) => (
            <Slider
              key={index}
              isDisabled
              size="sm"
              label={rating.label}
              hideThumb={true}
              defaultValue={rating.defaultValue}
              step={0.5}
              maxValue={5}
              minValue={0}
              className="w-[15%] opacity-1"
            />
          ))}
        </div>

        <div className="py-5">
          <div className="flex flex-col gap-5">
            {comments ? comments.map((comment) => (
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
            )): <Spinner size="lg" className="p-40"/> }
          </div>
        </div>

        <div className=" flex justify-center">
          <Pagination total={10} initialPage={1} />
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
            <div className="flex flex-col w-full gap-5 p-5">
              <div className="text-xl font-semibold">Rate Amenities</div>
              <div className="flex flex-col w-full">
                {rating.map((rating, index) => (
                  <Slider
                    key={index}
                    size="sm"
                    label={rating.label}
                    hideThumb={true}
                    defaultValue={2.5}
                    step={0.5}
                    maxValue={5}
                    minValue={0}
                    className="w-[80%] opacity-1  font-semibold"
                  />
                ))}
              </div>
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
              <div className="flex flex-col justify-center items-center gap-5 pt-5">
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