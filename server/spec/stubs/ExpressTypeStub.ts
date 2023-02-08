export interface FakeRequest {
    query?: { [key: string]: undefined | string };
    headers?: {
        authorization: string
    },
    params?: { [key: string]: undefined | string };

}