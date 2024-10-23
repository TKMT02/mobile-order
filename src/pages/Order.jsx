import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { Header } from '../component/Header';
import { Footer } from '../component/Footer';
import { Catalog_card } from '../component/Catalog_card';

export const Order = () => {

    const [juiceData, setJuiceData] = useState([]);
    const [toppingData, setToppingData] = useState([]);
    const [nowStatus, setNowStatus] = useState('juice');
;

    //  選択juice
    const [selectJuiceImage, setSelectJuiceImage] = useState("https://placehold.jp/350x450.png?text=aaa");
    const [selectJuiceName, setSelectJuiceName] = useState("コーヒークラッシュ");

    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('JSON/MenuData.json', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error("ネットワークの応答エラーです。")
                }

                const data = await res.json();
                setJuiceData(data.juice);
                setToppingData(data.topping);
                //  idを取得
            } catch (error) {
                
            } finally {
                
            }
        }

        fetchData();

        // setCartCount(JSON.parse(localStorage.getItem("cart")).length);
    }, [])

    const handleSelectJuice = () => {
        setNowStatus("topping");
    }

    const handleCloseTopping = () => {
        setNowStatus("juice");
    }


    return (
        <>
            <div className="container">
                <div className="fixed_content">
                    <Header />
                    <div className="sub-header">
                        <p className='product_list-text'>商品一覧</p>
                        <p>全品一律150円</p>
                    </div>
                </div>
                <div className="catalog_content">
                    <ul className="catalog_list">
                        {juiceData.map((item, index) => {
                            return (
                                <Catalog_card
                                    key={index}
                                    id={item.id}
                                    imageURL={item.imageURL}
                                    title={item.title}
                                    explain={item.explain}
                                    onAdd={() => handleSelectJuice()}
                                />
                            );
                        })}
                    </ul>
                    <div className="topping_content">
                        <h3 className="topping_title">
                            トッピング一覧
                        </h3>
                        <ul className="topping_list">
                            <li className="topping_list-item">
                                <p>アイス</p>
                            </li>
                            <li className="topping_list-item">
                                <p>イチゴ</p>
                            </li>
                            <li className="topping_list-item">
                                <p>オレオ</p>
                            </li>
                            <li className="topping_list-item">
                                <p>マシュマロ</p>
                            </li>
                            <li className="topping_list-item">
                                <p>ホイップ</p>
                            </li>
                            <li className="topping_list-item">
                                <p>チョコスプレー</p>
                            </li>
                            <li className="topping_list-item">
                                <p>タピオカ</p>
                            </li>
                            <li className="topping_list-item">
                                <p>ナタデココ</p>
                            </li>
                            <li className="topping_list-item">
                                <p>チョコソース</p>
                            </li>
                            <li className="topping_list-item none">
                                
                            </li>
                        </ul>
                        <p className="caption">
                            ※ドリンク1品につき、トッピングは2つまで選択可能です。
                        </p>
                    </div>
                </div>
                <p className="note">
                    当サイトは東京電子専門学校2024年度学園祭ウェブメディア科
                    「推しドリンクカフェ」のモバイルオーダー専用サイトになりま
                    す。学園祭終了時点で当URLをご利用不可になります。
                    学園祭をお楽しみください!
                </p>
            </div>
            {/* トッピングモーダル */}

            {nowStatus === "topping" && (
                <div className='topping_content_modal'>
                    <div className="topping_content">
                        <div className="topping_content-head">
                            <p className="icon" onClick={handleCloseTopping}>
                                <FontAwesomeIcon
                                    icon={faCircleXmark} className='icon'
                                />
                            </p>
                            <p className="topping_content-title">
                                トッピング選択
                            </p>
                            <div className="topping_contents">
                                <img src={selectJuiceImage} alt="" className='selectJuiceImage' />

                                <p className="title">
                                    {selectJuiceName}
                                </p>

                            </div>
                        </div>
                        <div className="topping_content-body">
                            <div className="topping_content-body-head">
                                <p className='title'>トッピングを選択</p>
                                <p className="note">
                                    ※ドリンク1品につき、トッピングは2つまで選択可能です。
                                </p>
                            </div>
                            <ul className="topping_list">
                                <li className="topping_list-item">
                                    <p>チョコスプレー</p>
                                    <FontAwesomeIcon icon={faCircleCheck} className='check_icon' />
                                </li>
                                <li className="topping_list-item">
                                    <p>チョコスプレー</p>
                                    <FontAwesomeIcon icon={faCircleCheck} className='check_icon' />
                                </li>
                                <li className="topping_list-item">
                                    <p>チョコスプレー</p>
                                    <FontAwesomeIcon icon={faCircleCheck} className='check_icon' />
                                </li>
                                <li className="topping_list-item">
                                    <p>チョコスプレー</p>
                                    <FontAwesomeIcon icon={faCircleCheck} className='check_icon' />
                                </li>
                                <li className="topping_list-item">
                                    <p>チョコスプレー</p>
                                    <FontAwesomeIcon icon={faCircleCheck} className='check_icon' />
                                </li>
                                <li className="topping_list-item">
                                    <p>チョコスプレー</p>
                                    <FontAwesomeIcon icon={faCircleCheck} className='check_icon' />
                                </li>
                                <li className="topping_list-item">
                                    <p>チョコスプレー</p>
                                    <FontAwesomeIcon icon={faCircleCheck} className='check_icon' />
                                </li>
                                <li className="topping_list-item">
                                    <p>チョコスプレー</p>
                                    <FontAwesomeIcon icon={faCircleCheck} className='check_icon' />
                                </li>
                                <li className="topping_list-item">
                                    <p>チョコスプレー</p>
                                    <FontAwesomeIcon icon={faCircleCheck} className='check_icon' />
                                </li>
                            </ul>
                            <button
                                type="button"
                                className='addCart'
                            >
                                注文カゴに入れる
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    )
}
