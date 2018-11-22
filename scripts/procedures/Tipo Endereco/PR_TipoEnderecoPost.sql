CREATE OR REPLACE FUNCTION PR_TipoEnderecoPost (
    vStrDescricao TEXT
) RETURNS JSON AS $$
DECLARE
	vContent BOOLEAN := 'true';
	vMessage TEXT := 'Tipo de Endereço cadastrado';
BEGIN

	IF NOT EXISTS (SELECT 1
					FROM public."tbTipoEndereco" AS TEND
					WHERE TEND.str_descricao = vStrDescricao)
		THEN

			INSERT INTO public."tbTipoEndereco"
				(str_descricao)
				VALUES
					(vStrDescricao);

		ELSE

			vContent := 'false';
			vMessage := 'Tipo de Endereço já cadastrado';
			
		END IF;
	
	RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
