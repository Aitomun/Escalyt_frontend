import React, { useState, useRef } from "react";
import RateTicketIcon from "./RateTicketIcon";

// The ticket to be rated ID will be passed from the user ticket detail
// For now, it is hardcoded based on the database
const RateTicket = ({ onClose, ticketId }) => {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const reviewText = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //const token = localStorage.getItem("token"); // Retrieve the token from local storage
    //const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJza2lsbHMuaGVucnlAZ21haWwuY29tIiwiaWF0IjoxNzIyODg2ODU1LCJleHAiOjE3MjI5NzMyNTV9.9BLlQz6pNPPdVdnBLT30_4XSwcABB6fzJa22qT4Kbe4"
    const token = localStorage.getItem('token'); // Replace with your method of retrieving the token
    if (!token) {
      throw new Error('No token found');
    }
    if (!token) {
      alert("You are not logged in. Please log in first.");
      setIsLoading(false);
      return;
    }

    const theRating = {
      ticketId,
      ratingCount: rating,
      reviewMessage: reviewText.current.value,
      personId : 1,

    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/ratings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(theRating),
        }
      );

      if (response.ok) {
        console.log("Ticket Rated created successfully");
        setIsLoading(false);
        onClose();
      } else {
        // alert("Error Rating ticket");
        // console.log("Error:", response.statusText);
        const data = await response.text();
        console.log("respones", data);
      }
    } catch (error) {
      alert("Error rating ticket from catch");
      setIsLoading(false);
    }

    console.log("Submitted", theRating);
    setRating(0);
    reviewText.current.value = "";
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center">
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 ${
          isLoading ? "z-30" : "z-10"
        }`}
        onClick={onClose}
      ></div>

      <div className="bg-white w-[448px] rounded-lg shadow-custom p-5 relative overflow-y-auto z-20">
        <div className="w-[400px] mb-[20px] flex flex-col items-center justify-center">
          <div className="flex justify-between items-center w-full mb-4 px-[24px]">
            <div className="rounded-lg shadow p-4 bg-white">
              <RateTicketIcon/>
            </div>
            <button onClick={onClose} className="text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex w-[352px] h-[28px]">
            <p className="text-lg font-semibold leading-7 text-left">
              Rate Ticket Resolution
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center mb-4">
            <RatingStar rating={rating} setRating={setRating} />
          </div>

          <div className="h-[120px] flex flex-col mb-1">
            <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
              <label>Review</label>
            </span>
            <div className="h-full flex items-center px-2 border border-[#0070FF]">
              <textarea
                ref={reviewText}
                placeholder="Enter your review"
                className="text-black h-full text-lg font-medium leading-6 w-full border-none outline-none pt-2.5 resize-none"
              />
            </div>
          </div>
          <div className="bg-[#0070FF] p-4 rounded h-[44px] w-full flex items-center justify-center mt-6 mb-5">
            <button type="submit" className="text-white text-md-semibold">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RateTicket;

function RatingStar({ rating, setRating }) {
  return (
    <div className="flex space-x-2">
      {[1, 2, 3, 4, 5].map((star, index) => (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill={rating >= star ? "#FFD700" : "none"}
          xmlns="http://www.w3.org/2000/svg"
          key={index}
          onClick={() => setRating(rating !== star ? star : 0)}
        >
          <path
            d="M9.48001 1.499C9.52231 1.39583 9.59433 1.30758 9.68693 1.24546C9.77953 1.18334 9.88851 1.15018 10 1.15018C10.1115 1.15018 10.2205 1.18334 10.3131 1.24546C10.4057 1.30758 10.4777 1.39583 10.52 1.499L12.645 6.61C12.6848 6.70564 12.7502 6.78844 12.834 6.84931C12.9178 6.91018 13.0168 6.94675 13.12 6.955L18.638 7.397C19.137 7.437 19.339 8.06 18.959 8.385L14.755 11.987C14.6765 12.0542 14.6179 12.1417 14.5858 12.24C14.5537 12.3382 14.5493 12.4434 14.573 12.544L15.858 17.929C15.8838 18.037 15.8771 18.1503 15.8386 18.2545C15.8001 18.3587 15.7315 18.4491 15.6416 18.5144C15.5518 18.5797 15.4446 18.6169 15.3336 18.6212C15.2226 18.6256 15.1128 18.597 15.018 18.539L10.293 15.654C10.2048 15.6001 10.1034 15.5716 10 15.5716C9.89662 15.5716 9.79524 15.6001 9.70701 15.654L4.98201 18.54C4.88727 18.598 4.77746 18.6266 4.66647 18.6222C4.55547 18.6179 4.44826 18.5807 4.35838 18.5154C4.2685 18.4501 4.19997 18.3597 4.16146 18.2555C4.12295 18.1513 4.11618 18.038 4.14201 17.93L5.42701 12.544C5.45084 12.4434 5.44646 12.3382 5.41435 12.2399C5.38224 12.1416 5.32365 12.0541 5.24501 11.987L1.04101 8.385C0.956354 8.31284 0.895018 8.21717 0.864771 8.11012C0.834524 8.00307 0.836727 7.88945 0.8711 7.78365C0.905474 7.67785 0.970472 7.58464 1.05786 7.51581C1.14525 7.44698 1.2511 7.40563 1.36201 7.397L6.88001 6.955C6.98326 6.94675 7.08223 6.91018 7.16604 6.84931C7.24984 6.78844 7.31523 6.70564 7.35501 6.61L9.48001 1.499Z"
            stroke={rating >= star ? "" : "black"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}
