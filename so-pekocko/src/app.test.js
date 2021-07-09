import request from 'supertest';
import app from './app';

describe('POST /api/auth/signup', () => {
  describe('given an email address and password', () => {
    test('should respond with a 201 status code', async () => {
      const response = await request(app).post('/api/auth/signup').send({
        email: 'username@mail.com',
        password: 'password',
      });

      expect(response.statusCode).toBe(201);
    });

    test('should respond with a json body containing a message field', async () => {
      const response = await request(app).post('/api/auth/signup').send({
        email: 'username@mail.com',
        password: 'password',
      });

      expect(response.body.message).toEqual("User 'username' added to database");
    });
  });

  describe('When email and/or password is missing', () => {
    describe('When no email and no password is given', () => {
      test("should respond with a 400 status code and 'Missing information' message", async () => {
        let response = await request(app).post('/api/auth/signup').send({});
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual('Missing information');

        response = await request(app).post('/api/auth/signup').send({
          email: '',
          password: '',
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual('Missing information');
      });
    });

    describe('When no email is given', () => {
      test("should respond with a 400 status code and 'Missing information' message", async () => {
        let response = await request(app).post('/api/auth/signup').send({
          password: 'password',
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual('Missing information');

        response = await request(app).post('/api/auth/signup').send({
          email: '',
          password: 'password',
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual('Missing information');
      });
    });

    describe('When no password is given', () => {
      test("should respond with a 400 status code and 'Missing information' message", async () => {
        let response = await request(app).post('/api/auth/signup').send({
          email: 'username@mail.com',
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual('Missing information');

        response = await request(app).post('/api/auth/signup').send({
          email: 'username@mail.com',
          password: '',
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual('Missing information');
      });
    });
  });
});
