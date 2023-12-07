import React from 'react'
import Followers from "./Followers"
import Following from "./Following"
const Selector = (props) =>{
    const type = props;
    if(type === false)
    {
        return (<Followers></Followers>)
    }
    else
    return (<Following></Following>)
}

export default Selector