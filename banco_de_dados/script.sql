USE db_golpes;

CREATE TABLE IF NOT EXISTS telefones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(20) NOT NULL UNIQUE,
    status VARCHAR(10) NOT NULL,
    instituicao VARCHAR(100) DEFAULT NULL,
    observacoes TEXT
);

INSERT INTO telefones (numero, status, instituicao, observacoes) 
VALUES ('40020022', 'OFICIAL', 'Bradesco', 'Fone Fácil Bradesco Capitais');
INSERT INTO telefones (numero, status, observacoes) 
VALUES ('11999998888', 'GOLPE', 'Se passando por falsa central pedindo PIX');