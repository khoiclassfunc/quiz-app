import "./App.css";
import { useAuth } from "./firebase/auth";
import { Layout, Login } from "./pages";
import "./sass/styles.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FormSubject, Menu, PlayGame, Questions } from "./components";
import FormQuestion from "./components/Questions/FormQuestion";

function App() {
  // const [loading, setLoading] = useState(false);

  // const [user, setUser] = useState({});

  const currentUser = useAuth();

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

  // const handleLogout = async () => {
  //   setLoading(true);
  //   setTimeout(() => {}, 500);
  //   try {
  //     await logout();
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLoading(false);
  // };

  return (
    <div className="App">
      <BrowserRouter>
        {!currentUser?.email ? (
          <Login />
        ) : (
          <Layout>
            <Routes>
              {/* <Route path="form-subject">
                <FormSubject />
              </Route> */}
              <Route path="/" element={<Menu />} />
              <Route path="/form-subject" element={<FormSubject />} />
              <Route path="/form-question" element={<FormQuestion />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/play-game" element={<PlayGame />} />
            </Routes>
          </Layout>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
