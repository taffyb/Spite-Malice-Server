"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = (app, prefix = '/api') => {
    app.get(prefix + '/users', (req, res) => {
        res.send({ name: 'Taffy' });
    });
};
