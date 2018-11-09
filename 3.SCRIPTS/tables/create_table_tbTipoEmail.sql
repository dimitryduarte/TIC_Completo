-- Table: public."tbTipoEmail"

-- DROP TABLE public."tbTipoEmail";

CREATE TABLE public."tbTipoEmail"
(
    id_tipo_email INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    str_descricao TEXT COLLATE pg_catalog."default" NOT NULL,
    fg_status BIT(1) NOT NULL DEFAULT B'1'::"bit",
    CONSTRAINT "pk_id_tipo_email_tbTipoEmail" PRIMARY KEY (id_tipo_email)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."tbTipoEmail"
    OWNER to postgres;
COMMENT ON TABLE public."tbTipoEmail"
    IS 'O intuito dessa tabela é guardar os tipos de e-mails';