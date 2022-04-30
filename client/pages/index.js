import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
    return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>
}

LandingPage.getInitialProps = async (context) => {
    const clinet = buildClient(context);
    const { data } = await clinet.get('/api/users/currentuser');
    console.log(data);
    return data;
}

export default LandingPage;