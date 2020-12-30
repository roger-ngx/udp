import React from 'react';

const Person = ({img, name, role}) => {

    return (
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 40}}>
            <img src={img} style={{display: 'block', width: '80%', maxWidth: 200 , marginBottom: 10, height: 'auto'}}/>
            <h4 style={{fontSize: 18, color: '#333', fontWeight: 600, margin: '0 0 4px 0'}}>{name}</h4>
            <p style={{fontSize: 15, color: '#888', margin: 0}}>{role}</p>
        </div>
    )
}

const Team = () => {

    return (
        <div style={{width: '100vw'}}>
            <p style={{margin: '0 0 48px 0'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed dapibus leonec.</p>
            <div className='grid'>
                <Person
                    img='/img/team/phuoc.jpg'
                    name='Phuoc'
                    role='Managergfhfgh testttt'
                />
                <Person
                    img='/img/team/tu.jpg'
                    name='Tu'
                    role='Manager'
                />
                <Person
                    img='/img/team/dung.jpg'
                    name='Dung'
                    role='Manager'
                />
                <Person
                    img='/img/team/thanh.jpg'
                    name='Thanh'
                    role='Loser'
                />
            </div>
        </div>
    )
}

export default Team;
