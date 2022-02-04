import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";
import Layout from "./component/layouts/Layout";
import AppRouter from "./routers/AppRouter";


// AuthProivder, Es un componente que retorna a sus hijos el valor de un contexto
// es decir, un valor global par que los puedan consumir

// 

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Layout>
            <AppRouter />
          </Layout>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
