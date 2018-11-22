CREATE OR REPLACE FUNCTION PR_OportunidadePost (
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
	vMessage TEXT := 'Oportunidade cadastrada';
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

			INSERT INTO public."tbOportunidade"
				(id_empresa, num_vaga, str_descricao, dat_inicio, dat_fim,
					num_remuneracao, id_tipo_oportunidade)
				VALUES
					(vIdEmpresa, vNumVaga, vStrDescricao, vDatInicio, vDatFim,
						vNumRemuneracao, vIdTipoOportunidade);

		END IF;
	
	RETURN json_build_object (
		'Content', vContent,
		'Message', vMessage
	);

END;
$$ LANGUAGE 'plpgsql';
