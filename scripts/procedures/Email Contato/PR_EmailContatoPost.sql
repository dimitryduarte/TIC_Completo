CREATE OR REPLACE FUNCTION PR_EmailContatoPost (
	vIdContato 		INTEGER,
	vIdTipoEmail	INTEGER,
	vStrEmail		TEXT
) RETURNS JSON AS $$
DECLARE
	vContent BOOLEAN := 'true';
	vMessage TEXT := 'Email do Contato cadastrado';
BEGIN

	IF NOT EXISTS (SELECT 1
					FROM public."tbEmailContato" AS ECONT
					WHERE ECONT.id_contato = vIdContato
						AND ECONT.id_tipo_email = vIdTipoEmail
						AND ECONT.str_email = vStrEmail)
		THEN

			INSERT INTO public."tbEmailContato"
				(id_contato, id_tipo_email, str_email)
				VALUES
					(vIdContato, vIdTipoEmail, vStrEmail);

		ELSE

			vContent := 'false';
			vMessage := 'Email do Contato inválido';
			
		END IF;
	
	RETURN json_build_object(
		'Content', vContent,
		'Message', vMessage
	);

END;
$$ LANGUAGE 'plpgsql';
