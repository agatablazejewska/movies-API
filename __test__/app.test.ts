import supertest from 'supertest';
import app from '../src/app';

const request = supertest(app);

describe(`Tests for the ALL '/' requests.`, () => {
    test(`Should send welcome message.`, async () => {
        const postRes = await request.post('/');
        const getRes = await request.get('/');
        const putRes = await request.put('/');
        const deleteRes = await request.delete('/');

        const all = [postRes, getRes, putRes, deleteRes];

        all.forEach(res => {
            expect(res.status).toBe(200);
            expect(res.body).toBe('Welcome to Movies API');
        })
    })
})

describe('Tests for the routes that does not exist as endpoint.', () => {
    test('GET/POST route that does not exist as endpoint. Should send 404 error json object.', async() => {
        const apiResTooMuchParamsGET = await request.get('/api/movie/doesnt/exist/kgjg/uhda');
        const apiResTooMuchParamsPOST = await request.get('/api/movie/doesnt/exist/kgjg/uhda');
        const resOneWrongParam = await request.get('/wrong');
        const resTwoWrongParams = await request.get('/wrong/param');

        expect(apiResTooMuchParamsGET.status).toBe(404);
        expect(apiResTooMuchParamsGET.body).toEqual({ error: '404 Page not found' });
        expect(apiResTooMuchParamsPOST.status).toBe(404);
        expect(apiResTooMuchParamsPOST.body).toEqual({ error: '404 Page not found' });
        expect(resOneWrongParam.status).toBe(404);
        expect(resOneWrongParam.body).toEqual({ error: '404 Page not found' });
        expect(resTwoWrongParams.status).toBe(404);
        expect(resTwoWrongParams.body).toEqual({ error: '404 Page not found' });
    })
})
