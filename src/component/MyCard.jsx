import React from 'react';
import '../css/card.css';

export const MyCard = (props) => {

    const handleComplete = () => {
        props.onCloseMyCard();
    }

    return (
        <>
            <div className="card_modal">
                <div className="card_modal-content">
                    <h3 className="card_title">
                        {props.Name}さん
                    </h3>
                    <p className="card_id">
                        引き換えID <span className="card_id">{props.ID}</span>
                    </p>
                    <p className="caution">
                        ※受け取り完了ボタンは店員が押します。
                    </p>
                    <button
                        type="button"
                        className='card_complete'
                        onTouchStart={props.eventTouchStart}
                        onTouchEnd={props.eventTouchEnd}
                    >受け取り完了</button>
                    <span className="close" onClick={props.onCloseMyCard}>&times;</span>
                </div>
            </div>

        </>
    )
}
