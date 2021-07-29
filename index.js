import express from 'express';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 5000;

const filterGetMiddleware = (req, res, next) => {
  if (req.method === 'GET') {
    next();
  } else {
    res.sendStatus(403);
  }
};

const customErrorHandler = (error, req, res, next) =>
  res.status(500).json({ error: error.message });

app.use(filterGetMiddleware);

app.get('/', (req, res, next) =>
  fs.readFile('/file-does-not-exist', (err, data) => (err ? next(err) : res.send(data)))
);

app.use(customErrorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
