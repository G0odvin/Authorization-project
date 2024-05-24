import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Unauthorized } from './components/Unauthorized';
import { Register } from './components/Register';
import { RequireAuth } from './components/RequireAuth';
import { Home } from './components/Home';
import { Admin } from './components/Admin';
import { Editor } from './components/Editor';
import { Lounge } from './components/Lounge';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      {/* public routes */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="unauthorizaed" element={<Unauthorized />} />

      {/* we want to protect this routes */}
      <Route element={<RequireAuth allowedRoles={[2001]} />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[1984]} />}>
        <Route path="editor" element={<Editor />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[5150]} />}>
        <Route path="admin" element={<Admin />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[1984, 5150]} />}>
        <Route path="lounge" element={<Lounge />} />
      </Route>
    </Routes>
  );
}

export default App;
