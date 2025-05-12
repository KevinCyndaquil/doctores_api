DROP PROCEDURE IF EXISTS GetDepartmentsTree;
CREATE PROCEDURE GetDepartmentsTree(IN p_parentId INT)
BEGIN
    SELECT 
        parent.id AS id,
        parent.name AS name,
        COUNT(child.id) AS childrenCount
    FROM departments parent
    LEFT JOIN departments child
        ON parent.id = child.parentId
    WHERE 
        IF(p_parentId IS null OR p_parentId <= 0, 
            parent.parentID IS null, 
            parent.parentID = p_parentId)
        AND parent.hidden = false
        AND (child.hidden = false
        OR child.hidden IS null)
    GROUP BY
        parent.id,
        parent.name;
END;