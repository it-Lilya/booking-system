import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { REPO_NAME } from './repo';
import { TrainSelection } from './components/TrainSelection/TrainSelection';
import { General } from './pages/General';

export default function App() {
  return (
    <BrowserRouter basename={`/${REPO_NAME}`}>
      <Routes className='App'>
        <Route path='/' element={<General/>} />
        <Route path='/train-selection' element={<TrainSelection />}/>
        <Route path='/*' element={<Navigate to='/' />}/>
      </Routes>
      </BrowserRouter>
  );
}
