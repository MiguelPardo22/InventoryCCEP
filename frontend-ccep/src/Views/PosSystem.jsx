import React from "react";
import { FilteredProducts } from "../Components/Sales/Pos/FilteredProducts";
import { SummarySale } from "../Components/Sales/Pos/SummarySale";
import "../Styles/Sales/Pos.css";

function PosSystem() {
  return (
    <div className="text-center">
      <div className="row">
        <div className="col-sm-7">
          <FilteredProducts />
        </div>
        <div className="col-sm-1 maxWidth">
          <div className="vertical-line"></div>
        </div>
        <div className="col-sm-4 summary-sale-width">
          <SummarySale />
        </div>
      </div>
    </div>
  );
}

export { PosSystem };
