import React from 'react'
import {MdDirectionsBus, MdMultipleStop} from "react-icons/md";

export const SidebarData = [
    {
        title: 'To Bus Stop',
        path: '/tobusstop',
        icon: <MdMultipleStop />,
        cName: 'nav-text'
    },
    {
        title: 'Nearest Bus',
        path: '/nearestbus',
        icon: <MdDirectionsBus />,
        cName: 'nav-text'
    },
]
