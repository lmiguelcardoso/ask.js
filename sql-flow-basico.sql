-- CRIAR TABLE
CREATE TABLE usuarios(
    nome VARCHAR(50),
    email VARCHAR(100),
    idade INT
);
-- INSERIR
INSERT INTO usuarios(nome, email, idade) VALUES(
    "Luiz Felipe",
    "luzinho@gmail.com",
    17
);
-- ESCOLHER 
SELECT * FROM usuarios WHERE idade=25;
-- DELETE
DELETE FROM usuarios WHERE nome= "Victor"
-- UPDATE
UPDATE usuarios SET nome="nome de teste"