import React from 'react'
import './InfoMenu.scss';
import SvgExit from '../../svg/exit/SvgExit';

const InfoMenu = ({element, setState}) => {
    const array = Object.entries(element);
  return (
    <div className='infoMenu'>
        <div className='infoMenu-exit' onClick={() => {
            setState(null)
        }}><SvgExit fill={"red"} /></div>
         <div className='infoMenu-content'>
            <div className='infoMenu-content-window'>
                {
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
                }
                {/* <div className='infoMenu-content-window-item'>
                    <div className='infoMenu-content-window-item-title'>
                    <p>Название</p>
                    </div>
                    <div className='infoMenu-content-window-item-value'>
                    <p>Усилёк</p>   
                    </div>
                </div> */}
            </div>
         </div>
    </div>
  )
}

export default InfoMenu