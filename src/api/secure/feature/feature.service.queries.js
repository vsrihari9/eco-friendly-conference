module.exports = {
  // Comments about the query
  GET_ECM_CONTRACTS: `
    SELECT
      contract_id,
      contract_name,
      contract_status,
      joint_venture_flag
    FROM
      contract_management.contract_information
    WHERE
      ROWNUM <= 10
      AND joint_venture_flag =:flag
      AND contract_status =:status
      `,
  // Comments about the query
  // Additional notes
  GET_SERVICE_CATEGORIES: `
    SELECT 
      sc.service_category_id,
      sc.title,
      sc.subcategory,
      sc.description,
      sc.description_part2 as AddlDescription
    FROM
      pbp2021.service_category sc,
      pbp2021.benefit_description bd
    WHERE
      ( sc.service_category_id = bd.service_category_id (+) )
      AND (
          bd.b_only = 'N'
          OR bd.b_only IS NULL
      )
    ORDER BY
      sc.sort_order,
      sc.service_category_id
      `,
};
