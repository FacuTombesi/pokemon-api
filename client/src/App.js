import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import PokemonDetail from "./components/PokemonDetail";
import CreatePokemon from "./components/CreatePokemon";
import About from "./components/About";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route path="/pokemons/:id" component={PokemonDetail} />
        <Route path="/pokemons/create" component={CreatePokemon} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
