import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPresupuesto,
  setIsValidPresupuesto
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

    const handleResetaApp = () => {
        const resultado = confirm("Deseas Resetear los Datos?")
      if(resultado){
        setGastos([]);
        setPresupuesto(0);
        setIsValidPresupuesto(false);
        localStorage.clear();
      }

    }

  useEffect(() => {
    let totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    let nuevoporcentaje = ((totalGastado / presupuesto) * 100).toFixed(2);

    setTimeout(() => {
      setPorcentaje(nuevoporcentaje);
    }, 500);

    setGastado(totalGastado);
    setDisponible(presupuesto - totalGastado);
  }, [gastos]);

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
          styles={buildStyles({
            textColor: porcentaje > 100 ? "#DC2626" : "#4178E5",
            pathColor: porcentaje > 100 ? "#DC2626" : "#4178E5",
            pathTransitionDuration: 0.5,
            trailColor: "#f5f5f5",
          })}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app"
        onClick={handleResetaApp}

        
        >Resetear Presupuesto</button>
        <p>
          <span>Presupuesto:</span>
          {formatearCantidad(presupuesto)}
        </p>
        <p>
          <span>Gastado:</span>
          {formatearCantidad(gastado)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>{disponible < 0 ? "Deuda" : "Disponible"}</span>
          {formatearCantidad(disponible)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
