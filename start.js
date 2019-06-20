const app = require('./app');
const port = 3000;

app.listen(port, () => {
    console.log(`Started the Silver bars API on port ${ process.env.PORT || port}`);
});