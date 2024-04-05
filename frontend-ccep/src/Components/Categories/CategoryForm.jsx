import React, { useContext, useEffect, useState } from "react";
import "../../Styles/Categories/CategoryForm.css";
import ServiceCategory from "../../Services/ServiceCategory";
import { GeneralContext } from "../../Context/GeneralContext";

function CategoryForm({ categoriesList, editCategory }) {
  //Campos del json y del formulario
  const [name, setName] = useState("");
  const [state, setState] = useState("Activo");

  //Estado para saber si se esta editando o no
  const [isEditMode, setIsEditMode] = useState(false);

  //Texto para mostrar errores de validaciones
  const [nameError, setNameError] = useState("");
  const [stateError, setStateError] = useState("");

  //Contexto General
  const { closeModal, ok, swalCard } = useContext(GeneralContext);

  const onStatusChange = (e) => {
    setState(e.target.value);
  };

  useEffect(() => {
    // Si se proporciona una categoría para editar, establecer el modo de edición y llenar los campos.
    if (editCategory) {
      setIsEditMode(true);
      setName(editCategory.name);
      setState(editCategory.state);
    } else {
      // Si no se proporciona una categoría para editar, resetear el formulario.
      setName("");
      setState("Activo");
      setIsEditMode(false);
    }
  }, [editCategory]);

  //Metodo para editar o crear categorias
  const saveOrUpdate = async (e) => {
    e.preventDefault();
    
    if (name.trim() === "") {
      setNameError("Este campo es requerido");
      return;
    } else {
      setNameError("");
    }

    if (state.trim() === "") {
      setStateError("Este campo es requerido");
      return;
    } else {
      setStateError("");
    }

    //Campos del json para enviar al servidor
    const updatedCategory = { name, state };

    try {
      //Validar si se quiere editar o crear
      if (isEditMode) {
        const response = await ServiceCategory.update(
          editCategory.id,
          updatedCategory
        );
        ok(response.data.message, "success");

        if (response.data.code == 400) {
          swalCard("Categoria Existente", response.data.message, "error");
        }

      } else {
        const response = await ServiceCategory.add(updatedCategory);
        ok(response.data.message, "success");

        if (response.data.code == 400) {
          swalCard("Categoria Existente", response.data.message, "error");
        }
      }

      closeModal();
      categoriesList();
    } catch (error) {
      console.error(error.message);
      ok(error.message, "error");
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
      {/* Mostrar cada vez que se quiera editar */}
      {isEditMode && (
        <div className="form-group">
          <label>Estado:</label>
          <select
            id="state"
            name="state"
            value={state}
            onChange={onStatusChange}
            className="form-control"
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

export { CategoryForm };