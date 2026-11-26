
const mqtt = require('mqtt');

const client = mqtt.connect('mqtts://broker.emqx.io:8883', {
    clientId: 'agromonitor_' + Math.random().toString(16).slice(2, 10)
});

client.on('connect', () => {
    console.log('Conectado ao EMQX!');
    console.log('Iniciando monitoramento da estufa...\n');

    setInterval(() => {

        const dados = {
            temperatura: Number((20 + Math.random() * 20).toFixed(2)),
            umidade: Number((30 + Math.random() * 50).toFixed(2)),
            timestamp: new Date().toISOString()
        };

        client.publish(
            'agromonitor/estufa/dados',
            JSON.stringify(dados),
            (erro) => {
                if (erro) {
                    console.log('Erro ao enviar dados:', erro);
                } else {
                    console.log('Dados enviados:', dados);
                }
            }
        );

    }, 5000);
});

client.on('error', (erro) => {
    console.log('Erro na conexão:', erro.message);
});

client.on('close', () => {
    console.log('Conexão encerrada.');
});
