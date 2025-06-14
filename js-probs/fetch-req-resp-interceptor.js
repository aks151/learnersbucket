const originalFetch = window.fetch

const interceptors = {
    request: null,
    response: null
}

const registerRequestInterceptor = (callback) => {
    interceptors.request = callback;

}

const registerResponseInterceptor = (callback) => {
    interceptors.response = callback;
}

window.fetch = async (...args) => {

    if(interceptors.request)
    {

        try{
            const modArgs = interceptors.request(args);

            args = modArgs | args;
        } catch(error) {
            return Promise.reject(error);
        }

        
    }

    try {
        const response = await originalFetch(...args)

        if(interceptors.response) {
            const modResponse = interceptors.response(response);

            response = modResponse | response;
        }
    } catch(error) {
        return Promise.error(error);
    }
}


registerRequestInterceptor()