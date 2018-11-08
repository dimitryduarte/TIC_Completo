CREATE OR REPLACE FUNCTION PR_TelefoneEmpresaPost (
	vIdEmpresa 		INTEGER,
	vIdTipoTelefone INTEGER,
	vNumDddNumero 	SMALLINT,
	vNumNumero 		BIGINT
) RETURNS JSON AS $$
DECLARE
	vResult INTEGER := 0;
BEGIN

	IF NOT EXISTS(SELECT 1
				FROM public."tbTelefoneEmpresa" AS TEMP
				WHERE TEMP.id_empresa = vIdEmpresa
					AND TEMP.id_tipo_telefone = vIdTipoTelefone
					AND TEMP.num_ddd_numero = vNumDddNumero
					AND TEMP.num_numero = vNumNumero)
		THEN

			INSERT INTO public."tbTelefoneEmpresa"
				(id_empresa, id_tipo_telefone, num_ddd_numero, num_numero)
				VALUES
					(vIdEmpresa, vIdTipoTelefone, vNumDddNumero, vNumNumero);

		ELSE

			vResult := 1;
			
		END IF;
	
	RETURN json_build_object(
		'result', vResult
	);

END;
$$ LANGUAGE 'plpgsql';
