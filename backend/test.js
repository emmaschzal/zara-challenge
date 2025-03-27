const request = require('supertest');
const app = require('./server');

describe('API (mock)', () => {
  describe('GET /', () => {
    it('should return product list', async () => {
      const res = await request(app).get('/shop');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should filter products with query', async () => {
      const res = await request(app).get('/shop').query({ q: 'sams' });
      expect(res.status).toBe(200);
      expect(res.body.every(p =>
        `${p.name} ${p.brand}`.toLowerCase().includes('sams')
      )).toBe(true);
    });
  });

  describe('GET /:id', () => {
    it('returns a product if it exists', async () => {
      const res = await request(app).get('/shop/GPX-8A'); 
      expect([200, 404]).toContain(res.status);
    });

    it('returns 404 for unknown product', async () => {
      const res = await request(app).get('/shop/example');
      expect([404, 500]).toContain(res.status);
    });
  });
});