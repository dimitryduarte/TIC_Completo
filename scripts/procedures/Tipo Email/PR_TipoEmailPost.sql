CREATE OR REPLACE FUNCTION PR_TipoEmailPost (
    vStrDescricao TEXT
) RETURNS JSON AS $$
DECLARE
	vContent BOOLEAN := 'true';
	vMessage TEXT := 'Tipo de Email cadastrado';
BEGIN

	IF NOT EXISTS (SELECT 1
					FROM public."tbTipoEmail" AS TEMAIL
					WHERE TEMAIL.str_descricao = vStrDescricao)
		THEN

			INSERT INTO public."tbTipoEmail"
				(str_descricao)
				VALUES
					(vStrDescricao);

		ELSE

			vContent := 'false';
			vMessage := 'Tipo de Email já cadastrado';
			
		END IF;
	
	RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
