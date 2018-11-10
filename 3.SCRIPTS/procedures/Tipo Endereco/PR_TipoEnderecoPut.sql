CREATE OR REPLACE FUNCTION PR_TipoEnderecoPut(
    vIdTipoEndereco INTEGER,
    vStrDescricao   TEXT
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
    vMessage TEXT := 'Tipo de Oportunidade alterado';
BEGIN

    IF NOT EXISTS (SELECT 1
                    FROM public."tbTipoEndereco" AS TEND
                    WHERE TEND.id_tipo_endereco = vIdTipoEndereco)
        THEN
        
            vContent := 'false';
            vMessage := 'Tipo de Endereço não encontrado';
            
        END IF;
                
    IF EXISTS (SELECT 1
                FROM public."tbTipoEndereco" AS TTEL
                WHERE TTEL.str_descricao = vStrDescricao)
        THEN

            vContent := 'false';
            vMessage := 'Tipo de Endereço já cadastrado';
            
        END IF;

    IF(vContent)
        THEN

            UPDATE public."tbTipoEndereco"
                SET str_descricao = vStrDescricao
                WHERE id_tipo_endereco = vIdTipoEndereco;
        
        END IF;

    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
