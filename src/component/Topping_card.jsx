import { React, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

export const Topping_card = (props) => {

    const [addItem, setAddItem] = useState(false);

    useEffect(() => {
        if (props.Add === true) {
            setAddItem(true);
        }
        else if (props.Add === false) {
            setAddItem(false);
        }
        return
    }, [props.Add])


    return (
        <>
            <li className={props.flag ? "topping_list-item checked" : "topping_list-item"} id={props.id} onClick={props.onAdd}>
                <p>{props.title}</p>
                <FontAwesomeIcon icon={faCircleCheck} className='check_icon' />
            </li >
        </>
    )
}