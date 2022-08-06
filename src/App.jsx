import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { FormSubject, Menu, PlayGame, Questions } from "./components";
import FormQuestion from "./components/Questions/FormQuestion";
import { useAuth } from "./firebase/auth";
import { Layout, Login } from "./pages";
import "./sass/styles.css";
import background from "./assets/imgs/background.jpg";

function App() {
  const currentUser = useAuth();

  return (
    <div className="app" style={{ backgroundImage: `url(${background})` }}>
      <HashRouter>
        {!currentUser?.email ? (
          <Login />
        ) : (
          <Layout>
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/form-subject" element={<FormSubject />} />
              <Route path="/form-question" element={<FormQuestion />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/play-game" element={<PlayGame />} />
            </Routes>
          </Layout>
        )}
      </HashRouter>
    </div>
  );
}

export default App;
