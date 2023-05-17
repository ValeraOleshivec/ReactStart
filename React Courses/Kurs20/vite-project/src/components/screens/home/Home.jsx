import { useState, useMemo} from 'react'
import styles from './Home.module.css'
import {cars} from './cars.data.js'
import CarItem from "./Car-item/CarItem.jsx";
import CreateCarForm from "./Create-car-form/CreateCarForm.jsx";


function Home() {
    const [carsList,setCarsList] = useState(cars)
    return (
        <div>
            <h1>
                Cars catalog
            </h1>
            <CreateCarForm setCarsList={setCarsList}/>
            <div>
                {carsList.length !== 0 ? carsList.map(car=> (
                    <CarItem key={car.id} car={car}/>
                )) : <p>Машин нет</p>}
            </div>
        </div>

    )
}

export default Home
