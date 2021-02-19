import app from './app';

app.enable('trust proxy');
app.listen(process.env.PORT || 3333);
