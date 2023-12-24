import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import MenuForm from './components/MenuForm';
import AdminLayout from './components/AdminLayout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/admin" element={<AdminLayout />}>
            <Route path="" element={<Admin />} />
            <Route path='/admin/add' element={<MenuForm operationMode="Ajouter"></MenuForm>}/>
            <Route path='/admin/edit-menu/:id' element={<MenuForm operationMode="Modifier"></MenuForm>}></Route>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
