CREATE OR REPLACE FUNCTION PR_OportunidadePut (
    vIdOportunidade     INTEGER,
	vStrDescricao       TEXT,
    vDatInicio          DATE,
    vDatFim             DATE,
    vMonRemuneracao     MONEY,
    vFgSupervisionado   BIT(1),
    vIdTipoOportunidade INTEGER
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbOportunidade" AS OPOR
                WHERE OPOR.id_oportunidade = vIdOportunidade)
        THEN
        
            UPDATE public."tbOportunidade"
                SET str_descricao           = vStrDescricao,
                    dat_inicio              = vDatInicio,
                    dat_fim                 = vDatFim,
                    mon_remuneracao         = vMonRemuneracao,
                    fg_supervisionado       = vFgSupervisionado,
                    id_tipo_oportunidade    = vIdTipoOportunidade
                WHERE id_oportunidade = vIdOportunidade;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
