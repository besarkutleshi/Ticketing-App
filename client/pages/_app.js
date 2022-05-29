import 'bootstrap/dist/css/bootstrap.css'
// import 'boxicons'
import buildClient from "../api/build-client";
import Header from '../components/header';

const App = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header currentUser={currentUser} />
            <Component { ...pageProps } />
        </div>
    )
}

App.getInitialProps = async (appContext) => {
    const clinet = buildClient(appContext.ctx);
    const { data } = await clinet.get('/api/users/currentuser');
    let pageProps = {};
    if(appContext.Component.getInitialProps){
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return {
        pageProps,
        ...data
    }
}

export default App;

