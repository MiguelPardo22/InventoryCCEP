import React, { useEffect, useState, useRef } from "react";
import { PrimaryButton } from "../../GeneralComponents/PrimaryButton";
import ServiceProduct from "../../../Services/ServiceProduct";

function FilteredProducts() {
  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState([]);
  // Estado para almacenar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para controlar el estado de carga
  const [loading, setLoading] = useState(false);
  // Referencia al input de búsqueda
  const inputRef = useRef(null);

  // Manejar cambios en el término de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Realizar la búsqueda de productos cuando cambie el término de búsqueda
  useEffect(() => {
    const searchProduct = async () => {
      setLoading(true); // Establecer el estado de carga como true antes de realizar la llamada a la API
      try {
        const response = await ServiceProduct.filteredProducts({
          name: searchTerm, // Buscar por nombre o referencia
        });
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Establecer el estado de carga como false después de recibir la respuesta de la API
      }
    };

    searchProduct();

    // Enfocar el input cuando la página se renderice o cuando cambie el término de búsqueda
    inputRef.current.focus();
  }, [searchTerm]);

  return (
    <>
      {/* Encabezado */}
      <h2>Filtrar Productos Por Nombre</h2>
      <br />
      {/* Contenedor de búsqueda */}
      <div className="container text-center">
        <div className="row mb-3">
          <div className="col">
            {/* Input de búsqueda */}
            <input
              ref={inputRef} // Asignar la referencia al input
              type="text"
              className="form-control"
              placeholder="Buscar producto por referencia o nombre..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <hr />
        {/* Mostrar mensaje de carga o resultados de búsqueda */}
        {loading ? (
          // Mostrar icono de carga si está cargando
          <i className="fa-solid fa-arrow-rotate-right fa-spin"></i>
        ) : products === null || products.length === 0 ? (
          // Mostrar mensaje si no se encontraron productos
          <div className="alert alert-warning" role="alert">
            No se encontró el Producto
          </div>
        ) : (
          <div className="scrollable-products">
            {/* Mostrar resultados de búsqueda */}
            <div className="row row-cols-3">
              {products.map((product) => {
                return (
                  <div className="col p-3" key={product.id}>
                    <div
                      className="card"
                      style={{ width: "16rem", height: "100%" }}
                    >
                      <div className="card-body">
                        {/* Detalles del producto */}
                        <h5 className="card-title" style={{ color: "#eabe3f" }}>
                          {product.name}
                        </h5>
                        <hr />
                        <h6 className="card-subtitle mb-2 text-muted">
                          Referencia: {product.reference}
                        </h6>
                        <hr />
                        <h6 className="card-subtitle mb-2">
                          Precio: ${product.sale_price.toLocaleString("es-CO")}
                        </h6>
                        <hr />
                        <p className="card-text">{product.description}</p>
                        {/* Botón de agregar */}
                        <PrimaryButton
                          text={"Agregar"}
                          icon={"fa-solid fa-cart-plus"}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export { FilteredProducts };
