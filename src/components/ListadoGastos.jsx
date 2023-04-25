import React from "react";
import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  gastoEditar,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  console.log(gastos);
  return (
    <div className="listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>
            {gastosFiltrados.length ? (
              <p>Listado de Gastos</p>
            ) : (
              <p>No hay gastos</p>
            )}
          </h2>
          {gastosFiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              gastoEditar={gastoEditar}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      ) : (
        gastos.map((gasto) => (
          <Gasto
            key={gasto.id}
            gasto={gasto}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
          />
        ))
      )}
    </div>
  );
};

export default ListadoGastos;
