import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should not be authorised', (done) => {
    request(app.getHttpServer())
      .get('/')
      .expect(401)
      .then(() => done());
  });

  it('should login', (done) => {
    request(app.getHttpServer())
      .post('/auth')
      .send({ username: 'testing' })
      .expect(201)
      .expect((r) => expect(r.body.access_token).toBeDefined())
      .then(({ body: { access_token } }) =>
        request(app.getHttpServer())
          .get('/')
          .set('Authorization', `Bearer ${access_token}`)
          .expect(200),
      )
      .then(() => done());
  });
});
