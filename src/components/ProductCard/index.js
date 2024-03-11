import { Link } from "react-router-dom";

import "./index.css";

const ProductCard = (props) => {
  const { productData } = props;
  const { title, brand, image, rating, price, id, description, category } =
    productData;
  const { rate, count } = rating;
  // console.log(productData);
  let ar = [];
  for (let i = 0; i < Math.floor(rate); i++) {
    ar.push(i + 1);
  }

  return (
    <Link to={`/products/${id}`} className="link-item">
      <div className="img-container">
        <img src={image} alt="product" className="thumbnail" />
      </div>
      <li className="product-item">
        <h5 className="title">{title}</h5>
        <p className="brand">{category}</p>
        <div className="product-details">
          <h4 className="price">Rs {price}/-</h4>
          <div className="rating-container">
            <p className="rating">{rating.rate}</p>
            {ar.map((x) => (
              <ion-icon name="star" class="star"></ion-icon>
            ))}
            {Math.ceil(rate) > Math.floor(rate) ? (
              <ion-icon name="star-half" class="star"></ion-icon>
            ) : null}
            {`(${count})`}
          </div>
        </div>
      </li>
    </Link>
  );
};
export default ProductCard;
