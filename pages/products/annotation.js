import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Paper, TextField } from '@material-ui/core';
import { split, map, trim, forEach, findIndex, findLastIndex, range, remove } from 'lodash';

const HeaderTag = ({name, index, backgroundColor, color}) => {

    return(<div
        style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor,

            borderWidth: 1,
            borderColor: 'red',
            borderRadius: 2,

            marginRight: 8,
            padding: 4,
            alignItems: 'flex-end',
        }}
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

    const text = trim('The bloc agreed to buy up to 400 million doses of the AstraZeneca vaccine last year, but last week, AstraZeneca said vaccine supplies would be reduced because of problems in one of its EU factories - leading to the EU announcing it would impose vaccine export controls.');
    const spaceIndices = [];

    const [ tags, setTags ] = useState([]);

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
        
        const startId = selection.anchorNode.parentNode.id;
        const endId = selection.extentNode.parentNode.id;
        console.log(startId, endId);

        const startIndex = findIndex(tags, tag => tag.id == startId);
        const endIndex = findIndex(tags, tag => tag.id == endId);

        console.log(startIndex, endIndex);


        const items = tags.splice(startIndex, endIndex-startIndex+1);

        const newItem ={
            component: <mark style={{backgroundColor: '#ffe184'}}>
            {
                map(items, item => item.component)
            }
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
                    backgroundColor='white'
                    color='#583fcf'
                />
                <HeaderTag
                    name='org'
                    index='2'
                    backgroundColor='#583fcf'
                    color='white'
                />
            </div>

            {/* <input value={text} onSelect={logSelection} multiple={true} rows={5}/> */}

            {/* https://stackoverflow.com/questions/10666032/why-does-span-break-outside-div-when-margin-and-padding-is-applied/10666138 */}
            <div style={{padding: 16}} onMouseUp={logSelection}>
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