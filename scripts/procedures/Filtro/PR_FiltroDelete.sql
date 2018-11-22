CREATE OR REPLACE FUNCTION PR_FiltroDelete (
	vIdFiltro INTEGER
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
	vMessage TEXT := 'Filtro deletado';
BEGIN

    IF EXISTS (SELECT 1
                FROM public."tbFiltro" AS FIL
                WHERE FIL.id_filtro = vIdFiltro)
        THEN
        
            DELETE FROM public."tbFiltro"
                WHERE id_filtro = vIdFiltro;
                
        ELSE
        
            vContent := 'false';
            vMessage := 'Filtro não encontrado';
            
        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
