/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function StarRating({value}) {
  const [rating, setRating] = useState(value); // Initial rating state

  const fixedValue = Math.round(value);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => (
          <React.Fragment key={index}>
            <input
              value={5 - index}
              name="rate"
              id={`star${5 - index}`}
              type="radio"
              checked={5 - index === fixedValue}
              onChange={() => handleRatingChange(5 - index)}
            />
            <label title="text" htmlFor={`star${5 - index}`}></label>
          </React.Fragment>
        ))}
    </div>
  );
}

export default StarRating;
