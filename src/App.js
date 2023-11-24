import FiltroModule from "./02-Componetes/00-Filtro/Filtro.Module";
import TarjetasModule from "./02-Componetes/01-Tarjetas/Tarjetas.Module";
const App = () => {
  return (
    <div className="container py-3">
      <FiltroModule />
      <TarjetasModule />
    </div>
  );
}
export default App;