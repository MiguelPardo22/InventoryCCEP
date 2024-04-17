package com.api.backendCCEP.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.backendCCEP.Facade.IProduct;
import com.api.backendCCEP.Facade.ISale;
import com.api.backendCCEP.Model.Payment_Method;
import com.api.backendCCEP.Model.Product;
import com.api.backendCCEP.Model.Sale;
import com.api.backendCCEP.Model.Sale_Detail;
import com.api.backendCCEP.Repository.Payment_MethodRepository;
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
    private Payment_MethodRepository payment_MethodRepository;

    public SaleController(IProduct iProduct, ISale iSale, Payment_MethodRepository payment_MethodRepository) {
        this.iProduct = iProduct;
        this.iSale = iSale;
        this.payment_MethodRepository = payment_MethodRepository;
    }

    private boolean isNullOrEmpty(Object[] array) {
        if (array == null) {
            return true; // Si el array es nulo, consideramos que está vacío
        }

        for (Object obj : array) {
            if (obj == null) {
                return true; // Si encontramos un objeto nulo, devolvemos true
            } else if (obj instanceof String && ((String) obj).trim().isEmpty()) {
                return true; // Si encontramos un string vacío, devolvemos true
            }
        }

        return false; // Si ninguno de los objetos en el array es nulo o vacío, devolvemos false
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

    // Registrar Ventas
    @PostMapping("/sales/create")
    public ApiResponse<Sale> saveSaleWithDetails(@RequestBody Map<String, Object> request) {

        ApiResponse<Sale> response = new ApiResponse<>();

        try {

            // Inicializar la variable total y discount
            long total = 0;
            long discount = (Integer) request.get("discount");

            Object[] fieldsToValidateSale = { request.get("user_id"), request.get("paymethod_id"), request.get("discount") };

            // Validar que el campo user_id y discount no esten vacíos
            if (isNullOrEmpty(fieldsToValidateSale)) {
                response.setSuccess(false);
                response.setMessage("El campo 'usuario', 'Metodo de pago' y 'descuento' es obligatorio y no puede estar vacío.");
                response.setData(null);
                response.setCode(400);
                return response;
            }

            // Cargar completamente el metodo de pago antes de asignarlo a la venta
            Payment_Method payment_Method = payment_MethodRepository.findById((Integer) request.get("paymethod_id")).orElse(null);
            if (payment_Method == null) {
                response.setSuccess(false);
                response.setMessage("El metodo de pago con el id: " + request.get("paymethod_id")
                        + " no existe");
                response.setData(null);
                response.setCode(404);
                return response;
            }

            // Instaciar el objeto sale
            Sale sale = new Sale();

            // Llenar los campos de la venta
            sale.setSale_date(new Date());
            sale.setTotal_sale(total);
            sale.setDiscount(discount);
            sale.setUser_id((Integer) request.get("user_id"));
            sale.setPaymethod_id(payment_Method);
            sale.setState("Activo");
            iSale.save(sale);

            // Validar que el campo details no esté vacío y sea una lista
            if (!request.containsKey("details") || !(request.get("details") instanceof List)) {
                response.setSuccess(false);
                response.setMessage("El objeto 'details' es obligatorio y debe ser una lista de detalles.");
                response.setData(null);
                response.setCode(400);
                return response;
            }

            // Convierte el objeto de detalles del request a un array
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> details = (List<Map<String, Object>>) request.get("details");

            // Validar que la lista de detalles no esté vacía
            if (details.isEmpty()) {
                response.setSuccess(false);
                response.setMessage("La lista de detalles no puede estar vacía.");
                response.setData(null);
                response.setCode(400);
                return response;
            }

            // Recorrer el objeto detalles, para llenar los campos de los detalles
            for (Map<String, Object> detailMap : details) {

                // Inicializar la variable del subtotal
                long subtotal = 0;

                Object[] fieldsToValidateDetail = { detailMap.get("quantity"), detailMap.get("product_id") };

                // Validar que los campos de cada detalle no estén vacíos
                if (isNullOrEmpty(fieldsToValidateDetail)) {
                    response.setSuccess(false);
                    response.setMessage(
                            "Los campos 'Cantidad', 'Producto' y 'Descuento' son obligatorios y no pueden estar vacíos");
                    response.setData(null);
                    response.setCode(400);
                    return response;
                }

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

                // Calculamos el subtotal antes de aplicar el descuento
                subtotal = ((Integer) detailMap.get("quantity")) * salePrice;

                // Agregamos el subtotal al total de la venta
                total += subtotal;

                // Llenar los campos 
                detail.setSale_id(sale);
                detail.setQuantity((Integer) detailMap.get("quantity"));
                detail.setProduct_id(product);
                detail.setSubtotal(subtotal);
                iSale.saveDetails(detail);
            }

            total -= discount;

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
