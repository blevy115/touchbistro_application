const request = require('supertest');
const app = require('../app');

describe('Succesful Data return', () => {
  it('Should return a number as a result if succesful', async () => {
    const res = await request(app)
      .get('/findMedianPrime?number=2200');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toBe(971);
  });
});

describe('Unsuccesful Data return', () => {
  it('Should return an error if less than 2', async () => {
    const res = await request(app)
      .get('/findMedianPrime?number=-30');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toBe('Please Enter a number greater than 2');
  });

  it('Should return an error if not an integer', async () => {
    const res = await request(app)
      .get('/findMedianPrime?number=24.76');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toBe('Please Enter an Integer');
  });

  it('Should return an error if no number', async () => {
    const res = await request(app)
      .get('/findMedianPrime');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toBe('Please Enter a Number');
  });
});

describe('Unseccesful pathway', () => {
  it('Should return 404 if not correct path', async () => {
    const res = await request(app)
      .get('/find?number=30');
      expect(res.statusCode).toEqual(404);
  });
});
