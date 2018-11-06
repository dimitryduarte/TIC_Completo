CREATE OR REPLACE FUNCTION PR_TipoTelefonePut(
    vIdTipoTelefone INTEGER,
    vStrDescricao   TEXT
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbTipoTelefone" AS TTEL
                WHERE TTEL.id_tipo_telefone = vIdTipoTelefone)
        THEN
        
            UPDATE public."tbTipoTelefone"
                SET str_descricao = vStrDescricao
                WHERE id_tipo_telefone = vIdTipoTelefone;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
