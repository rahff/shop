
class HttpClientService {
  
    constructor(){}

    async get(url: string): Promise<Response> {
        return await fetch(url);
    }
}

export const httpClientService = new HttpClientService();