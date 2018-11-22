CREATE OR REPLACE FUNCTION PR_TelefoneContatoPost (
	vIdContato 		INTEGER,
	vIdTipoTelefone INTEGER,
	vNumDddNumero 	SMALLINT,
	vNumNumero 		BIGINT
) RETURNS JSON AS $$
DECLARE
	vContent BOOLEAN := 'true';
	vMessage TEXT := 'Telefone do Contato cadastrado';
BEGIN

	IF NOT EXISTS (SELECT 1
					FROM public."tbTelefoneContato" AS TCONT
					WHERE TCONT.id_contato = vIdContato
						AND TCONT.id_tipo_telefone = vIdTipoTelefone
						AND TCONT.num_ddd_numero = vNumDddNumero
						AND TCONT.num_numero = vNumNumero)
		THEN

			INSERT INTO public."tbTelefoneContato"
				(id_contato, id_tipo_telefone, num_ddd_numero, num_numero)
				VALUES
					(vIdContato, vIdTipoTelefone, vNumDddNumero, vNumNumero);

		ELSE

			vContent := 'false';
			vMessage := 'Telefone do Contato inválido';
			
		END IF;
	
	RETURN json_build_object(
		'Content', vContent,
		'Message', vMessage
	);

END;
$$ LANGUAGE 'plpgsql';
