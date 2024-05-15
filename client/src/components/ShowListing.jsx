import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ShowListing() {
  const [userListings, setUserListings] = useState([]);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  useEffect(() => {
    console.log(currentUser);
    handleShowListings();
  }, [currentUser]);

  const handleShowListings = async () => {
    try {
      console.log(userListings);
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(userListings);
  return (
    <div>
      {userListings.length === 0 ? (
        <div className="text-center p-10 font-medium">
          <p>
            No listing found associated with this account.
            <Link
              to={"/create-listing"}
              className="underline italic text-blue-700"
            >
              {" "}
              Click Here to list your first listing
            </Link>
          </p>
          <span className="">Happy Listing</span>
        </div>
      ) : (
        ""
      )}
      <p className="text-red-700 mt-5">
        {showListingsError ? "Error showing listings" : ""}
      </p>
      {userListings && userListings.length > 0 && (
        <div className="p-1">
          {" "}
          <h1 className="text-center mt-7 text-2xl pb-4 font-semibold">
            Your Listings
          </h1>
          <div className="flex flex-col gap-4 lg:mx-36 lg:max-h-[500px] overflow-auto">
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className="border rounded-lg p-3 bg-white  flex justify-between items-center gap-4"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-16 w-16 object-contain"
                  />
                </Link>
                <Link
                  className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                  to={`/listing/${listing._id}`}
                >
                  <p title="View Listing">{listing.name}</p>
                </Link>

                <div className="flex flex-col item-center">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-700 uppercase"
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-green-700 uppercase">Edit</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {userListings.length > 0 ? (
        <div className="text-center my-3">
          <Link
            to={"/create-listing"}
            className="text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 
                    hover:bg-white border hover:border-green-700 hover:text-green-700
              "
            title="Add more listing"
          >
            Add New Listing
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
