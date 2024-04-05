import React, { useState } from 'react';

function CommentStar() {
    const [rating, setRating] = useState(3); // Initial rating state

    const handleRatingChange = (value) => {
      setRating(value);
    };
  
    return (
      <div>
        <div className="rating">
          {[...Array(5)].map((_, index) => (
            <React.Fragment key={index}>
              <input
                value={5 - index}
                name="rate"
                id={`star${5 - index}`}
                type="radio"
                checked={5 - index === rating}
                onChange={() => handleRatingChange(5 - index)}
              />
              <label title="text" htmlFor={`star${5 - index}`}></label>
            </React.Fragment>
          ))}
        </div>
        <p>You rated {rating} stars</p>
      </div>
    );
}

export default CommentStar;

