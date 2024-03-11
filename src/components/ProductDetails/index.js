import { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const ProductItemDetails = (props) => {
  const { id } = useParams();
  const [data, setData] = useState({ data: {}, isLoading: true });

  useEffect(() => {
    async function fetchCall() {
      const details = await fetch(`https://fakestoreapi.com/products/${id}`);
      const res = await details.json();
      setData({ data: res, isLoading: false });
    }
    fetchCall();
  }, []);

  // const { category, description, image, price, rating, title } = data?.data;
  const style = { margin: "auto" };

  let ar = [];
  if (data.data.rating) {
    for (let i = 0; i < Math.floor(data.data.rating.rate); i++) {
      ar.push(i + 1);
    }
  }

  return (
    <>
      {data.isLoading ? (
        <p style={style}>Loading...</p>
      ) : (
        <div className="body">
          <div className="main">
            <div className="first">
              <img
                src={data.data.image}
                alt={data.data.title}
                class="image-details"
              />
            </div>
            <div className="second">
              <div>
                <h1 className="heading-detailed">{data.data.title}</h1>
                <h3 className="cat">{`(${data.data.category})`}</h3>
              </div>
              <strong className="desc">
                <em>{data.data.description}</em>
              </strong>
              <h3 className="rate1">{data.data.price} Rs/-</h3>
              <div className="rating-container-detailed">
                <h4>{data.data.rating.rate}</h4>
                {ar.map((x) => (
                  <ion-icon name="star" class="star"></ion-icon>
                ))}
                {Math.ceil(data.data.rating.rate) >
                Math.floor(data.data.rating.rate) ? (
                  <ion-icon name="star-half" class="star"></ion-icon>
                ) : null}
                {`(${data.data.rating.count})`}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItemDetails;
