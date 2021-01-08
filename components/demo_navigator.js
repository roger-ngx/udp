import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from '@material-ui/core';

const DemoNavigator = () => {

    return(
        <AppBar style={{backgroundColor: '#1976d2'}}>
            <Toolbar>
                <Link href='/'>
                    <img src='/logo.png' style={{width: 50, height: 50}}/>
                </Link>
                <Link style={{marginLeft: 'auto', color: 'white'}} href='/products/machine_comprehension'>
                    <Typography style={{marginLeft: 'auto'}}>
                        Machine Comprehension
                    </Typography>
                </Link>
                <Link style={{marginLeft: 48, color: 'white'}} href='/products/content_classification'>
                    <Typography style={{marginLeft: 'auto'}}>
                        Content Classification
                    </Typography>
                </Link>
                <Link style={{marginLeft: 48, color: 'white'}} href='/products/information_extraction'>
                    <Typography style={{marginLeft: 'auto'}}>
                        Information Extraction
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default DemoNavigator;