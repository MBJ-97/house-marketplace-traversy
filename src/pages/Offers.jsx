import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingComponent from "../components/ListingComponent";

function Offers() {
  const [listings, setListings] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create a query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        // Execute query
        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Oupsy! Couldn't fetch listing");
        setLoading(false);
      }
    };
    fetchListings();
  }, []);
  return (
    <div className="category">
      <header>
        <p className="pageHeader">Check the latest offers !</p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingComponent
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>There are currently no offers</p>
      )}
    </div>
  );
}

export default Offers;
