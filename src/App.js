import { Provider } from "react-redux";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import "./App.css";
// import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import { store } from "./store/store";
import Home from "./Components/Home";
import TopRated from "./Components/TopRated";
import UpComing from "./Components/UpComing";
import MovieDetailedPage from "./Components/MovieDetailedPage";
import NotFound from "./Components/NotFound";
import SearchComponent from "./Components/SearchComponent";

function App() {
  return (
    <Provider store={store}>
      <div className="app-bg-container">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/upcoming" element={<UpComing />} />
            <Route path="/movie/:id" element={<MovieDetailedPage />} />
            <Route path="/search/:search" element={<SearchComponent />} />
            <Route element={<NotFound />} />

          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
