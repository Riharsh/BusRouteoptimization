import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/HomeD/Home';
import Buses from './components/Buses/Buses';
import College from './components/CollegeDetails/College';
import Driver from './components/Driver';
import Signup from './components/Signup';
import Login from './components/Login';
import Location from './components/Location/Location';
import StudentLocation from './components/Location/StudentLocation';
import { PrivateRoute } from './components/PrivateRoute';
import Map from './components/Map/Map';
const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path = '/login' element = {<Login/>}/>
          <Route path='/' element={<PrivateRoute />}>
          <Route path='/driver-details' element={<Driver/>}/>
          <Route path='/college-details' element={<College/>}/>
          <Route path='/bus-details' element={<Buses/>}/>
          {/* <Route path='/bus-details' element={<BusDetails/>}/> */}
          <Route path='/student-location' element={<StudentLocation/>}/>
          <Route path='/user-services' element={<Location/>}/>
          <Route path='/map' element={<Map/>}/>
          </Route>
        </Routes>
      </Router>
      {/* <Signup/> */}
    </div>
  );
}

export default App;
