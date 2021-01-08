import Head from 'next/head';

export default function UnderConstruction() {

  return (
    <div style={{width: '100%', height: 'calc(100vh - 15px)'}}>
      <Head>
        <title>UDP Sol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          backgroundColor: '#6f42c1',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img src='/img/services/Under-Construction-Sign.png' style={{width: '50%'}} />
      </div>
    </div>
  )
}
