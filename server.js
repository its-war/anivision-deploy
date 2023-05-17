//TimeZone para São Paulo
process.env.TZ = 'America/Sao_Paulo';

//Importações Principais
const express = require('express');
require('express-async-errors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:8080", "http://192.168.0.21:8080"],
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');
const datahora = require('./src/plugins/datahora');

//Configurações
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
const porta = process.env.PORT || 80;

app.use((req, res, next) => {
    req.io = io;
    next();
});

//Middleware de erro do Express
app.use((err, req, res, next) => {
    console.log('Erro na API: ' + err);
    return res.json({
        status: "Erro"
    });
});

app.get("/", function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});
app.get("*", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(porta, () => {
    console.clear();
    console.log("Servidor iniciado na porta " + porta + " em " + datahora.getData() + " às " + datahora.getHora());
});