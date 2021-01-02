import React from 'react';

const Solution = ({img, title, content, style}) => {

    return(
        <div style={{...style, flex: 1, display: 'flex', flexDirection: 'column', marginTop: 48}}>
            <img style={{width: '20%', margin: 'auto auto'}} src={img} />
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    )
}

const Solutions = () => {
    return(
        <>
            <div className='grid' style={{paddingBottom: 0}}>
                <Solution
                    img='/img/services/AutoAnnotation_icon.png'
                    title='Automatic Annotation API'
                    content='Automatically annotate text data based on predefined categories and entities. '
                />
                <Solution
                    style={{padding: '0 40px'}}
                    img='/img/services/classification_icon.png'
                    title='Content Classification'
                    content='Classify free-text documents by predefined categories to help organize content.'
                />
                <Solution
                    img='/img/services/InformationExtraction.jpg'
                    title='Information Extraction'
                    content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.'
                />
            </div>
            <div className='grid' style={{paddingTop: 0}}>
                <Solution
                    img='/img/services/MachineTranslation.jpg'
                    title='Machine Translation'
                    content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.'
                />
                <Solution
                    style={{padding: '0 40px'}}
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