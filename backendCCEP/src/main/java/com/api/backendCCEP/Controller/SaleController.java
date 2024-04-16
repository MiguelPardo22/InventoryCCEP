package com.api.backendCCEP.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.backendCCEP.Facade.IProduct;
import com.api.backendCCEP.Facade.ISale;
import com.api.backendCCEP.Model.Product;
import com.api.backendCCEP.Model.Sale;
import com.api.backendCCEP.Model.Sale_Detail;
import com.api.backendCCEP.Util.ApiResponse;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping({ "/vendor" })
public class SaleController {

    // Instacias
    private IProduct iProduct;
    private ISale iSale;

    public SaleController(IProduct iProduct, ISale iSale) {
        this.iProduct = iProduct;
        this.iSale = iSale;
    }

    // Listar Ventas sin paginacion
    @GetMapping({ "/sales" })
    public ApiResponse<List<Sale>> getSalesListNotPaginated() {

        ApiResponse<List<Sale>> response = new ApiResponse<>();

        try {
            List<Sale> suppliers = iSale.listSales();

            response.setSuccess(true);
            response.setMessage("Consulta exitosa");
            response.setData(suppliers);
            response.setCode(200);

        } catch (Exception e) {

            response.setSuccess(false);
            response.setMessage("Error en la consulta");
            response.setData(null);
            response.setCode(500);

        }

        return response;
    }

    @PostMapping("/sales/create")
    public ApiResponse<Sale> saveSaleWithDetails(@RequestBody Map<String, Object> request) {

        ApiResponse<Sale> response = new ApiResponse<>();

        try {

            // Inicializar la variable total
            long total = 0;

            // Instaciar el objeto sale
            Sale sale = new Sale();

            //Llenar los campos de la venta
            sale.setDate_sale(new Date());
            sale.setTotal_sale(total);
            sale.setUser_id((Integer) request.get("user_id"));
            sale.setState("Activo");
            iSale.save(sale);

            // Convierte el objeto de detalles del request a un array
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> details = (List<Map<String, Object>>) request.get("details");

            //Recorrer el objeto detalles, para llenar los campos de los detalles
            for (Map<String, Object> detailMap : details) {

                // Inicializar la variable del subtotal y del descuento
                long subtotal = 0;

                // Instaciar el objeto Sale_Details
                Sale_Detail detail = new Sale_Detail();

                // Cargar completamente el producto antes de asignarlo al detalle
                Product product = iProduct.findById((Integer) detailMap.get("product_id"));
                if (product == null) {
                    response.setSuccess(false);
                    response.setMessage("El producto con id " + detailMap.get("product_id")
                            + " no se encontró en la base de datos.");
                    response.setData(null);
                    response.setCode(404);
                    return response;
                }

                // Definir las variables para calcular el subtotal
                long salePrice = product.getSale_price();
                long discount = (Integer) detailMap.get("discount");

                // Calculamos el subtotal antes de aplicar el descuento
                subtotal = ((Integer) detailMap.get("quantity")) * salePrice;

                // Restamos el descuento del subtotal
                subtotal -= discount;

                // Agregamos el subtotal al total de la venta
                total += subtotal;

                detail.setSale_id(sale);

                detail.setQuantity((Integer) detailMap.get("quantity"));
                detail.setProduct_id(product);
                detail.setFinal_price(discount);

                detail.setSubtotal(subtotal);
                iSale.saveDetails(detail);
            }

            sale.setTotal_sale(total);
            iSale.save(sale);
            response.setSuccess(true);
            response.setMessage("Venta Guardada exitosamente");
            response.setData(sale);
            response.setCode(201);

        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Error al guardar la venta: " + e);
            response.setData(null);
            response.setCode(500);
        }

        return response;
    }
}
