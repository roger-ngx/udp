import React from 'react';
import styles from './about_us.module.css';
import SectionHeader from './section_header';

const AboutUs = () => {

    return (
        <div className='grid' id='about'>
            <div style={{flex: 1}}>
                <img style={{width: '100%'}} src='/img/about.jpg' />
            </div>
            <div className='about_detail' style={{flex: 2, display: 'flex', flexDirection: 'column', fontSize: 15}}>
                <SectionHeader name='about us' align='left' />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <h3>Why Choose Us?</h3>
                <div className='ul'>
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
                #about {
                    line-height: 24px
                }

                #about ul{
                    margin: 0;
                    padding-inline-start: 0;
                    padding-inline-end: 24px
                }

                #about li {
                    list-style: none;
                }

                #about li:before {
                    content: "✓";
                    color: '#5csf9b';
                    font-size: 11px;
                    padding-right: 8px;
                }
                #about .ul {
                    display: flex;
                    flex-direction: row
                }

                .about_detail{
                    margin-left: 24px;
                }

                @media (max-width: 600px){
                    #about .ul {
                        display: flex;
                        flex-direction: column
                    }

                    .about_detail{
                        margin-left: 0px;
                        margin-top: 24px;
                    }
                }
                `
            }
            </style>
        </div>
    )
}

export default AboutUs;