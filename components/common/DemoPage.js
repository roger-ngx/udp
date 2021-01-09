import React from 'react';
import Head from "next/head";
import DemoNavigator from "../demo_navigator";


const DemoPage = ({active, children}) => {
    return (<div>
        <Head>
            <title>UDP Sol</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <DemoNavigator active={active}/>
        <main>
            {children}
        </main>
    </div>)
}

export default DemoPage;