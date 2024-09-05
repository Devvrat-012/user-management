import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './pages/UserList';
import UserForm from './components/UserForm';
import NavBar from './components/NavBar';
import UserDetail from './pages/UserDetail';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/create" element={<UserForm />} />
          <Route path="/user/:id" element={<UserForm />} />
          <Route path='/user/details/:id' element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
