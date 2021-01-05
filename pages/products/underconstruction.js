import Head from 'next/head';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import AppNavigator from '../../components/navigator';
import Intro from '../../components/intro';
import CoreTechnology from '../../components/core_technology';
import AboutUs from '../../components/about_us';
import Solutions from '../../components/solutions';
import Team from '../../components/team';
import SectionHeader from '../../components/section_header';
import Footer from '../../components/footer';
import { useState, useRef, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { throttle } from 'lodash';

let lastScrollTop = 0;
let savedTranslate = 0;

export default function Annotation() {

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
      <Head>
        <title>UDP Sol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{position: 'relative'}}>
        <div
          style={{
            backgroundColor: '#6f42c1',
            color: 'white',
            padding: '55px 0',
            width: '100%',
            position: 'fixed',
            top: 0, left: 0,
            zIndex: -1,
            height: 400
          }}
        >
          <div className='grid' style={{transform: `translateY(${translateY}px)`}}>
              <div style={{flex: 1, marginRight: 20}}>
                  <h1>This pages is</h1>
                  <p>under constructing.</p>
              </div>
          </div>
        </div>
		</div>
        </div>
  )
}
