import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Paper, Button, IconButton } from '@material-ui/core';
import { split, map, trim, forEach, findIndex, slice, range, remove, intersection, includes, join, size, get } from 'lodash';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const HeaderTag = ({name, index, backgroundColor, color, onClick}) => {

    return(<div
        style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor,

            border: `1px solid ${color}`,
            borderRadius: 2,

            margin: 8,
            padding: 4,
            alignItems: 'flex-end',
            cursor: 'pointer'
        }}
        onClick={onClick}
    >
        <div
            style={{
                color,
                fontSize: 20,
                fontWeight: 'bold',
                marginRight: 4,
                textTransform: 'uppercase'
            }}
        >
            {name}
        </div>
        <div style={{color, fontSize: 12.5, fontWeight: 'bold'}}>{index}</div>
    </div>)
}

let init = true;

const ANNOTATION_TYPES = [
    {code: 'PER', type: 'person'},
    {code: 'ORG', type: 'org'},
    {code: 'EVT', type: 'event'},
    {code: 'DAT', type: 'data'},
    {code:'LOC', type: 'location'},
    {code:'CVL', type: 'civilization'},
    {code:'TRM', type:'term'},
    {code:'ANM', type: 'animal'},
    {code:'NUM', type: 'number'}
];

const Annotation = () => {

    const [texts, setTexts] = useState([]);
    const [annotations, setAnnotations] = useState([]); 
    const [currentIndex, setCurrentIndex] = useState(0);

    const [currentText, setCurrentText] = useState(null);
    const [currentAnnotation, setCurrentAnnotation] = useState(null);
    
    const [words, setWords] = useState([]);
    // const spaceIndices = [];
    const [ tags, setTags ] = useState([]);

    const [ markedIndices, setMarkedIndicies ] = useState([]);

    const [ annotationType, setAnnotationType ] = useState('PER');

    useEffect(() => {
        initData();
    }, []);

    useEffect(() => {
        if(!currentText) return;

        console.log(currentText, currentAnnotation);

        setTags(map(split(currentText, ' '), (txt, index) => ({
            id: index,
            content: txt,
            annotation: get(split(currentAnnotation,' '), `${index}`, 'O'),
            component: <span key={index} style={{display:'inline-block', lineHeight: 2}} id={index}>{txt}&nbsp;</span>
        })));

        init = true;

        setWords(split(currentText, ' '));
    }, [currentText, currentAnnotation]);

    useEffect(() => {
        if(!init || !size(tags)) return;
        console.log(tags);

        let startIndex, endIndex;
        const tempTags = [];

        forEach(tags, (tag, index) => {
            if(!tag) return;

            console.log(tag.annotation);
            if(tag.annotation.includes('-B')){

                startIndex = index;
                const nextAnnotation = get(tags, `${index+1}.annotation`);
                if(!nextAnnotation || !nextAnnotation.includes('-I')){
                    endIndex = index;
                }
            }
            if(tag.annotation.includes('-I') && (index === size(tags) -1 || !includes(get(tags, `${index+1}.annotation`,'-I')))){
                endIndex = index;
            }

            if(startIndex>=0 && endIndex>=0){
                console.log(startIndex, endIndex);

                tempTags.push(generateSelectedAnnotation(startIndex, endIndex, tags[startIndex].id, tags[endIndex].id, tag.annotation.split('-')[0]));
                startIndex = -1;
                endIndex = -1;
            } else {
                tag.annotation === 'O' && tempTags.push(tag);
            }
        });
        init = false;

        console.log(tempTags)

        setTags(tempTags)
    }, [tags]);

    useEffect(() => {
        // console.log(currentIndex);
        // if(currentIndex > 0){
            setCurrentText(texts[currentIndex]);
            setCurrentAnnotation(annotations[currentIndex]);
        // }
    }, [currentIndex]);

    const doubleClickEventHandler = (e) => {
        console.log('db click got fired');
        logSelection(true);
    }

    function logSelection(isDbClick) {
        const selection = window.getSelection();
        
        const startId = +selection.anchorNode.parentNode.id;
        const endId = +selection.extentNode.parentNode.id;

        console.log(startId, endId, isDbClick);
        console.log('markedIndices', markedIndices);

        if(startId === endId){
            if(!isDbClick){
                if(includes(markedIndices, startId)){
                    const itemIndex= findIndex(tags, tag => includes(tag.id, startId));
                    
                    if(itemIndex >= 0) {
                        const item = tags[itemIndex];
                        item.annotation = annotationType + '-B';

                        const ids = item.id.split('-').map(id => +id);
    
                        remove(markedIndices, index => includes(ids, index));
                        console.log('markedIndices', markedIndices)
                        setMarkedIndicies([...markedIndices]);
    
                        tags.splice(itemIndex, 1);
    
                        forEach(item.items, (item, index) => {
                            tags.splice(itemIndex + index, 0, item);
                        })
                    }
                }
                return;
            }
        }

        const dots = findDotIndices(slice(words, startId, endId + 1), startId);
        dots.unshift(startId - 1);
        dots.push(endId + 1);

        console.log('dots', dots);

        for(let i = 0; i < dots.length-1; i++){
            processSelection(dots[i] + 1, dots[i+1] - 1, isDbClick);
        }
    }

    const findDotIndices = (words, startId) => {
        console.log(words);
        const dots = [];

        forEach(words, (word, index) => {
            if(word === '.'){
                dots.push(index + startId);
            }
        });

        return dots;
    }

    const processSelection = (startId, endId) => {

        if(intersection(range(startId, endId + 1), markedIndices).length > 0){
            return;
        }

        const startIndex = findIndex(tags, tag => tag.id == startId);
        const endIndex = findIndex(tags, tag => tag.id == endId);
        console.log(range(startId, endId + 1), markedIndices);

        const newItem = generateSelectedAnnotation(startIndex, endIndex, startId, endId, annotationType);

        tags.splice(startIndex, endIndex - startIndex + 1);

        tags.splice(startIndex, 0, newItem)

        setTags([...tags]);
    }

    const generateSelectedAnnotation = (startIndex, endIndex, startId, endId, annotation) => {
        if(startIndex < 0 || endIndex < 0){
            return;
        }
        
        //problem when selecting with a dot
        setMarkedIndicies(markedIndices => [...markedIndices, ...range(startId, endId + 1)]);
        // console.log(range(startIndex, endIndex + 1), markedIndices);

        const items = map(tags.slice(startIndex, endIndex+1), (item, index) => {
            const postfix = index === 0 ? '-B' : '-I';

            item.annotation = annotation + postfix;
            return item;
        });

        return {
            id: join(range(startId, endId + 1), '-'),
            items,
            component: <mark
                style={{
                    backgroundColor: '#ffe184',
                    position: 'relative',
                    cursor: 'pointer',
                    padding: '0.25em 0.4em',
                    fontWeight: 'bold',
                    color: '#444',
                    flexWrap: 'wrap',
                    marginRight: 4
                }}
                id={join(range(startId, endId + 1), '-')}
            >
                {
                    map(items, item => item.component)
                }
                <span
                    id={startId} //for click to remove
                    style={{
                        color: '#583fcf',
                        fontSize: '0.675em',
                        fontWeight: 'bold',
                        fontFamily: `"Roboto Condensed", "Arial Narrow", sans-serif`,
                        marginLeft: 8,
                        textTransform: 'uppercase'
                    }}
                >{annotation}</span>
                <span className='close_mark'>x</span>

                <style jsx>
                {
                    `
                    .close_mark{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: absolute;
                        top: -7px; left: -7px;
                        background-color: #444;
                        color: white;
                        font-size: 0.9em;
                        font-weight: normal;
                        width: 14px;
                        height: 14px;
                        border-radius: 50%;
                        margin: auto;
                        transition: opacity 0.1s ease;
                        user-select: none;
                        line-height: 1.1;
                        font-family: sans-serif;
                        vertical-align: center;
                    }
                    .close_mark:hover {
                        display: flex;
                    }
                    `
                }
                </style>
            </mark>
        }
    }

    const initData = () => {
        fetch('/testset.tsv').then(res => res.text()).then(processFileData)
    }

    const processFileData = data => {
        const rows = data.split('\n');

        for(let i = 1; i < rows.length; i++){
            const row = rows[i];
            const [text, annotation] = row.split('\t');
            texts.push(text);
            annotations.push(annotation);
        }
        console.log(texts);

        setTexts(texts);
        setAnnotations(annotations);

        if(rows.length > 1){
            //update states on sequence
            setCurrentAnnotation(currentAnnotation => annotations[currentIndex]);
            setCurrentText(currentText => texts[currentIndex]);
        }
    }

    const fileUploadedHandle = e => {
        console.log(e.target.files);

        const fileReader = new FileReader();

        fileReader.onload = () => {
            processFileData(fileReader.result);
        }
        fileReader.readAsText(e.target.files[0]);

    }

    const saveCurrentText = () => {
        let text = '';
        let annotation ='';

        forEach(tags, tag => {
            if(tag.items){
                forEach(tag.items, item => {
                    annotation += item.annotation + ' ';
                    text += item.content + ' ';
                });
            }else{
                text += tag.content + ' ';
                annotation += tag.annotation + ' ';
            }
        })

        texts[currentIndex] = text;
        annotations[currentIndex] = annotation;

        console.log(text, annotation)
        alert('saved');
    }

    const resetCurrentText = () => {
        setTags(map(split(currentText, ' '), (txt, index) => ({
            id: index,
            content: txt,
            annotation: get(split(currentAnnotation,' '), `${index}`, 'O'),
            component: <span key={index} style={{display:'inline-block', lineHeight: 2}} id={index}>{txt}&nbsp;</span>
        })));

        setMarkedIndicies([]);

        init = true;

        setWords(split(currentText, ' '));
    }

    const generateTSVFile = () => {
        var tsv = `text\tannotation`;

        forEach(texts, (text, index) => {
            tsv += `\n${text}\t${annotations[index]}`;
        })
        window.location.href = "data:text/tab-separated-values," + encodeURIComponent(tsv);
    }

    return (<div style={{}}>
        <Paper style={{width: 500, margin: 'auto'}}>
            <div
                style={{backgroundColor: '#583fcf', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: 16}}
            >
                {
                    map(ANNOTATION_TYPES, (annotation, index) => (
                        <HeaderTag
                            name={annotation.code}
                            index={index}
                            backgroundColor={annotationType === annotation.code ? 'white' : '#583fcf'}
                            color={annotationType === annotation.code ? '#583fcf' : 'white'}
                            onClick={() => setAnnotationType(annotation.code)}
                        />
                    ))
                }
            </div>

            {/* https://stackoverflow.com/questions/10666032/why-does-span-break-outside-div-when-margin-and-padding-is-applied/10666138 */}
            
            {
                size(tags) > 0 ?
                <div
                    style={{
                        padding: 16,
                        fontFamily: `"Lato", "Trebuchet MS", Roboto, Helvetica, Arial, sans-serif`,
                        wordWrap: 'break-word',
                        // whiteSpace: 'pre-wrap'
                    }}
                    onMouseUp={() => logSelection(false)}
                    onDoubleClick={() => logSelection(true)}
                >
                    {
                        map(tags, tag => tag.component)
                    }
                </div>
                :
                <div style={{padding: 24, display: 'flex', justifyContent: 'center'}}>
                    <input
                        style={{display: 'none'}}
                        id='tsv_file_upload'
                        multiple
                        type='file'
                        accept='.tsv'
                        onChange={fileUploadedHandle}
                    />
                    <label htmlFor='tsv_file_upload'>
                        <Button color='primary' variant='outlined' component='span'>
                            Upload file
                        </Button>
                    </label>
                </div>
            }
        </Paper>

        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 0, width: '100%'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <input
                    style={{display: 'none'}}
                    id='tsv_file_upload'
                    multiple
                    type='file'
                    accept='.tsv'
                    onChange={fileUploadedHandle}
                />
                <label htmlFor='tsv_file_upload'>
                    <IconButton component='span'>
                        <InsertDriveFileIcon />
                    </IconButton>
                </label>
            </div>
            <IconButton onClick={saveCurrentText}>
                <CheckIcon style={{color:'green'}}/>
            </IconButton>
            <IconButton onClick={resetCurrentText}>
                <CloseIcon style={{color:'red'}}/>
            </IconButton>
            <IconButton
                disabled={currentIndex == 0}
                onClick={() => (currentIndex > 0) && setCurrentIndex(currentIndex - 1)}
            >
                <SkipPreviousIcon style={{color:'blue'}}/>
            </IconButton>
            <IconButton
                disabled={currentIndex >= size(texts)}
                onClick={() => (currentIndex < size(texts) - 1) && setCurrentIndex(currentIndex + 1)}
            >
                <SkipNextIcon style={{color:'blue'}}/>
            </IconButton>
        </div>
        <style jsx>
        {
            `
            ::-moz-selection { /* Code for Firefox */
                background: #ffe184;
            }
            
            ::selection {
                background: #ffe184;
            }              
            `
        }
        </style>
    </div>)
}

export default Annotation;