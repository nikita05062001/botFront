import React from 'react'
import './InfoMenu.scss';
import SvgExit from '../../svg/exit/SvgExit';

const InfoMenu = ({element, setState}) => {
    console.log(element["Наименование"])
    const array = Object.entries(element);
  return (
    <div className='infoMenu'>
        
         <div className='infoMenu-content'>
            <div className='infoMenu-content-window'>
            <div className='infoMenu-exit' onClick={() => {
            setState(null)
        }}><SvgExit fill={"aqua"} /></div>
                {/* {
                    array.map((obj) => (
                        <div className='infoMenu-content-window-item' key={obj[0]}>
                        <div className='infoMenu-content-window-item-title'>
                        <p>{obj[0]}</p>
                        </div>
                        <div className='infoMenu-content-window-item-value'>
                        <p>{obj[1]}</p>   
                        </div>
                    </div>
                    ))
                } */}
                <div className='infoMenu-content-window-item'>
                    <div className='infoMenu-content-window-item-title'>
                    <p>{element["Наименование"]}</p>
                    </div>
                </div>
                <div className='infoMenu-content-window-item'>
                    <div className='infoMenu-content-window-item-img'>
                    <img src={element["Изображения"]} alt='????' />
                    </div>
                </div>
                <div className='infoMenu-content-window-item'>
                    <div className='infoMenu-content-window-item-title'>
                    <p>Модель: {element["Модель"]}</p>
                    </div>
                </div>
                <div className='infoMenu-content-window-item'>
                    <div className='infoMenu-content-window-item-title'>
                    <p>Производитель: {element["Производитель"]}</p>
                    </div>
                </div>
                <div className='infoMenu-content-window-item'>
                    <div className='infoMenu-content-window-item-title'>
                    <p>Оценочная стоимость: {element["Оценочная стоимость"]}$</p>
                    </div>
                </div>
                <div className='infoMenu-content-window-item'>
                    <div className='infoMenu-content-window-item-title'>
                    <p>Стоимость: {element["Стоимость"]}$</p>
                    </div>
                </div>
                <div className='infoMenu-content-window-item'>
                    <div className='infoMenu-content-window-item-change'>
                    <p className='infoMenu-content-window-item-change-minus'>-</p>
                    <p className='infoMenu-content-window-item-change-value'>0</p>
                    <p className='infoMenu-content-window-item-change-minus'>+</p>
                    </div>
                </div>
            </div>
         </div>
    </div>
  )
}

export default InfoMenu