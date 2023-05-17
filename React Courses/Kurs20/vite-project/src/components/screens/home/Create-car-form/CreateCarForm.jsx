import React, {useState} from 'react';
import styles from './CreateCarForm.module.css'
const CreateCarForm = ({setCarsList}) => {

    const clearCreateForm = {
        price:'',name:'',img:''
    }


    const [carObj,setCarObj] = useState({
        price:'',name:'',img:''
    })

    const createCar = (e)=>{
        e.preventDefault()
        setCarsList(prev =>[...prev,{
            id:prev.length + 1, ...carObj
        }])
        setCarObj(clearCreateForm)
    }
    return (
        <form className={styles.form}>
            <input placeholder='Name' onChange={event =>setCarObj(prev =>({...prev, name: event.target.value }))} value={carObj.name}/>
            <input placeholder='Price' onChange={event =>setCarObj (prev =>({...prev,price: event.target.value }))} value={carObj.price}/>
            <input placeholder='Image' onChange={event =>setCarObj(prev =>({...prev,img: event.target.value }))} value={carObj.img}/>

            <button className='btn' onClick={e=>createCar(e)}>Create</button>
        </form>
    );
};

export default CreateCarForm;