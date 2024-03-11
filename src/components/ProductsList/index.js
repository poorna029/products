import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";

import ProductCard from "../ProductCard";

import "./index.css";
import App from "../../App";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const AllProductsSection = () => {
  const [ap, setAp] = useState({
    productsList: [],
    apiStatus: apiStatusConstants.initial,
  });

  useEffect(() => {
    async function fetchcall() {
      setAp({
        apiStatus: apiStatusConstants.inProgress,
      });
      const apiUrl = `https://fakestoreapi.com/products`;

      const response = await fetch(apiUrl);
      if (response.ok) {
        const fetchedData = await response.json();
        // console.log(fetchedData, "fd");
        const updatedData = fetchedData.map((product) => ({
          title: product.title,
          brand: product.description,
          price: product.price,
          id: product.id,
          image: product.image,
          rating: product.rating,
          category: product.category,
        }));
        setAp({
          productsList: updatedData,
          apiStatus: apiStatusConstants.success,
        });
      } else {
        setAp({
          apiStatus: apiStatusConstants.failure,
        });
      }
    }

    fetchcall();
  }, []);

  const renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  const renderProductsListView = () => {
    const { productsList } = ap;
    const shouldShowProductsList = productsList?.length > 0;

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <ul className="products-list">
          {productsList.map((product) => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : null;
  };

  const renderLoadingView = () => (
    <div className="products-loader-container">
      {/* <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" /> */}

      <p>loading...</p>
    </div>
  );

  const renderAllProducts = () => {
    const { apiStatus } = ap;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductsListView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return <div className="all-products-section">{renderAllProducts()}</div>;
};

export default AllProductsSection;
