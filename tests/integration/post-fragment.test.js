const request = require('supertest');
const app = require('../../src/app'); // Your Express app
//const base64 = require('base-64');

//const user = 'user1@email.com';
//const password = '$2a$05$zBK8Dqb3Y14ofo2XmQv00O.DYK3mV/3olFH.SyFES8i0IwytmIzR.';


describe('POST /v1/fragments', () => {
  test('unauthenticated users are denied', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .send('Hello, world!')
      .set('Content-Type', 'text/plain');

    expect(res.statusCode).toBe(401);
  });

 // test('authenticated users can create text/plain fragment', async () => {
  //  const res = await request(app)
   //   .post('/v1/fragments')
   //   .set('Authorization', authHeader)
   //   .set('Content-Type', 'text/plain')
   //   .send('Hello, fragments!');

   // expect(res.statusCode).toBe(201);
   // expect(res.headers.location).toMatch(/\/v1\/fragments\/.+/);
   // expect(res.body).toHaveProperty('id');
   // expect(res.body).toHaveProperty('type', 'text/plain');
   // expect(res.body).toHaveProperty('ownerId');
   // expect(res.body.size).toBe(17);
  //});

  //test('unsupported content type returns 415', async () => {
   // const res = await request(app)
     // .post('/v1/fragments')
    //  .set('Authorization', authHeader)
    //  .set('Content-Type', 'application/json')
    //  .send(JSON.stringify({ hello: 'world' }));

    //expect(res.statusCode).toBe(415);
   // expect(res.body).toHaveProperty('error');
  //});
});
