import React, { useState } from "react";
import { FilteredProducts } from "../Components/Sales/Pos/FilteredProducts";
import { SummarySale } from "../Components/Sales/Pos/SummarySale";
import "../Styles/Sales/Pos.css";

function PosSystem() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const addProductToSummary = (product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  const removeProduct = (productToRemove) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.id !== productToRemove.id)
    );
  };

  return (
    <div className="text-center">
      <div className="row">
        <div className="col-sm-7">
          <FilteredProducts
            onAddProduct={addProductToSummary}
            selectedProducts={selectedProducts}
          />
        </div>
        <div className="col-sm-1 maxWidth">
          <div className="vertical-line"></div>
        </div>
        <div className="col-sm-2 summary-sale-width">
          <SummarySale
            selectedProducts={selectedProducts}
            onRemoveProduct={removeProduct}
          />
        </div>
      </div>
    </div>
  );
}

export { PosSystem };
