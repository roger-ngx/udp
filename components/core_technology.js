import React from 'react';
import TranslateIcon from '@material-ui/icons/Translate';

const Technology = ({icon, mainText, subText}) => {

    return (
        <div
            style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
        >
            <div
                style={{
                    width: '80px', height: '80px', borderRadius: '50px',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    background: 'linear-gradient(to right, #6372ff 0%, #5ca9fb 100%)'
                }}
            >
                {icon}
            </div>
            <p style={{fontSize: 20, color: '#333', fontWeight: 600}}>{mainText}</p>
            <p style={{textAlign: 'center', fontSize: '15px', color: '#777', fontWeight: 400}}>{subText}</p>
        </div>
    )
}

const CoreTechnology = () => {

    return (
        <div className='grid' style={{width: '100vw'}}>
            <Technology icon={<TranslateIcon />} mainText='Data Mining' subText='Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.'/>
            <Technology icon={<TranslateIcon />} mainText='Data Mining' subText='Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.'/>          
        </div>
    )
}

export default CoreTechnology;