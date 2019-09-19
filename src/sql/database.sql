CREATE DATABASE db_elaiss;

use db_elaiss;

CREATE TABLE beneficiarios(
    id_beneficiario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    dni INT(8) NOT NULL,
    fechaNac DATE NOT NULL,
    telefono INT(10),
    data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE users;

INSERT INTO beneficiarios(nombre, apellido, dni, fechaNac, telefono) values("Leandro", "Roidzaid", 31752067, "18/08/85", "1551040420");

SELECT * FROM users;