CREATE OR REPLACE FUNCTION PR_EmpresaDelete (
	vIdEmpresa INTEGER
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbEmpresa" AS EMP
                WHERE EMP.id_empresa = vIdEmpresa)
        THEN
        
            UPDATE public."tbEmpresa"
                SET fg_status = '0'
                WHERE id_empresa = vIdEmpresa;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
