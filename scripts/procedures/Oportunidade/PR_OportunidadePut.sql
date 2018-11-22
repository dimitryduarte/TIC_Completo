CREATE OR REPLACE FUNCTION PR_OportunidadePut (
    vIdOportunidade     INTEGER,
    vIdEmpresa          INTEGER,
    vNumVaga			SMALLINT,
	vStrDescricao       TEXT,
    vDatInicio          DATE,
    vDatFim             DATE,
    vNumRemuneracao     NUMERIC(9,2),
    vIdTipoOportunidade INTEGER
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
	vMessage TEXT := 'Oportunidade alterada';
BEGIN

    IF NOT EXISTS (SELECT 1
					FROM public."tbEmpresa" AS EMP
					WHERE EMP.id_empresa = vIdEmpresa)
		THEN

			vContent := 'false';
            vMessage := 'Empresa não encontrada';

		END IF;

	IF NOT EXISTS (SELECT 1
					FROM public."tbTipoOportunidade" AS TOPOR
					WHERE TOPOR.id_tipo_oportunidade = vIdTipoOportunidade)
		THEN

			vContent := 'false';
            vMessage := 'Tipo de Oportunidade não encontrado';

		END IF;

	IF (vContent)
		THEN
        
            UPDATE public."tbOportunidade"
                SET str_descricao           = vStrDescricao,
                    num_vaga                = vNumVaga,
                    dat_inicio              = vDatInicio,
                    dat_fim                 = vDatFim,
                    num_remuneracao         = vNumRemuneracao,
                    id_tipo_oportunidade    = vIdTipoOportunidade
                WHERE id_oportunidade = vIdOportunidade;
                
        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
