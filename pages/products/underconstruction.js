import Head from 'next/head';
import {useRouter} from 'next/router';

import IconButton from '@material-ui/core/IconButton';
import Home from '@material-ui/icons/Home';

export default function UnderConstruction() {
  const router = useRouter();

  return (
    <div style={{width: '100%', height: 'calc(100vh - 15px)'}}>
      <Head>
        <title>UDP Sol</title>
        <link rel="icon" href="/logo.png" />
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
        <IconButton
          onClick={() => router.push('/')}
          style={{color: 'white', position: 'absolute', top: 10, left: 10}}
        >
          <Home />
        </IconButton>
        <img src='/img/services/Under-Construction-Sign.png' style={{width: '50%'}} />
      </div>
    </div>
  )
}
