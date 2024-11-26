import React from 'react'
import {MdDirectionsBus, MdMultipleStop, MdFeedback} from "react-icons/md";
import { FaRoad } from 'react-icons/fa';

export const SidebarData = [
    // {
    //     title: 'Login',
    //     path: '/',
    //     icon: <MdDirectionsBus />,
    //     cName: 'nav-text'
    // },
    {
        title: 'Nearest Bus Stop',
        path: '/tobusstop',
        icon: <MdMultipleStop />,
        cName: 'nav-text'
    },
    {
        title: 'Find Route and Bus',
        path: '/nearestbus',
        icon: <MdDirectionsBus />,
        cName: 'nav-text'
    },
    {
        title: 'Routes',
        path: '/routepdf',
        icon: <FaRoad />,
        cName: 'nav-text'
    },
    {
        title: 'Feedback',
        path: '/feedback',
        icon: <MdFeedback />,
        cName: 'nav-text'
    }
]
