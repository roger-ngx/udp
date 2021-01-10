import React from 'react';

const Person = ({img, name, role, detail}) => {

    return (
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '48px 0'}}>
            <div
                style={{
                    display: 'flex',
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
            <p style={{fontSize: 17, fontStyle: 'italic', color: '#333333', margin: '0 0 8px 0'}}>{role}</p>
            <p style={{fontSize: 15,  textAlign: 'left', color: '#5C5C5C', margin: '0 12px 8px 12px'}}>{detail}</p>
        </div>
    )
}

const Team = () => {

    return (
        <div style={{width: '100vw'}}>
            <div className='grid'>
                <Person
                    img='/img/team/phuoc.jpg'
                    name='Quang-Phuoc Nguyen'
                    role='CEO'
                    detail='Quang-Phuoc founded UDP Solution in 2019 and has served as Chief Executive Officer on the board of directors. He has more than 18 years of experience in Artificial Intelligence, especially Bioinformatics and Natural Language Processing. His successes included word-sense disambiguate Neural Machine Translation, Customer Review Analysis system for Online Shopping, Voice-of-Customer systems for Banks and Insurances, Recommendation module for E-learning system, and NLP for Digital Phenotyping systems. Quang-Phuoc holds a Ph.D. degree in computer science from the University of Ulsan, S. Korea.'
                />
                <Person
                    img='/img/team/tu.jpg'
                    name='Tony Quach'
                    role='COO'
                    detail='As Chief Operations Officer, Tony is responsible for all company administration and operations along with strategic efforts that support UDP Solution’s projects and goals. Prior to joining UDP Solution, Tony has been successful in his own business of AI and Blockchain system developments. He was also presentative of several Vietnamese outsourcing enterprises in S. Korea. He has more than 16 years of experience in Software Development, AI systems, and Blockchain. Tony holds a Master degree in Advanced Fusion Technology from Konkuk University, S. Korea.'
                />
                {/* <Person
                    img='/img/team/dung.jpg'
                    name='James Vo'
                    role='Manager'
                /> */}
                <Person
                    img='/img/team/thanh.jpg'
                    name='Roger Nguyen'
                    role='CTO'
                    detail='Quang-Phuoc founded UDP Solution in 2019 and has served as Chief Executive Officer on the board of directors. He has more than 18 years of experience in Artificial Intelligence, especially Bioinformatics and Natural Language Processing. His successes included word-sense disambiguate Neural Machine Translation, Customer Review Analysis system for Online Shopping, Voice-of-Customer systems for Banks and Insurances, Recommendation module for E-learning system, and NLP for Digital Phenotyping systems. Quang-Phuoc holds a Ph.D. degree in computer science from the University of Ulsan, S. Korea.'
                />
            </div>
        </div>
    )
}

export default Team;
