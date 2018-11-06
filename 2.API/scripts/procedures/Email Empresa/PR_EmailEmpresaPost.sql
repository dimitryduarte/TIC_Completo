CREATE OR REPLACE FUNCTION PR_EmailEmpresaPost (
	vIdEmpresa 		INTEGER,
	vIdTipoEmail	INTEGER,
	vStrEmail		TEXT
) RETURNS JSON AS $$
DECLARE
	vResult INTEGER := 0;
BEGIN

	IF NOT EXISTS(SELECT 1
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

			vResult := 1;
			
		END IF;
	
	RETURN json_build_object(
		'result', vResult
	);

END;
$$ LANGUAGE 'plpgsql';
