import React, { useContext, useEffect, useState } from "react";
import "../../Styles/SubCategories/SubCategoryForm.css";
import ServiceSubCategory from "../../Services/ServiceSubCategory";
import ServiceCategory from "../../Services/ServiceCategory";
import { GeneralContext } from "../../Context/GeneralContext";

function SubCategoryForm({ subCategoriesList, editSubCategory }) {
  //Campos del json y del formulario
  const [name, setName] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [state, setState] = useState("Activo");
  const [isEditMode, setIsEditMode] = useState(false);

  //Estados para mostrar los errores de validacion
  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [stateError, setStateError] = useState("");

  const [categories, setCategories] = useState([]);

  //Contexto General
  const { closeModal, ok, swalCard } = useContext(GeneralContext);

  const onStatusChange = (e) => {
    setState(e.target.value);
  };

  const onCategoryIdChange = (e) => {
    setCategory_id(e.target.value);
  };

  //Llamado al service para listar Categorias una vez terminada la operacion de editar o crear
  const categoriesList = () => {
    ServiceCategory.getCategoriesNotPaginated()
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    categoriesList();
  }, []);

  useEffect(() => {
    // Si se proporciona una SubCategoría para editar, establecer el modo de edición y llenar los campos.
    if (editSubCategory) {
      setIsEditMode(true);
      setName(editSubCategory.name);
      setCategory_id(editSubCategory.category_id.id);
      setState(editSubCategory.state);
    } else {
      // Si no se proporciona una SubCategoría para editar, resetear el formulario.
      setName("");
      setCategory_id();
      setState("Activo");
      setIsEditMode(false);
    }
  }, [editSubCategory]);

  //Metodo para crear o editar subcategorias
  const saveOrUpdate = async (e) => {
    e.preventDefault();

    //Campos del json para enviar al servidor
    const updatedSubCategory = { name, category_id, state };

    //Validacion de campos
    if (name.trim() === "") {
      setNameError("Este campo es requerido");
      return;
    } else {
      setNameError("");
    }

    if (category_id.toString().trim() === "") {
      setCategoryError("Este campo es requerido");
      return;
    } else {
      setCategoryError("");
    }

    if (state.trim() === "") {
      setStateError("Este campo es requerido");
      return;
    } else {
      setStateError("");
    }

    try {
      //Indicar que se quiere editar
      if (isEditMode) {
        const response = await ServiceSubCategory.update(
          editSubCategory.id,
          updatedSubCategory
        );
        ok(response.data.message, "success");

        if (response.data.code == 400) {
          swalCard("SubCategoria Existente", response.data.message, "error");
        }
      } else {
        //Indicar que se quiere crear
        const response = await ServiceSubCategory.add(updatedSubCategory);
        ok(response.data.message, "success");

        if (response.data.code == 400) {
          swalCard("SubCategoria Existente", response.data.message, "error");
        }
      }

      closeModal();
      subCategoriesList();
    } catch (error) {
      console.error(error.message);
      swalCard("Hubo un problema", error.message, "error");
      closeModal();
    }
  };

  return (
    <form>
      <div className="form-group">
        <label>Nombre:</label>
        <input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`form-control ${nameError && "error"}`}
          placeholder="Nombre"
        />
        {nameError && <span className="error-message">{nameError}</span>}
      </div>
      <div className="form-group">
        <label>Categoria:</label>
        <select
          id="category_id"
          name="category_id"
          value={category_id}
          onChange={onCategoryIdChange}
          className={`form-control ${categoryError && "error"}`}
        >
          <option value="">--Seleccione una Categoria--</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {categoryError && (
          <span className="error-message">{categoryError}</span>
        )}
      </div>
      {/* Mostrar cada vez que se quiera editar */}
      {isEditMode && (
        <div className="form-group">
          <label>Estado:</label>
          <select
            id="state"
            name="state"
            value={state}
            onChange={onStatusChange}
            className={`form-control ${stateError && "error"}`}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
          {stateError && <span className="error-message">{stateError}</span>}
        </div>
      )}
      <div className="containerButton">
        <button type="button" className="btns danger" onClick={closeModal}>
          Cancelar <i className="fa-solid fa-xmark"></i>
        </button>
        <button type="button" className="btns success" onClick={saveOrUpdate}>
          Guardar <i className="fa-solid fa-check"></i>
        </button>
      </div>
    </form>
  );
}

export { SubCategoryForm };
