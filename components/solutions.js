import React from 'react';
import Link from 'next/link';

const Solution = ({img, title, content, link, style}) => {

    return(
        <div style={{...style, flex: 1, display: 'flex', flexDirection: 'row', marginTop: 48}}>
            { <img style={{width: 80, height: 80, marginRight: 24}} src={img} /> }
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left'}}>
                <h3 style={{marginTop: 0, marginBottom: 8, color: '#333'}}>{title}</h3>
                <p style={{marginTop: 0}}>{content}</p>
                <Link href={link}><a style={{textDecoration: 'none', color: '#007bff'}} target='blank'>View more</a></Link>
            </div>
        </div>
    )
}

const Solutions = () => {
    return(
        <>
            <div className='grid' style={{paddingTop: 0}}>
                <Solution
                    style={{marginRight: 24}}
                    img='/img/services/Chatbot_icon.png'
                    title='Comprehensive Chatbot'
                    content='Understand questioner natural language and answer based on learned domain knowledges.'
                    link='products/machine_comprehension'                
                />
                <Solution
                    img='/img/services/Recommended-icon.png'
                    title='Recommendation System'
                    content='Recommend the most suitable product/service for each individual customer.'
                    link='products/underconstruction'                
                />
            </div>

            <div className='grid' style={{paddingBottom: 0}}>
                <Solution
                    style={{marginRight: 24}}
                    img='/img/services/Sentiment_icon.png'
                    title='Sentiment Analysis'
                    content='Analyze customers sentiment on a product or service.'
                    link='products/underconstruction'
                />
                <Solution
                    img='/img/services/CustomerReview_icon.png'
                    title='Customer Review Analysis'
                    content='Analyze customers rating on all aspects of a product or service.'
                    link='products/underconstruction'                
                />
            </div>

            <div className='grid' style={{paddingTop: 0}}>
                <Solution
                    style={{marginRight: 24}}
                    img='/img/services/SemanticSearch_icon.png'
                    title='Semantic Search'
                    content='Understand and infer the meaning of words and documents to deliver precise answers.'
                    link='products/underconstruction'                
                />
                 <Solution
                    img='/img/services/classification_icon.png'
                    title='Content Classification'
                    content='Classify free-text documents by predefined categories to help organize content.'
                    link='products/content_classification'
                />
            </div>

            <div className='grid' style={{paddingBottom: 0}}>
                <Solution
                    style={{marginRight: 24}}
                    img='/img/services/InfoExtraction_icon.png'
                    title='Information Extraction'
                    content='Recognize and extract meaningful entities, such as a person, an organization, or location from any text descriptions.'
                    link='products/information_extraction'
                />
                <Solution
                    img='/img/services/AutoAnnotation_icon.png'
                    title='Automatic Annotation'
                    content='Automatically annotate text data with predefined tags to train AI models.'
                    link='products/underconstruction'
                />
            </div>

        </>     
    )
}

export default Solutions;