// the class which managers the query creation
export default class QueryCreator {
    constructor() { }

    // product retrieval function handler
    buildProductRetrievalQuery({
        where = "",
        order = "",
        group = "",
        limit = "",
        offset = "",
        includeVariant = false,
        includeBrand = true,
        includeSupplier = true,
        includeCategory = true,
        includeSubCategory = true,
        includeCollection = false
    }) {
        return (
            `
            SELECT
                p.id AS productId,
                p.name AS productName,
                p.description AS productDescription

                ${includeBrand ? `
                ,b.name AS brandName,
                b.details AS brandDetails,
                b.logo AS brandLogo,
                b.address AS brandAddress`
                : ""}

                ${includeSupplier ? `
                ,s.name as supplierName,
                s.address as supplierAddress,
                s.logo_url as supplierLogo,
                s.phone as supplierPhone,
                s.email as supplierEmail,
                s.website as supplierWebsite`
                : ""}

                ${includeSubCategory ? `
                ,sc.name as subCategoryName,
                sc.description as subCategoryDescription`: ""}
                
                ${includeCategory ? `
                ,c.name AS categoryName,
                c.description AS categoryDescription`
                : ""}

                ${includeCollection ? `,col.name AS collection` : ""}

                ${includeVariant ? `
                ,v.price,
                v.sku,
                v.status,

                (
                    SELECT COALESCE(json_agg(vi.image_url ORDER BY vi.id),'[]'::json)
                    FROM variant_images vi
                    WHERE vi.variant_id = v.id
                ) AS images`
                : ""}

            FROM products p
            ${includeVariant ? `LEFT JOIN variants v ON v.id = p.default_variant_id` : ""}
            ${includeSupplier ? `LEFT JOIN suppliers s ON s.id=p.supplier_id` : ""}
            ${includeBrand ? `LEFT JOIN brand b ON b.id = p.brand_id` : ""}
            ${includeSubCategory ? `LEFT JOIN sub_category sc ON sc.id = p.sub_categ_id` : ""}
            ${includeCategory ? `LEFT JOIN category c ON c.id = sc.category_id` : ""}
            ${includeCollection ? `LEFT JOIN product_collection pc ON pc.product_id = p.id
            LEFT JOIN collection col ON col.id = pc.collection_id` : ""}
            
            ${where}
            ${order}
            ${group}
            ${limit}
            ${offset}
            `
        )
    }

    // the product re
}