const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://tomaspetrovich:Vectra891@cluster0.yrqumy1.mongodb.net/ApiF1?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('No se pudo conectar a MongoDB', err));
