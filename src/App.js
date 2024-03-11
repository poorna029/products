import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import "./App.css";

import ProductsList from "./components/ProductsList";
import ProductItemDetails from "./components/ProductDetails";

function App() {
  return (
    <div className="App">
      <h1 className="shop">Shop Now</h1>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ProductsList />} />

          <Route path="/products/:id" element={<ProductItemDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
