export default async function fetcherasync(url, options, retries) {

    return fetch(url, options)
        .then(async (res) => {
            if (res.ok) {
                return res.json()
            } else if (res.status === 401) {
                await loginUser();

                if (retries > 0) {
                    return fetcher(url, options, retries - 1);
                }

            }
            throw new Error('An error occurred while fetching the data.')
        })
        .catch(error => console.error(error.message))

};
