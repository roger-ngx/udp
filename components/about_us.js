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
                <p>Established in Seoul, S. Korea in 2020, UDP Sol (User Data Processing Solution) is an entrepreneur gathering Data Scientists and Natural Language Processing Specialists. UDP Sol provides insightful benefits for customer businesses from their data by the following NLP-based AI engines. </p>
                <div className='ul'>
                    <ul>
                        <li>Automatic annotate text data </li>
                        <li>Categorize text data</li>
                        <li>Analyze consumer's reviews and sentiments</li>
                        <li>Recommend the most suitable products for each individual consumer</li>
                        <li>Automatic answer consumer's concerns (comprehensive Chatbot)</li>
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