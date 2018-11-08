CREATE OR REPLACE FUNCTION PR_TelefoneContatoPost (
	vIdContato 		INTEGER,
	vIdTipoTelefone INTEGER,
	vNumDddNumero 	SMALLINT,
	vNumNumero 		BIGINT
) RETURNS JSON AS $$
DECLARE
	vResult INTEGER := 0;
BEGIN

	IF NOT EXISTS(SELECT 1
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

			vResult := 1;
			
		END IF;
	
	RETURN json_build_object(
		'result', vResult
	);

END;
$$ LANGUAGE 'plpgsql';
