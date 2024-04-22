import React, { useEffect, useState } from "react";
import { DangerButton } from "../../GeneralComponents/DangerButton";

function SummarySale({ selectedProducts, onRemoveProduct }) {
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calcula el subtotal de cada producto y el total de la venta
    let subtotal = 0;
    selectedProducts.forEach((product) => {
      const quantity = quantities[product.id] || 0;
      const productSubtotal = quantity * product.sale_price;
      subtotal += productSubtotal;
    });
    setTotal(subtotal);
  }, [selectedProducts, quantities]);

  // Función para manejar cambios en la cantidad de un producto
  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  // Función para eliminar un producto de la lista
  const handleRemoveProduct = (product) => {
    onRemoveProduct(product);
    // Elimina la cantidad del producto del estado de cantidades
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[product.id];
      return newQuantities;
    });
  };

  return (
    <div>
      <h2>Resumen de la Venta</h2>
      <br />
      <div className="scrollable-summary">
        {selectedProducts.map((product) => (
          <div key={product.id}>
            <div className="card border-warning">
              <div className="card-body d-flex align-items-center justify-content-between">
                <p className="text-start product-name" title={product.name}>{product.name}</p>
                <p className="text-start">
                  ${product.sale_price.toLocaleString("es-CO")}
                </p>
                <input
                  type="number"
                  className="form-control w-25 h-25"
                  placeholder="Cantidad"
                  value={quantities[product.id] || ""}
                  onChange={(e) =>
                    handleQuantityChange(product.id, parseInt(e.target.value))
                  }
                />
                <p className="text-end">
                  Subtotal: $
                  {(
                    (quantities[product.id] || 0) * product.sale_price
                  ).toLocaleString("es-CO")}
                </p>
                {/* Al hacer clic en el botón de eliminar, llama a handleRemoveProduct con el producto actual */}
                <DangerButton
                  icon={"fa-regular fa-trash-can"}
                  execute={() => handleRemoveProduct(product)}
                />
              </div>
            </div>
            <br />
          </div>
        ))}
      </div>
      <br />
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Finalizar Venta</h5>
          <p className="card-text text-start">
            Total: ${total.toLocaleString("es-CO")}
          </p>
          <p className="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p className="card-text">
            This is a wider card with supporting text below as a natural
          </p>
          <p className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export { SummarySale };
