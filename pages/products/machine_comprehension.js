import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Buffer } from 'buffer';
import { useState, useRef, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { throttle } from 'lodash';

import DemoPage from '../../components/common/DemoPage';

let lastScrollTop = 0;
let savedTranslate = 0;

export default function MachineComprehension({models}) {

  const [ translateY, setTranslateY ] = useState(0);

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

  return (
    <div className="container">
      <DemoPage active='machine'>
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
              height: 500,
              transform: `translateY(${translateY}px)`
            }}
          >
            <div className='grid'>
                <div style={{flex: 1, marginRight: 20}}>
                    <h1>UDP Comprehensive Chatbot</h1>
                    <p>A messenger marketing solution</p>
                </div>
                <div style={{flex: 1}}>
                  <img src='/img/annotation/NER.gif' style={{width: '100%'}}/>
                </div>
            </div>
          </div>

          <div id='content' style={{marginTop: 440, backgroundColor: 'white', padding: '55px 0'}}>
          <div style={{padding: '0 20%', marginTop: 55}}>
                <h1>How it works</h1>
                <p>UDP Chatbot aims to serve various domains separately. This means that UDP Chatbot can comprehend a domain knowledge through input text regarding the domain. If you need to deploy UDP Chatbot for your particular business, we just input its information regarding your products, services, or any content that Chatbot is desired to comprehend and answer your customers.</p>
                <p>To demonstrate the ability to comprehend an input knowledge, we built a Machine Reading Comprehension system as web application where we can input knowledge (so-called context) in the form of sentences in text format. And we can also input questions related to the input context. The system will answer our question based on the input context.</p>
          </div>

             <div style={{padding: '0 20%', marginTop: 55}}>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                <h2 style={{margin: 0}}>Input text</h2>
                <FormControl variant='outlined' style={{width: 200, marginLeft: 24}}>
                  {/* <InputLabel id="demo-simple-select-label">English</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value='en'
                    style={{height: 40}}
                  >
                    <MenuItem value='en'>English</MenuItem>
                    <MenuItem value='ko'>한국어</MenuItem>
                    <MenuItem value='vi'>Tiếng Việt</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <TextField
                placeholder='Select example to start'
                variant='outlined'
                style={{width: '100%'}}
                multiline={true}
                rows={5}
              />

              <TextField
                placeholder='Type a question'
                variant='outlined'
                style={{width: '100%', marginTop: 12}}
              />

              <div style={{textAlign: 'right', marginBottom: 30}}>
                <Button
                  variant='contained'
                  color='secondary'
                  style={{margin: '10px 0'}}
                >
                  submit
                </Button>
              </div>
              
              <h2 style={{margin: '0 0 16px 0'}}>Result</h2>
              <TextField
                placeholder='Input text above or try analyzer with our example'
                variant='outlined'
                style={{width: '100%'}}
                multiline={true}
                rows={5}
                disabled
              />
            </div>  

            <div className='grid-column'>
              <div style={{flex: 1, marginRight: 20}}>
                  <h1>Features</h1>
                  <p></p>
              </div>
              <div style={{flex: 1}}>
                <img src='/img/annotation/Chatbot_features.PNG' style={{width: '100%'}}/>
              </div>
            </div>

            <div className='grid-column'>
              <div style={{flex: 1, marginRight: 20}}>
                  <h1>Architecture</h1>
                  <p></p>
              </div>
              <div style={{flex: 1}}>
                <img src='/img/annotation/Chatbot_Architecture.PNG' style={{width: '100%'}}/>
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
            line-height: 2.0
        }

        h1 {
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

        .grid-column {
          display: flex;
          flex-direction: column;
          padding: 0 20%;
          margin-top: 55px
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

// export async function getStaticProps() {
//   const res = await fetch('', {
//     headers: {
//       'Authorization' : `Basic ${Buffer.from('twin:twin', 'utf-8').toString()}`
//     }
//   });
//   const data = await res.json();

//   return {
//     props: {
//       models: data
//     }
//   }
// }
