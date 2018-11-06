CREATE OR REPLACE FUNCTION PR_TipoOportunidadePost (
    vStrDescricao TEXT
) RETURNS JSON AS $$
DECLARE
	vResult INTEGER := 0;
BEGIN

	IF NOT EXISTS(SELECT 1
				FROM public."tbTipoOportunidade" AS TOPOR
				WHERE TOPOR.str_descricao = vStrDescricao)
		THEN

			INSERT INTO public."tbTipoOportunidade"
				(str_descricao)
				VALUES
					(vStrDescricao);

		ELSE

			vResult := 1;
			
		END IF;
	
	RETURN json_build_object(
		'result', vResult
	);

END;
$$ LANGUAGE 'plpgsql';
