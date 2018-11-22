CREATE OR REPLACE FUNCTION PR_TipoEmailPut (
    vIdTipoEmail    INTEGER,
    vStrDescricao   TEXT
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
    vMessage TEXT := 'Tipo de Email alterado';
BEGIN

    IF NOT EXISTS (SELECT 1
                    FROM public."tbTipoEmail" AS TEMAIL
                    WHERE TEMAIL.id_tipo_email = vIdTipoEmail)
        THEN
        
            vContent := 'false';
            vMessage := 'Tipo de Email não encontrado';
            
        END IF;
                
    IF EXISTS (SELECT 1
                FROM public."tbTipoEmail" AS TTEL
                WHERE TTEL.str_descricao = vStrDescricao)
        THEN

            vContent := 'false';
            vMessage := 'Tipo de Email já cadastrado';
            
        END IF;

    IF(vContent)
        THEN

            UPDATE public."tbTipoEmail"
                SET str_descricao = vStrDescricao
                WHERE id_tipo_email = vIdTipoEmail;
        
        END IF;

    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
