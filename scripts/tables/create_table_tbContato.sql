-- Table: public."tbContato"

-- DROP TABLE public."tbContato";

CREATE TABLE public."tbContato"
(
    id_contato INTEGER UNIQUE NOT NULL,
    str_observacao TEXT COLLATE pg_catalog."default",
    num_criatividade SMALLINT,
    num_comunicacao SMALLINT,
    num_colaboracao SMALLINT,
    num_lideranca SMALLINT,
    fg_status BOOLEAN NOT NULL DEFAULT 'true',
    CONSTRAINT pk_id_contato_tb_contato PRIMARY KEY (id_contato)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."tbContato"
    OWNER to postgres;
COMMENT ON TABLE public."tbContato"
    IS 'O intuito dessa tabela é guardar informações dos contatos';
