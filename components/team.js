import React from 'react';

const Person = ({img, name, role}) => {

    return (
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 40}}>
            <div
                style={{
                    display: 'block',
                    width: '80%',
                    maxWidth: 200,
                    marginBottom: 10,
                    height: 'auto',
                    borderRadius: '100%',
                    padding: 10,
                    border: '2px solid #007bff'
                }}
            >
                <img
                    src={img}
                    style={{
                        width: '100%',
                        height: '100%',
                        filter: 'grayscale(100%)',
                        borderRadius: '100%',
                    }}
                />
            </div>
            <p style={{fontSize: 18, color: '#333', fontWeight: 600, margin: '0 0 8px 0'}}>{name}</p>
            <p style={{fontSize: 15, color: '#007bff', margin: 0, textTransform: 'uppercase'}}>{role}</p>
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
                    name='Quang-Phuoc Nguyen'
                    role='Manager test'
                />
                <Person
                    img='/img/team/tu.jpg'
                    name='Tony Quach'
                    role='Manager'
                />
                <Person
                    img='/img/team/dung.jpg'
                    name='James Vo'
                    role='Manager'
                />
                <Person
                    img='/img/team/thanh.jpg'
                    name='Roger Nguyen'
                    role='software engineer'
                />
            </div>
        </div>
    )
}

export default Team;
