import React from "react";
import { DangerButton } from "../../GeneralComponents/DangerButton";

function SummarySale() {
  return (
    <div>
      <h2>Resumen de la Venta</h2>
      <br />
      <div className="scrollable-summary">
        <div className="card border-warning">
          <div className="card-body d-flex align-items-center justify-content-between">
            <p className="text-start">Nombre Producto</p>
            <input
              type="number"
              className="form-control w-25 h-25"
              placeholder="Cantidad"
            />
            <p className="text-end">Subtotal: $42.000</p>
            <DangerButton icon={"fa-regular fa-trash-can"} />
          </div>
        </div>
        <br />
      </div>
      <br />
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Finalizar Venta</h5>
          <p class="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p class="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p class="card-text">
            This is a wider card with supporting text below as a natural
          </p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export { SummarySale };
