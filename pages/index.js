import Head from 'next/head';

import AppNavigator from '../components/navigator';
import Intro from '../components/intro';
import CoreTechnology from '../components/core_technology';
import AboutUs from '../components/about_us';
import Solutions from '../components/solutions';
import Team from '../components/team';
import SectionHeader from '../components/section_header';
import Footer from '../components/footer';
import { useState, useRef, useEffect } from 'react';

export default function Home() {

  const [visibleSection, setVisibleSection] = useState();

  const headerRef = useRef(null);
  const technologyRef = useRef(null);
  const aboutRef = useRef(null);
  const solutionRef = useRef(null);
  const teamRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = [
    {section: 'technology', ref: technologyRef},
    {section: 'about', ref: aboutRef},
    {section: 'solutions', ref: solutionRef},
    {section: 'team', ref: teamRef},
    {section: 'contact', ref: contactRef},
  ];

  useEffect(() => {
    const handleScroll = () => {
      // const { height: headerHeight } = getDimensions(headerRef.current);
      const scrollPosition = window.scrollY + 60;
      // console.log(scrollPosition);

      let selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          // console.log(section, offsetTop, offsetBottom);
          return scrollPosition > offsetTop && scrollPosition < offsetBottom;
        }
      });

      const windowHeight = Math.floor(window.pageYOffset + window.innerHeight);
      const {offsetBottom} = getDimensions(contactRef.current);

      if(windowHeight > Math.floor(offsetBottom) - 50){
        selected = sectionRefs[4];
      }

      if (selected) {
        setVisibleSection(selected.section);
      }else{
        setVisibleSection();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getDimensions = (ele) => {
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop;
    const offsetBottom = offsetTop + height;
  
    return {
      height,
      offsetTop,
      offsetBottom,
    };
  };

  const scrollTo = e => {
    console.log(e);

    e.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const scrollToSection = (section) => {

    switch(section){
      case 'technology':
        scrollTo(technologyRef.current);
        break;

      case 'about':
        scrollTo(aboutRef.current);
        break;

      case 'solutions':
        scrollTo(solutionRef.current);
        break;

      case 'team':
        scrollTo(teamRef.current);
        break;

      case 'contact':
        scrollTo(contactRef.current);
        break;
    }
  }

  return (
    <div className="container">
      <Head>
        <title>UDP Sol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppNavigator selected={visibleSection} onScrollTo={scrollToSection}/>

      <main>
        <Intro />

        <div ref={technologyRef} className='feature' style={{backgroundColor: '#f6f6f6', textAlign: 'center'}}>
          <SectionHeader name='Core Technology' />
          <CoreTechnology />
        </div>

        <div ref={aboutRef} className='feature'>
          <AboutUs />
        </div>

        <div ref={solutionRef} className='feature' style={{backgroundColor: '#f6f6f6', textAlign: 'center'}} >
          <SectionHeader name='solutions' />
          <Solutions />
        </div>

        <div ref={teamRef} className='feature' style={{textAlign: 'center'}}>
          <SectionHeader name='meat the team' /> 
          <Team />
        </div>
      </main>

      <footer ref={contactRef}>
        <Footer />  
      </footer>

      <style jsx>{`
        .container {
          min-width: 100vw;
          min-height: 100vh;
          padding: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .feature{
          padding: 100px 0;
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
          justify-content: center;
          padding: 0 10%;
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
