import React, { useState, useEffect } from 'react'


export const NameChange = (props) => {

    const [inputName, setInputName] = useState("");

    useEffect(() => {
        setInputName(props.Name);
        return
    }, [props.Name])


    const handleChangeName = () => {
        const nameToSave = inputName.length === 0 ? "匿名" : inputName;
    localStorage.setItem("userName", nameToSave);
    props.onCloseNC();
    }

    const TextInput = (e) => {
        setInputName(e.target.value);
        return
    }

    return (
        <>
            <div className="nc_modal">
                <div className="nc_modal-content">
                    <span className="close" onClick={props.onCloseNC}>&times;</span>
                    <p className="nc_text">
                        新しい名前を入力してね
                    </p>
                    <p className="nc_caution">
                        ※常識の範囲内のお名前にしてください。
                    </p>
                    <input type="text" name="newName" id="newName" className='nc_input' onChange={TextInput} maxLength={15} value={inputName} autoComplete='off' />
                    <button type="button" className='nc_complete' onClick={handleChangeName}>完了する</button>
                </div>
            </div>

        </>
    )
}
