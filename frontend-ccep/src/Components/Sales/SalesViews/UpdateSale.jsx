import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DangerButton } from "../../GeneralComponents/DangerButton";
import Select from "react-select";
import ServiceSale from "../../../Services/ServiceSale";
import ServiceProduct from "../../../Services/ServiceProduct";

function UpdateSale() {
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUser] = useState(0);
  const [total, setTotal] = useState(0);
  const [sale_date, setSale_Date] = useState("");
  const [productDetails, setProductDetails] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [products, setProducts] = useState([]);
  const [sale, setSale] = useState(null);

  let { id } = useParams();

  // Listar los metodos de pago
  const getPaymentsMethods = async () => {
    try {
      const response = await ServiceSale.getAllPaymentsMethods();
      const paymentsMethods = response.data.data;
      setPaymentMethods(paymentsMethods);
    } catch (error) {
      console.log("Error Cargando los datos: ", error);
    }
  };

  // Obtener los detalles de la venta
  const getSaleDetails = async (id) => {
    try {
      const response = await ServiceSale.getSaleDetailById(id);
      const saleDetails = response.data.data;
      setProductDetails(saleDetails);
    } catch (error) {
      console.log("Error Cargando los detalles de la venta: ", error);
    }
  };

  // Obtener todos los productos
  const getAllProducts = async () => {
    try {
      const response = await ServiceProduct.getAllProductsNotPaginated();
      const productsList = response.data.data;
      setProducts(productsList);
    } catch (error) {
      console.log("Error Cargando los productos: ", error);
    }
  };

  // Llenar los campos con la venta encontrada
  const getSaleToEdit = async (id) => {
    try {
      const response = await ServiceSale.getSaleById(id);
      const saleFind = response.data.data;
      setSale(saleFind);
    } catch (error) {
      console.log("Error Cargando los datos: ", error);
    }
  };

  useEffect(() => {
    getPaymentsMethods();
    getSaleToEdit(id);
    getSaleDetails(id);
    getAllProducts();
  }, [id]);

  useEffect(() => {
    if (sale) {
      setUser(sale.user_id);
      setPaymentMethod(sale.paymethod_id.id);
      setStatus(sale.state);
      setTotal(sale.total_sale)
      setDiscount(sale.discount);
      setSale_Date(sale.sale_date);
    }
  }, [sale]);

  const handleProductChange = (index, field, value) => {
    const newDetails = [...productDetails];
    if (field === "product_id") {
      const selectedProduct = products.find((product) => product.id === value);
      newDetails[index][field] = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.sale_price,
      };
    } else {
      newDetails[index][field] = value < "" ? "" : value;
    }
    recalculateSubtotalAndTotal(newDetails);
  };

  const recalculateSubtotalAndTotal = (details) => {
    const newDetails = details.map((detail) => {
      const quantity = parseFloat(detail.quantity) || 0;
      const price = detail.product_id.sale_price || 0;
      const discountProduct = parseFloat(detail.discount_product) || 0;
      const subtotal = quantity * (price - discountProduct);
      return { ...detail, subtotal };
    });

    const newTotal =
      newDetails.reduce((sum, detail) => sum + detail.subtotal, 0) - discount;

    setProductDetails(newDetails);
    setTotal(newTotal);
  };

  const handleDiscountChange = (e) => {
    let newDiscount = parseFloat(e.target.value) || 0;
    newDiscount = newDiscount < "" ? "" : newDiscount;
    setDiscount(newDiscount);
    recalculateSubtotalAndTotal(productDetails);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Actualizar la Venta</h1>
      <div className="row">
        <div className="col-md-5">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between">
              <span>Venta</span>
              <span className="text-muted" style={{ fontSize: "0.80rem" }}>
                {sale_date}
              </span>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Total:</label>
                <span className="form-control-plaintext">
                  ${total.toLocaleString("es-CO")}
                </span>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="discount">
                  Descuento:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="discount"
                  placeholder="Descuento"
                  value={discount}
                  onChange={handleDiscountChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Usuario:</label>
                <span className="form-control-plaintext text-primary">
                  {user}
                </span>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="paymentMethod">
                  Método de Pago:
                </label>
                <select
                  className="form-select"
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="">Selecciona un método de pago</option>
                  {paymentMethods.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="status">
                  Estado:
                </label>
                <select
                  className="form-select"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Selecciona un estado</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card mb-4">
            <div className="card-header">Detalles de la Venta</div>
            <div className="card-body">
              <div className="scrollable-summary">
                <div className="table-responsive">
                  <table className="table caption-top align-items-center">
                    <thead>
                      <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Descuento</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col">Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productDetails.map((detail, index) => (
                        <tr key={detail.id}>
                          <td>
                            <Select
                              options={products.map((product) => ({
                                value: product.id,
                                label: product.name,
                              }))}
                              value={
                                detail.product_id
                                  ? {
                                      value: detail.product_id.id,
                                      label: detail.product_id.name,
                                    }
                                  : null
                              }
                              onChange={(selectedOption) =>
                                handleProductChange(
                                  index,
                                  "product_id",
                                  selectedOption.value
                                )
                              }
                              placeholder="Selecciona un producto"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control width-quantity"
                              value={detail.quantity}
                              onChange={(e) =>
                                handleProductChange(
                                  index,
                                  "quantity",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control width-quantity"
                              value={detail.discount_product}
                              onChange={(e) =>
                                handleProductChange(
                                  index,
                                  "discount_product",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                            />
                          </td>
                          <td>
                            <span className="form-control-plaintext">
                              ${detail.subtotal.toLocaleString("es-CO")}
                            </span>
                          </td>
                          <td>
                            <DangerButton
                              execute={() => {
                                const newDetails = productDetails.filter(
                                  (_, i) => i !== index
                                );
                                recalculateSubtotalAndTotal(newDetails);
                              }}
                              icon={"fa-solid fa-trash-can"}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { UpdateSale };
