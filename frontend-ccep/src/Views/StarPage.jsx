import React from 'react';

function StartPage() {
  return (
    <div>
      <h1>StartPage</h1>
      <div className="card-container">
        {/* Cards */}
        <div className="card">Productos Vendidos: </div>
        <div className="card">Numero de Ventas:</div>
        <div className="card">Valor Total Ventas:</div>
        <div className="card">Numero de Compras: </div>
        <div className="card">Card 5</div>
        <div className="card">Card 6</div>
        <div className="card">Card 7</div>
        <div className="card">Card 8</div>
        {/* Añade más cards según sea necesario */}
      </div>
      <div className="additional-content">
        {/* Contenido adicional */}
        <p>Aquí puedes añadir un gráfico, una lista de tareas, o cualquier otro contenido relevante.</p>
      </div>
    </div>
  );
}

export { StartPage };
