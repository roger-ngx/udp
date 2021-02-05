import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useState, useRef, useEffect } from 'react';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { map, throttle, find, uniq, get } from 'lodash';

import { NER } from '../../lib/utils';

import DemoPage from '../../components/common/DemoPage';

let lastScrollTop = 0;
let savedTranslate = 0;

const EXAMPLES = [
  '오에 겐자부로는 일본 현대문학의 초석을 놓은 것으로 평가받는 작가 나쓰메 소세키(1867~1916)의 대표작 ‘마음’에 담긴 군국주의적 요소, 야스쿠니 신사 참배 행위까지 소설의 삽화로 동원하며 일본 사회의 ‘비정상성’을 문제 삼는다.',
  '이어 하반기(7~12월)에 실시계획 승인을 거쳐 2017년부터 분양을 시작하고 2019년 말에 준공할 계획이다.',
  '이에 따라 MRO 사업 규모도 같은 기간 643억 달러에서 960억 달러까지 늘어나고 아시아·태평양 지역에서만도 2025년 336억 달러 규모의 시장이 형성될 것으로 예측되고 있다.'
];

export default function Classification() {

  const [ translateY, setTranslateY ] = useState(0);
  const [ inputText, setInputText ] = useState();
  const [ processing, setProcessing ] = useState(false);
  const [ result, setResult ] = useState();
  const [ example, setExample ] = useState(-1);

  useEffect(() => {
    const handler = throttle(handleScroll, 10, { trailing: false});

    window.addEventListener('scroll', handler);

    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleScroll = () => {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop){
      console.log('scroll up', st - lastScrollTop);
    } else {
      console.log('scroll down', lastScrollTop - st);
    }
    savedTranslate += (lastScrollTop - st)/2;
    setTranslateY(savedTranslate);

    lastScrollTop = st <= 0 ? 0 : st;
  };

  const requestForAnswer = async () => {
    setProcessing(true);
    setResult('');

    try{
      const res = await fetch(`/api/information_extraction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({text: inputText})
      });

      const resData = await res.json();

      setResult(resData);
    }catch(ex){
      console.log(ex);
    }

    setProcessing(false);
  };

  return (
    <div className="container">
      <DemoPage active='information'>
        <div style={{position: 'relative'}}>
          <div
            style={{
              backgroundColor: '#6f42c1',
              color: 'white',
              padding: '55px 0',
              width: '100%',
              position: 'fixed',
              top: 64, left: 0,
              zIndex: -1,
              height: 500
            }}
          >
            <div className='grid' style={{transform: `translateY(${translateY}px)`}}>
                <div style={{flex: 1, marginRight: 20}}>
                    <h1>Natural Language Understanding API - NER</h1>
                    <p>NER API extracts meaningful keywords for any text descriptions. It’s being used for automatic tagging of keywords and the better AD targeting.</p>
                </div>
                <div style={{flex: 1}}>
                  <img src='/img/annotation/NER.gif' style={{width: '100%'}}/>
                </div>
            </div>
          </div>

          <div id='content' style={{marginTop: 440, backgroundColor: 'white', padding: '55px 0'}}>
            <div className='grid'>
              <div style={{flex: 1, marginRight: 20}}>
                  <h1>NER</h1>
                  <p>A travel company uses UDP's NER API to automatically identified named entities specific to their company’s needs and resulted in 70% increase in structured and consumable named entities.</p>
              </div>
              <div style={{flex: 1}}>
                <img src='/img/annotation/NER-CS.png' style={{width: '100%'}}/>
              </div>
            </div>

            <div style={{padding: '0 20%', marginTop: 55}}>
                <h1>How it works</h1>
                <p>NER Analyzer uses machine learning to reveal the structure and meaning of the text. You can extract information about people, places, and events, and better understand social media sentiment and customer conversations.</p>
            </div>

            <div style={{padding: '0 20%', marginTop: 55}}>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                <h2 style={{margin: 0}}>Input text</h2>
                <FormControl variant='outlined' style={{width: 200, marginLeft: 24}}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value='ko'
                    style={{height: 40}}
                  >
                    <MenuItem value='ko'>한국어</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant='outlined' style={{width: 200, marginLeft: 'auto'}}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    displayEmpty
                    value={example}
                    onChange={e => {
                      setExample(e.target.value);
                      setInputText(EXAMPLES[e.target.value]);
                    }}
                    style={{height: 40}}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={-1} disabled>
                      Select example
                    </MenuItem>
                    <MenuItem value={0}>Example 1</MenuItem>
                    <MenuItem value={1}>Example 2</MenuItem>
                    <MenuItem value={2}>Example 3</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <TextField
                placeholder='Input text to start'
                variant='outlined'
                style={{width: '100%'}}
                multiline={true}
                rows={5}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
              />
              <div style={{textAlign: 'right', marginBottom: 30}}>
                <Button
                  variant='contained'
                  color='secondary'
                  style={{margin: '10px 0'}}
                  onClick={requestForAnswer}
                  disabled={processing}
                >
                  {
                    processing ?
                    <CircularProgress size={16} />
                    :
                    'submit'
                  }
                </Button>
              </div>
              
              <h2 style={{margin: '0 0 16px 0'}}>Result</h2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  minHeight: 60,
                  border: 'solid 1px #999',
                  borderRadius: 2,
                  padding: 16,
                  backgroundColor: '#ccc'
                }}
              >
                {
                  result ?
                  map(result.text, (text, index) => {
                    const ner = result.ner[index];
                    const nerColor = get(find(NER, item => item.type === ner), 'color', 'red');

                    return <div style={{margin: 8, backgroundColor: nerColor, color: 'white', fontWeight: 'bold'}}>{text}</div>
                  })
                  :
                  <div>Input text and click a submit button</div>
                }
              </div>
              <div style={{marginTop: 16}}>
                {
                  result && map(uniq(result.ner), ner => {
                    const item = find(NER, n => n.type === ner);
                    return item && <div 
                      style={{
                        backgroundColor: item.color,
                        fontWeight: 'bold',
                        color: 'white',
                        display: 'inline-block',
                        marginRight: 32
                      }}
                    >
                      {item.type}
                    </div>
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </DemoPage>

      <style jsx>{`
        .container {
          min-width: 100vw;
          min-height: 100vh;
          padding: 0;
          display: flex;
          flex-direction: column;
        }

        #content p {
            line-height: 2.8
        }

        #content h1 {
          margin-top: 0
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Open Sans', sans-serif;
          text-rendering: optimizeLegibility !important;
          -webkit-font-smoothing: antialiased !important;
          color: #777;
          font-weight: 400;
        }

        .grid {
          display: flex;
          flex-direction: row;
          padding: 0 20%;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
