import { AUTH_SERVER } from '../player.config.js';
import fetcher from './fetcher.js';

// Authenticate anonymous user
// (via auth proxy server, which generates partner token and user token)
// and store user accessToken in localStorage
// See docs for Auth Proxy Server: https://github.com/epidemicsound/partner-content-api-auth-proxy-example

export const loginUser = async (userId) => {

    try {
        // Get user token from auth proxy server
        const r = await fetcher(
            `${AUTH_SERVER}/auth`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId
                }),
            },
            3
        );
        // Store user token in localStorage
        localStorage.setItem('userToken', r.accessToken);
        // Return user token
        return r.accessToken;
    } catch (error) {
        console.log('There was an error in loginUser', error);
        console.error(error);
        return error;
    }
};
