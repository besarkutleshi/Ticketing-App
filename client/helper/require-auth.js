import Router from 'next/router'
import buildClient from '../api/build-client'
import jwt from 'jsonwebtoken'
const requireAuth = (page, roles = []) => {
    // make sure this function is safe run several times
    if (page.__authIsRequired) {
        return
    }
    page.__authIsRequired = true

    const originalGetInitialProps = page.getInitialProps

    page.getInitialProps = async (ctx) => {
        const { res, req } = ctx
        const clinet = buildClient(ctx);
        // console.log(ctx.pathname);
        // console.log(window.location.pathname);
        // httpClient on server side needs to be smart enough to send cookies
        // const fetchWithCookies = makeHttpClient(ctx);
        // const user = await fetchWithCookies('/api/users/current')
        const user = await clinet.get('/api/users/currentuser');
        if (!user.data.currentUser) {
            if (res) {
                const loginUrl = `/auth/signin?redirectTo=${encodeURIComponent(req.url)}`
                res.writeHead(302, 'Not authenticated', { Location: loginUrl })
                res.end()
            } else {
                const loginUrl = `/auth/signin?redirectTo=${encodeURIComponent(ctx.pathname)}`;
                await Router.push(loginUrl)
            }
            return {}
        }
        else{
            console.log(req);
            // const token = req.cookies.session;
            // const jwtDecoded = jwt.decode(token.toString().trim(), { header: true});
            // console.log(jwtDecoded);
        }
        return originalGetInitialProps ? originalGetInitialProps(ctx) : {}
    }
}

export default requireAuth;