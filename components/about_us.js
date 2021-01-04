import React from 'react';
import styles from './about_us.module.css';
import SectionHeader from './section_header';

const AboutUs = () => {

    return (
        <div className='grid' id='about'>
            <div style={{flex: 1}}>
                <img style={{width: '100%'}} src='/img/about.png' />
            </div>
            <div className='about_detail' style={{flex: 2, display: 'flex', flexDirection: 'column', fontSize: 15}}>
                <SectionHeader name='about us' align='left' />
                <p>Established in Seoul, S. Korea in 2020, UDP - User Data Processing - Solution is an entrepreneur gathering Data Scientists and Natural Language Processing Specialists. UDP Solution provides NLP-based AI solutions to benefit customer businesses. </p>
                <div className='ul'>
                    <ul>
                        <li>Insights from Customers</li>
                        <li>Enable Natural Conversations</li>
                        <li>Allocate Human Resources Effectively</li>
                        <li>Improve Customer Satisfaction</li>
                        <li>Reduce Costs and Inefficiencies</li>
                        <li>Benefit from Market Research and Analysis</li>
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