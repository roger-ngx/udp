import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Paper, Button } from '@material-ui/core';
import { split, map, trim, forEach, findIndex, slice, range, remove, intersection, includes, join } from 'lodash';

const HeaderTag = ({name, index, backgroundColor, color, onClick}) => {

    return(<div
        style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor,

            border: `1px solid ${color}`,
            borderRadius: 2,

            marginRight: 8,
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

const Annotation = () => {

    const text = trim("From 53-3 overnight, England's only goal on the fourth day was to survive as long as possible on a pitch offering huge and unpredictable turn as well as occasional spitting bounce . Dan Lawrence tried to be proactive, running at Ashwin's first ball to be nutmegged, with Pant completing a spectacular diving stumping . In contrast, Ben Stokes was almost shot-less, tormented by Ashwin in making eight from 51 balls before he offered a bat-pad catch.");
    const words = split(text, ' ');
    const spaceIndices = [];

    const [ tags, setTags ] = useState([]);

    const [ markedIndices, setMarkedIndicies ] = useState([]);

    const [ annotation, setAnnotation ] = useState(0);

    useEffect(() => {
        forEach(text, (c, index) => {
            c === ' ' && spaceIndices.push(index);
        });
    }, []);

    useEffect(() => {
        setTags(map(split(text, ' '), (txt, index) => ({
            id: index,
            content: txt,
            annotation: 'O',
            component: <span key={index} style={{display:'inline-block', lineHeight: 2}} id={index}>{txt}&nbsp;</span>
        })))
    }, [text]);

    const doubleClickEventHandler = (e) => {
        console.log('db click got fired');
        logSelection(true);
    }

    const printAnnotation = () => {
        forEach(tags, tag => {
            if(tag.items){
                forEach(tag.items, item => console.log(item.annotation + ' '));
            }else{
                console.log(tag.annotation + ' ')
            }
        })
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
                    
                    if(itemIndex >= 0){
                        const item = tags[itemIndex];
                        item.annotation = annotation===0 ? 'PER-B' : 'ORG-B';

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

    const processSelection = (startId, endId, isDbClick) => {

        if(intersection(range(startId, endId + 1), markedIndices).length > 0){
            return;
        }

        const startIndex = findIndex(tags, tag => tag.id == startId);
        const endIndex = findIndex(tags, tag => tag.id == endId);
        console.log(range(startId, endId + 1), markedIndices);

        if(startIndex < 0 || endIndex < 0){
            return;
        }
        
        //problem when selecting with a dot
        setMarkedIndicies(markedIndices => [...markedIndices, ...range(startId, endId + 1)]);
        // console.log(range(startIndex, endIndex + 1), markedIndices);

        const items = map(tags.splice(startIndex, endIndex-startIndex+1), (item, index) => {
            const ann =  annotation===0 ? 'PER' : 'ORG';
            const postfix = index === 0 ? '-B' : '-I';

            item.annotation = ann + postfix;
            return item;
        });

        const newItem ={
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
                    flexWrap: 'wrap'
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
                >{annotation===0 ? 'person' : 'org'}</span>
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
            &nbsp;
            </mark>
        }

        tags.splice(startIndex, 0, newItem)

        setTags([...tags]);
    }

    return (<div style={{}}>
        <Paper style={{width: 500, marginRight: 'auto', marginLeft: 'auto', marginTop: '20%'}}>
            <div
                style={{backgroundColor: '#583fcf', display: 'flex', flexDirection: 'row', padding: 16}}
            >
                <HeaderTag
                    name='person'
                    index='1'
                    backgroundColor={annotation === 0 ? 'white' : '#583fcf'}
                    color={annotation === 0 ? '#583fcf' : 'white'}
                    onClick={() => setAnnotation(0)}
                />
                <HeaderTag
                    name='org'
                    index='2'
                    backgroundColor={annotation === 1 ? 'white' : '#583fcf'}
                    color={annotation === 1 ? '#583fcf' : 'white'}
                    onClick={() => setAnnotation(1)}
                />
            </div>

            {/* https://stackoverflow.com/questions/10666032/why-does-span-break-outside-div-when-margin-and-padding-is-applied/10666138 */}
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
        </Paper>
        <Button
            color='primary'
            variant='outlined'
            onClick={printAnnotation}
        >
            Print
        </Button>
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