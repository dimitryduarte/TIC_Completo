-- Table: public."tbTelefoneEmpresa"

-- DROP TABLE public."tbTelefoneEmpresa";

CREATE TABLE public."tbTelefoneEmpresa"
(
    id_telefone INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    id_empresa INTEGER NOT NULL,
    id_tipo_telefone INTEGER NOT NULL,
    num_ddd_numero SMALLINT NOT NULL,
    num_numero BIGINT NOT NULL,
    CONSTRAINT "pk_id_telefone_tbTelefoneEmpresa" PRIMARY KEY (id_telefone),
    CONSTRAINT "fk_id_empresa_tbEmpresa_tbTelefoneEmpresa" FOREIGN KEY (id_empresa)
        REFERENCES public."tbEmpresa" (id_empresa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "fk_id_tipo_telefone_tbTipoTelefone_tbTelefoneEmpresa" FOREIGN KEY (id_tipo_telefone)
        REFERENCES public."tbTipoTelefone" (id_tipo_telefone) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT uni_tbTelefoneEmpresa UNIQUE
        (id_empresa, id_tipo_telefone, num_ddd_numero, num_numero)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."tbTelefoneEmpresa"
    OWNER to postgres;
COMMENT ON TABLE public."tbTelefoneEmpresa"
    IS 'O intuito dessa tabela é guardar os telefones das empresas parceiras';
