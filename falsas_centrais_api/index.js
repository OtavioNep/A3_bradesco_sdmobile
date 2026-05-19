const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(express.json()); 
app.use(cors()); 

// Conexão com o banco de dados
const dbConfig = {
    host: 'host.docker.internal', 
    user: 'root',
    password: 'senha_root',
    database: 'db_golpes',
    port: 3306
};


// ROTA PÚBLICA: Consulta do Usuário Final (Apenas Leitura)
app.get('/api/telefone/:numero', async (req, res) => {
    try {
        const numeroBuscado = req.params.numero;
        const conexao = await mysql.createConnection(dbConfig);
        
        // O método GET apenas lê as informações, não altera nada no servidor
        const [linhas] = await conexao.execute(
            'SELECT numero, status, instituicao, observacoes FROM telefones WHERE numero = ?', 
            [numeroBuscado]
        );
        await conexao.end();

        if (linhas.length > 0) {
            res.status(200).json(linhas[0]); 
        } else {
            // Retorna 404 Not Found se o recurso não existir 
            res.status(404).json({ 
                mensagem: 'Número não encontrado em nossas bases de risco ou oficiais. Mantenha a atenção.' 
            });
        }
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
});

// ROTA RESTRITA: Gerenciamento e Alimentação da Base (Criação)

app.post('/api/admin/telefone', async (req, res) => {
    try {
        // Simulação de segurança
        const tokenAutorizacao = req.headers['authorization'];
        
        if (tokenAutorizacao !== 'Bearer CHAVE_SECRETA_BRADESCO') {
            return res.status(401).json({ erro: 'Acesso negado. Rota exclusiva para gerenciadores do sistema.' });
        }

        const { numero, status, instituicao, observacoes } = req.body;
        const conexao = await mysql.createConnection(dbConfig);

        
        await conexao.execute(
            'INSERT INTO telefones (numero, status, instituicao, observacoes) VALUES (?, ?, ?, ?)',
            [numero, status, instituicao, observacoes]
        );

        await conexao.end();
        res.status(201).json({ mensagem: 'Registro inserido com sucesso na base de dados.' });

    } catch (erro) {
        console.error(erro);
        // Tratamento para caso o número já exista
        if (erro.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ erro: 'Este número já está cadastrado na base.' });
        }
        res.status(500).json({ erro: 'Erro ao registrar o número.' });
    }
});

app.listen(3000, () => {
    console.log('Servidor da API rodando na porta 3000! (Modo Leitura Pública / Escrita Restrita)');
});