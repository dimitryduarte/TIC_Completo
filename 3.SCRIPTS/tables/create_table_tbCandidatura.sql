-- Table: public."tbCandidatura"

-- DROP TABLE public."tbCandidatura";

CREATE TABLE public."tbCandidatura"
(
    id_candidatura INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    id_oportunidade INTEGER NOT NULL,
    id_contato INTEGER NOT NULL,
    dat_cadastro DATE NOT NULL,
    fg_status BOOLEAN NOT NULL DEFAULT 'true',
    CONSTRAINT "pk_id_candidatura_tbCandidatura" PRIMARY KEY (id_candidatura),
    CONSTRAINT "fk_id_contato_tbContato_tbCandidatura" FOREIGN KEY (id_contato)
        REFERENCES public."tbContato" (id_contato) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "fk_id_oportunidade_tbOportunidade_tbCandidatura" FOREIGN KEY (id_oportunidade)
        REFERENCES public."tbOportunidade" (id_oportunidade) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT uni_tbCandidatura UNIQUE (id_oportunidade, id_contato)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."tbCandidatura"
    OWNER to postgres;
COMMENT ON TABLE public."tbCandidatura"
    IS 'O intuito dessa tabela é guardar informações das candidaturas dos contatos nas oportunidades oferecidas pelas empresas parceiras';
