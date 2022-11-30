const supertest = require('supertest');
const chai = require('chai');

const {Client} = require("pg");

const mocha = require('mocha')
const app = mocha
global.app = app;
global.uuidv4 = uuidv4;
global["expect"] = chai.expect;
global.request = supertest(app);
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "admin",
    database: "bdProjeto"
})

client.connect();
describe('Task API Routes', function () {
    // This function will run before every test to clear database
    beforeEach(function (done) {
        app.client.object = {};
        app.client.object.users = [{
            id: this.id,
            title: 'id',
            done: false
        }];
        app.client.write();
        done();
    });

    // In this test it's expected a task list of two tasks
    describe('GET /users', function () {
        it('return a list of users', function (done) {
            request.get('/api/v1/admin/getUsers')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.have.lengthOf(2);
                    done(err);
                });
        });
    });

    // Testing the save task expecting status 201 of success
    describe('GET /getUsersByID', function () {
        it('get user with specific ID', function (done) {
            const id = app.client('users')
            request.get('/api/v1/userToken/admin/getUsersbyID/' + id.id)
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.have.lengthOf(2);
                    done(err);
                });
        });
        // Testing the status 404 for task not found
        it('returns status 404 when id is not found', function (done) {
            const task = {
                id: 'fakeId'
            };
            request.get('/tasks/' + task.id)
                .expect(404)
                .end(function (err, res) {
                    done(err);
                });
        });
    });

    // Here it'll be tested two behaviors when try to find a task by id
    describe('POST /user', function () {
        // Testing how to find a task by id
        it('insert new user in db', function (done) {
            const user = app.client('users').first();
            request.post('/api/v1/userToken/admin/postUser')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql(user);
                    done(err);
                });
        });

    });

    // Testing how to update a task expecting status 201 of success
    describe('PUT /updateUser', function () {
        it('updates a user data', function (done) {
            const user = app.client('user').first();
            request.put('/api/v1/userToken/admin/updateUser' + user.id)
                .send({
                    title: `User atualizado com o ID ${uuidv4()}`,
                    done: false
                })
                .expect(201)
                .end(function (err, res) {
                    done(err);
                });
        });
    });

    // Testing how to delete a task expecting status 201 of success
    describe('DELETE /user', function () {
        it('removes a user', function (done) {
            const user = app.client('tasks').first();
            request.delete('/api/v1/userToken/admin/deleteUser' + user.id)
                .expect(201)
                .end(function (err, res) {
                    done(err);
                });
        });
    });
});