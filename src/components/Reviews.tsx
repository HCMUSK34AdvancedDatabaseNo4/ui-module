import { FC, useEffect, useState } from "react";
import RatingStar from "./RatingStar";
import { ReviewItem } from "../models/ReviewItem";

const reviews: ReviewItem[] = [
];

const getShuffledArr = () => {
  const arr: ReviewItem[] = [];
  const start = 0
  for (let index = start; index < reviews.length; index++) {
    arr.push(reviews[index]);
  }
  return arr;
};

const Reviews: FC<{ id: number }> = ({ id }) => {
  const [items, setItems] = useState<ReviewItem[]>([]);

  useEffect(() => {
    const _arr = getShuffledArr();
    setItems(_arr);
  }, [id]);

  return (
    <div className="px-2">
      <h1 className="text-2xl font-semibold mb-2">Reviews</h1>
      <div className="space-y-2">
        {items?.map(({ username, rating, review }) => (
          <div key={username} className="leading-4" data-test="review-item">
            <h3 className="font-semibold text-md">{username}</h3>
            <RatingStar rating={rating} />
            <p className="text-sm leading-4">{review}</p>
          </div>
        ))}
        {items.length == 0 && (
          <div className="text-center text-sm text-gray-500">
            No reviews yet
          </div>
        )}
      </div>
    </div>
  );
};
export default Reviews;
