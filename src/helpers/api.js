const api = {
    async getJSON(endpoint) {
        return (await fetch(endpoint)).json();
    },

    async sendJSON(endpoint, data, init={}) {
        init.method ??= "POST";
        init.body = JSON.stringify(data);
        init.headers ??= {};
        const contentTypeHeader = {
            "Content-Type": "application/json",
        };
        Object.assign(init.headers, contentTypeHeader);
        return await (await fetch(endpoint, init)).json();
    }
};


export default api;