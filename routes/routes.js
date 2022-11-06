import express from 'express';

function routes(app) {
    app.get('/api/user', (req, res) => {
        console.log(`hello user`);
        res.send(`wassup`);
    })
}

export default routes;