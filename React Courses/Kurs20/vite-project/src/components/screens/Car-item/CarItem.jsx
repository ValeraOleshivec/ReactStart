import React from 'react';
import {useParams} from "react-router-dom";

const CarItem = () => {
    const {id} = useParams()
    return (
        <div>
            3223 {id}
        </div>
    );
};

export default CarItem;