import React from 'react';

const Solution = ({img, title, content, style}) => {

    return(
        <div style={{...style, flex: 1, display: 'flex', flexDirection: 'row', marginTop: 48}}>
            <img style={{width: 90, height: 90, marginRight: 24}} src={img} />
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left'}}>
                <h3 style={{marginTop: 0, marginBottom: 8, color: '#333'}}>{title}</h3>
                <p style={{marginTop: 0}}>{content}</p>
            </div>
        </div>
    )
}

const Solutions = () => {
    return(
        <>
            <div className='grid' style={{paddingBottom: 0}}>
                <Solution
                    style={{marginRight: 24}}
                    img='/img/services/AutoAnnotation_icon.png'
                    title='Automatic Annotation'
                    content='Automatically annotate text data based on predefined categories and entities. '
                />
                <Solution
                    img='/img/services/classification_icon.png'
                    title='Content Classification'
                    content='Classify free-text documents by predefined categories to help organize content.'
                />
            </div>
            <div className='grid' style={{paddingBottom: 0}}>
                <Solution
                    style={{marginRight: 24}}
                    img='/img/services/InformationExtraction.jpg'
                    title='Entity Extraction'
                    content='Recognize and extract meaningful entities, such as a person, an organization, or location from any text descriptions.'
                />
                <Solution
                    img='/img/services/MachineTranslation.jpg'
                    title='Machine Translation'
                    content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.'
                />
            </div>
            <div className='grid' style={{paddingTop: 0}}>
                <Solution
                    style={{marginRight: 24}}
                    img='/img/services/Paperless.jpg'
                    title='Paperless'
                    content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.'
                />
                <Solution
                    img='/img/services/QuestionAnswering.jpg'
                    title='Question & Answering'
                    content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.'
                />
            </div>
        </>     
    )
}

export default Solutions;