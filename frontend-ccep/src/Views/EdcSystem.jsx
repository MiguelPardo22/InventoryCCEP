import React, { useEffect, useState } from "react";
import Select from "react-select";
import ServiceSupplier from "../Services/ServiceSupplier";
import ServiceProduct from "../Services/ServiceProduct";
import ServicePurchase from "../Services/ServicePurchase";
import { PrimaryButton } from "../Components/GeneralComponents/PrimaryButton";
import { DangerButton } from "../Components/GeneralComponents/DangerButton";

const EdcSystem = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [disableSupplierSelect, setDisableSupplierSelect] = useState(false);
  const [total, setTotal] = useState(0);
  const [billNumber, setBillNumber] = useState();

  // Llamado al service para listar proveedores
  const suppliersList = () => {
    ServiceSupplier.getAllSuppliersNotPaginated()
      .then((response) => {
        setSuppliers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Método para buscar productos por proveedor
  const findProductByProvider = (providerId) => {
    ServiceProduct.findProductByProvider(providerId)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    suppliersList();
  }, []);

  useEffect(() => {
    // Calcula el total cuando cambian los productos seleccionados
    let newTotal = selectedProducts.reduce(
      (acc, product) => acc + product.subtotal,
      0
    );
    setTotal(newTotal);
  }, [selectedProducts]);

  const handleSupplierChange = (selectedOption) => {
    const selectedSupplier = suppliers.find(
      (supplier) => supplier.id === selectedOption.value
    );
    setSelectedSupplier(selectedSupplier);
    setDisableSupplierSelect(true); // Deshabilitar el select de proveedores
    findProductByProvider(selectedSupplier.id); // Obtener productos por proveedor
  };

  const handleProductSelect = (selectedOption) => {
    const selectedProduct = products.find(
      (product) => product.id === selectedOption.value
    );
    setSelectedProducts([
      ...selectedProducts,
      {
        ...selectedProduct,
        quantity: 1,
        subtotal: selectedProduct.purchase_price,
      },
    ]);
  };

  const handleQuantityChange = (index, quantity) => {
    const newSelectedProducts = [...selectedProducts];
    newSelectedProducts[index].quantity = quantity;
    newSelectedProducts[index].subtotal =
      quantity * newSelectedProducts[index].purchase_price;
    setSelectedProducts(newSelectedProducts);
  };

  const handleRemoveProduct = (index) => {
    const newSelectedProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(newSelectedProducts);
  };

  const handleSavePurchase = () => {
    // Construir objeto de compra
    const purchase = {
      provider_id: selectedSupplier.id,
      billNumber: billNumber,
      total: total,
      details: selectedProducts.map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
        subtotal: product.subtotal,
      })),
    };

    // Guardar compra
    ServicePurchase.savePurchaseWithDetails(purchase)
      .then((response) => {
        console.log("Compra guardada exitosamente", response.data);
        // Limpiar estado después de guardar la compra
        setSelectedSupplier(null);
        setSelectedProducts([]);
        setTotal(0);
        setBillNumber("");
        setDisableSupplierSelect(false);
      })
      .catch((error) => {
        console.error("Error al guardar la compra", error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Registrar Compras</h1>
      <Select
        options={suppliers.map((supplier) => ({
          label: supplier.name,
          value: supplier.id,
        }))}
        onChange={handleSupplierChange}
        placeholder="Buscar y añadir proveedor..."
        isDisabled={disableSupplierSelect}
      />
      {selectedSupplier && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">
              Productos del Proveedor: {selectedSupplier.name}
            </h5>
            <Select
              options={products.map((product) => ({
                label: product.name,
                value: product.id,
              }))}
              onChange={handleProductSelect}
              placeholder="Seleccionar producto..."
            />
            {selectedProducts.length > 0 && (
              <div className="mt-4">
                <div className="scrollable-summary">
                  <div className="table-responsive">
                    <table className="table table-bordered caption-top align-items-center">
                      <thead>
                        <tr>
                          <th>Nombre del producto</th>
                          <th>Cantidad</th>
                          <th>Subtotal</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProducts.map((product, index) => (
                          <tr key={product.id}>
                            <td>{product.name}</td>
                            <td className="text-center">
                              <div className="d-flex justify-content-center">
                                <input
                                  type="number"
                                  min="1"
                                  value={product.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      index,
                                      parseInt(e.target.value, 10)
                                    )
                                  }
                                  className="form-control w-50"
                                />
                              </div>
                            </td>
                            <td className="text-center">
                              $ {product.subtotal.toLocaleString("es-CO")}
                            </td>
                            <td className="text-center">
                              <DangerButton
                                execute={() => handleRemoveProduct(index)}
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
            )}
          </div>
          <div class="list-group list-group-flush">
            <li class="list-group-item">
              <div className="form-group">
                <label htmlFor="billNumber">Numero de Factura:</label>
                <input
                  id="billNumber"
                  name="billNumber"
                  value={billNumber}
                  className="form-control"
                  onChange={(e) => setBillNumber(e.target.value)}
                  placeholder="Numero de Factura"
                />
              </div>
              <br />
              <h5>Total: ${total.toLocaleString("es-CO")}</h5>
              <PrimaryButton
                text={"Finalizar"}
                icon={"fa-solid fa-check"}
                execute={handleSavePurchase}
              />
            </li>
          </div>
        </div>
      )}
    </div>
  );
};

export { EdcSystem };
