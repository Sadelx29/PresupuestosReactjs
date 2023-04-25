import React from "react";
import { useState, useEffect } from "react";
import CerrarBtn from "../img/cerrar.svg";
import Mensaje from "./Mensaje";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar,
}) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [id, setId]  = useState("")
  const [fecha, setFecha] = useState("")


  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, []);

  const ocultarModal = () => {
    console.log("hice click");
    setAnimarModal(false);
    setGastoEditar({})

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");

      setTimeout(() => {
        setMensaje("");
      }, 2000);

      return;
    }
    setNombre("");
    setCantidad("");
    setCategoria("");
    guardarGasto({ nombre, cantidad, categoria, id, fecha });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} onClick={ocultarModal} />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>
          {Object.keys(gastoEditar).length > 0 ? "Editar Gasto" : "Nuevo Gasto"}
        </legend>
        <div className="campo">
          {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
          <label htmlFor="nombre">Nombre Gasto</label>

          <input
            type="text"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
            placeholder="Ej. Arroz"
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            onChange={(e) => setCantidad(Number(e.target.value))}
            value={cantidad}
            placeholder="Ej. 100"
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            name="categoria"
            id="categoria"
            onChange={(e) => setCategoria(e.target.value)}
            value={categoria}
          >
            <option value="">--Seleccione--</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="gastos">Gastos</option>
            <option value="salud">Salud</option>
            <option value="ocio">Ocio</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <div className="campo">
          <input
            type="submit"
            value={
              Object.keys(gastoEditar).length > 0
                ? "Editar Gasto"
                : "Agregar Gasto"
            }
            className="boton"
          />
        </div>
      </form>
    </div>
  );
};

export default Modal;
