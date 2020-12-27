import React from 'react';
import styles from './about_us.module.css';
import SectionHeader from './section_header';

const AboutUs = () => {

    return (
        <div className='grid' id='about'>
            <div style={{flex: 1}}>
                <img style={{width: '100%'}} src='/img/about.jpg' />
            </div>
            <div style={{flex: 2, display: 'flex', flexDirection: 'column', marginLeft: 24}}>
                <SectionHeader name='about us' align='left' />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <h3>Why Choose Us?</h3>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <ul>
                        <li>Lorem ipsum dolor</li>
                        <li>Tempor incididunt</li>
                        <li>Lorem ipsum dolor</li>
                        <li>Incididunt ut labore</li>
                    </ul>
                    <ul>
                        <li>Aliquip ex ea commodo</li>
                        <li>Lorem ipsum dolor</li>
                        <li>Exercitation ullamco</li>
                        <li>Lorem ipsum dolor</li>
                    </ul>
                </div>
            </div>
            <style jsx>
            {
                `
                #about ul{
                    padding-inline-start: 0;
                    padding-inline-end: 24px
                }

                #about li {
                    list-style: none
                }

                #about li:before {
                    content: "✓";
                    color: '#5csf9b';
                    font-size: 11px;
                    padding-right: 8px;
                }
                `
            }
            </style>
        </div>
    )
}

export default AboutUs;