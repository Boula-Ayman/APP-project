import React from "react";
import { usePostWishListMutation } from "../../src/wishList/AdWishList/wishListApiSliceAdd";

const TestWishListComponent = () => {
  const [postWishList, { isLoading, isSuccess, isError, data, error }] =
    usePostWishListMutation();

  const handleAddToWishList = async () => {
    try {
      const result = await postWishList({ id: "some-id" }).unwrap();
      console.log("WishList added successfully:", result);
    } catch (err) {
      console.error("Failed to add to WishList:", err);
      if (err instanceof Error) {
        console.error("Error message:", err.message);
        console.error("Error stack:", err.stack);
      }
    }
  };

  return (
    <div>
      <button onClick={handleAddToWishList} disabled={isLoading}>
        Add to WishList
      </button>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Added to WishList!</p>}
      {isError && <p>Error adding to WishList: {error.toString()}</p>}
    </div>
  );
};

export default TestWishListComponent;
