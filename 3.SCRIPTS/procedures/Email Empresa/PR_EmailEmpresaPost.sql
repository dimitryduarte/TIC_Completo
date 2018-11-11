CREATE OR REPLACE FUNCTION PR_EmailEmpresaPost (
	vIdEmpresa 		INTEGER,
	vIdTipoEmail	INTEGER,
	vStrEmail		TEXT
) RETURNS JSON AS $$
DECLARE
	vContent BOOLEAN := 'true';
	vMessage TEXT := 'Email da Empresa cadastrado';
BEGIN

	IF NOT EXISTS (SELECT 1
					FROM public."tbEmailEmpresa" AS EEMP
					WHERE EEMP.id_empresa = vIdEmpresa
						AND EEMP.id_tipo_email = vIdTipoEmail
						AND EEMP.str_email = vStrEmail)
		THEN

			INSERT INTO public."tbEmailEmpresa"
				(id_empresa, id_tipo_email, str_email)
				VALUES
					(vIdEmpresa, vIdTipoEmail, vStrEmail);

		ELSE

			vContent := 'false';
			vMessage := 'Email da Empresa inválido';
			
		END IF;
	
	RETURN json_build_object(
		'Content', vContent,
		'Message', vMessage
	);

END;
$$ LANGUAGE 'plpgsql';
