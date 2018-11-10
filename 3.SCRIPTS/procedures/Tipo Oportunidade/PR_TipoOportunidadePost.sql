CREATE OR REPLACE FUNCTION PR_TipoOportunidadePost (
    vStrDescricao TEXT
) RETURNS JSON AS $$
DECLARE
	vContent BOOLEAN := 'true';
	vMensagem TEXT := 'Tipo de Oportunidade cadastrado';
BEGIN

	IF NOT EXISTS (SELECT 1
				FROM public."tbTipoOportunidade" AS TOPOR
				WHERE TOPOR.str_descricao = vStrDescricao)
		THEN

			INSERT INTO public."tbTipoOportunidade"
				(str_descricao)
				VALUES
					(vStrDescricao);

		ELSE

			vContent := 'false';
			vMensagem := 'Tipo de Oportunidade já cadastrado';
			
		END IF;
	
	RETURN json_build_object (
        'Content', vContent,
        'Message', vMensagem
    );

END;
$$ LANGUAGE 'plpgsql';
