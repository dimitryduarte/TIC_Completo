CREATE OR REPLACE FUNCTION PR_TipoTelefonePost (
    vStrDescricao TEXT
) RETURNS JSON AS $$
DECLARE
	vResult INTEGER := 0;
BEGIN

	IF NOT EXISTS(SELECT 1
				FROM public."tbTipoTelefone" AS TTEL
				WHERE TTEL.str_descricao = vStrDescricao)
		THEN

			INSERT INTO public."tbTipoTelefone"
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
