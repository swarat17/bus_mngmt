import React from 'react'
import ToBusStop from './ToBusStop'
import NearestBus from './NearestBus'
import RoutePDF from './RoutePDF'
import Feedback from './Feedback'
import NavBar from './NavBar'
import { Route, Routes } from 'react-router-dom'
//import Home from './Home'
import LoginForm from './components/loginform'

export default function App() {
    return (
        <div className='container'>
            {/* <Home/> */}
            {/* <ToBusStop /> */}
            {/* <NearestBus/> */}
            <Routes>
                <Route path="/" element={<LoginForm/>}/>
                {/* <Route exact path= "/" element={<Home />} /> */}
                <Route exact path= "/tobusstop" element={<ToBusStop />} />
                <Route exact path= "/nearestbus" element={<NearestBus/>} />
                <Route exact path= "/routepdf" element={<RoutePDF/>} />
                <Route exact path= "/feedback" element={<Feedback/>} />
            </Routes>
        </div>
    )
}