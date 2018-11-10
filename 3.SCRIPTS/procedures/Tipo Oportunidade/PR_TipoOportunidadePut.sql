CREATE OR REPLACE FUNCTION PR_TipoOportunidadePut (
    vIdTipoOportunidade INTEGER,
	vStrDescricao       TEXT
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
    vMensagem TEXT := 'Tipo de Oportunidade alterado';
BEGIN

    IF NOT EXISTS (SELECT 1
                    FROM public."tbTipoOportunidade" AS TOPOR
                    WHERE TOPOR.id_tipo_oportunidade = vIdTipoOportunidade)
        THEN
        
            vContent := 'false';
            vMensagem := 'Tipo de Oportunidade não encontrado';
            
        END IF;
                
    IF EXISTS (SELECT 1
                FROM public."tbTipoOportunidade" AS TTEL
                WHERE TTEL.str_descricao = vStrDescricao)
        THEN

            vContent := 'false';
            vMensagem := 'Tipo de Oportunidade já cadastrado';
            
        END IF;

    IF(vContent)
        THEN

            UPDATE public."tbTipoOportunidade"
                SET str_descricao = vStrDescricao
                WHERE id_tipo_oportunidade = vIdTipoOportunidade;
        
        END IF;

    RETURN json_build_object (
        'Content', vContent,
        'Message', vMensagem
    );

END;
$$ LANGUAGE 'plpgsql';
