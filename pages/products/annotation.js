import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Paper, TextField } from '@material-ui/core';
import { split, map, trim, forEach, findIndex, findLastIndex, range, remove, intersection, includes, join } from 'lodash';

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

    const text = trim('The bloc agreed to buy up to 400 million doses of the AstraZeneca vaccine last year , but last week , AstraZeneca said vaccine supplies would be reduced because of problems in one of its EU factories - leading to the EU announcing it would impose vaccine export controls .');
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
            component: <span key={index} style={{paddingRight: 4, display:'inline-block', lineHeight: 2}} id={index}>{txt}</span>
        })))
    }, [text]);


    function logSelection(event) {
        const selection = window.getSelection();
        
        const startId = +selection.anchorNode.parentNode.id;
        const endId = +selection.extentNode.parentNode.id;
        console.log(selection.anchorNode.parentNode.parentNode.id);

        console.log(startId, endId);

        if(startId === endId){
            if(includes(markedIndices, startId)){
                const itemIndex= findIndex(tags, tag => includes(tag.id, startId));
                
                if(itemIndex >= 0){
                    const item = tags[itemIndex];
                    const ids = item.id.split('-').map(id => +id);

                    remove(markedIndices, index => includes(ids, index));
                    console.log('markedIndices', markedIndices)
                    setMarkedIndicies([...markedIndices]);

                    tags.splice(itemIndex, 1);

                    forEach(item.items, (item, index) => {
                        tags.splice(itemIndex + index, 0, item);
                    })
                }
                return;
            }
        }

        const startIndex = findIndex(tags, tag => tag.id == startId);
        const endIndex = findIndex(tags, tag => tag.id == endId);
        console.log(range(startId, endId + 1), markedIndices);

        if(startIndex < 0 || endIndex < 0){
            return;
        }

        
        if(intersection(range(startId, endId + 1), markedIndices).length > 0){
            return;
        }
        
        setMarkedIndicies([...markedIndices, ...range(startId, endId + 1)]);
        // console.log(range(startIndex, endIndex + 1), markedIndices);

        const items = tags.splice(startIndex, endIndex-startIndex+1);

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
                    marginRight: 4,
                    flexWrap: 'wrap'
                }}
                id={join(range(startId, endId + 1), '-')}
            >
            {
                map(items, item => item.component)
            }
            <span
                style={{
                    color: '#583fcf',
                    fontSize: '0.675em',
                    fontWeight: 'bold',
                    fontFamily: `"Roboto Condensed", "Arial Narrow", sans-serif`,
                    marginLeft: 8,
                    textTransform: 'uppercase'
                }}
            >{annotation===0 ? 'person' : 'org'}</span>
            <span
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: -7, left: -7,
                    backgroundColor: '#444',
                    color: 'white',
                    fontSize: '0.9em',
                    fontWeight: 'normal',
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    margin: 'auto',
                    transition: 'opacity 0.1s ease',
                    userSelect: 'none',
                    lineHeight: 1.1,
                    fontFamily: 'sans-serif',
                    verticalAlign: 'center'
                }}
            >x</span>
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
                onMouseUp={logSelection}
            >
                {
                    map(tags, tag => tag.component)
                }
            </div>
        </Paper>
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