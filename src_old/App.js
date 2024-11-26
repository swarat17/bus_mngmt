import React from 'react'
import ToBusStop from './ToBusStop'
import NearestBus from './NearestBus'
import NavBar from './NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'

export default function App() {
    return (
        <div className='container'>
            <NavBar />
            {/* <Home/> */}
            {/* <ToBusStop /> */}
            {/* <NearestBus/> */}
            <Routes>
                <Route exact path= "/" element={<Home />} />
                <Route exact path= "/tobusstop" element={<ToBusStop />} />
                <Route exact path= "/nearestbus" element={<NearestBus/>} />
            </Routes>
        </div>
    )
}