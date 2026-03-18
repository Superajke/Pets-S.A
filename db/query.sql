DROP DATABASE IF EXISTS pets_sa;
CREATE DATABASE pets_sa;
USE pets_sa;

CREATE TABLE clientes (
    cliente_id INT NOT NULL AUTO_INCREMENT,
    cedula VARCHAR(20) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (cliente_id),
    UNIQUE KEY uq_clientes_cedula (cedula)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE medicamentos (
    medicamento_id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    dosis VARCHAR(100) NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (medicamento_id),
    UNIQUE KEY uq_medicamentos_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE mascotas (
    mascota_id INT NOT NULL AUTO_INCREMENT,
    identificacion VARCHAR(20) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    raza VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    peso DECIMAL(8,2) NOT NULL,
    cliente_id INT NOT NULL,
    medicamento_id INT NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (mascota_id),
    UNIQUE KEY uq_mascotas_identificacion (identificacion),
    KEY idx_mascotas_cliente (cliente_id),
    KEY idx_mascotas_medicamento (medicamento_id),
    CONSTRAINT fk_mascotas_clientes
        FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_mascotas_medicamentos
        FOREIGN KEY (medicamento_id) REFERENCES medicamentos(medicamento_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO clientes (cedula, nombres, apellidos, direccion, telefono) VALUES
('1001234567', 'Laura', 'Martinez', 'Cartagena - Manga', '3001112233'),
('1007654321', 'Carlos', 'Perez', 'Cartagena - Bocagrande', '3015558899'),
('1012345678', 'Andrea', 'Gomez', 'Cartagena - El Recreo', '3024447788');

INSERT INTO medicamentos (nombre, descripcion, dosis) VALUES
('Amoxicilina', 'Antibiotico para infecciones bacterianas', '10 ml cada 12 horas'),
('Ivermectina', 'Antiparasitario de uso veterinario', '1 tableta cada 24 horas'),
('Meloxicam', 'Antiinflamatorio y analgesico', '5 ml cada 24 horas');

INSERT INTO mascotas (identificacion, nombre, raza, edad, peso, cliente_id, medicamento_id) VALUES
('M001', 'Max', 'Labrador', 5, 24.50, 1, 1),
('M002', 'Luna', 'Siames', 3, 4.20, 2, 2),
('M003', 'Rocky', 'Bulldog Frances', 2, 12.80, 3, 3);