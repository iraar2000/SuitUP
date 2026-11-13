import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";

// the class which controls the product table
export default class ProductModel {
    constructor() { }

    // the function which creates the product
    async createProduct(productData) {
        const q = `INSERT INTO products(name, description, create_by_id, sub_categ_id, brand_id, supplier_id) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to create the product in the database, productModel.js file", productData);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the function which retrieve the product by id
    async retrieveProductById(prodId) {
        const q = `
            SELECT 
                p.id as productId,
                p.name as productName, 
                p.description as productDescription,

                b.name as brandName,
                b.details as brandDetails,
                b.logo as brandLogo,
                b.address as brandAddress,

                s.name as supplierName,
                s.address as supplierAddress,
                s.logo_url as supplierLogo,
                s.phone as supplierPhone,
                s.email as supplierEmail,
                s.website as supplierWebsite,

                sc.name as subCategoryName,
                sc.description as subCategoryDescription,
                
                c.name as categoryName,
                c.description as categoryDescription

            FROM products AS p
            LEFT JOIN brand AS b ON p.brand_id=b.id
            LEFT JOIN suppliers AS s ON s.id=p.supplier_id
            LEFT JOIN sub_category AS sc ON p.sub_categ_id=sc.id
            LEFT JOIN category AS c ON c.id=sc.category_id
            WHERE p.id=$1;
        `;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve product by ID, productModel.js file", [prodId]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] };
    }

    // the function which retrieve all product by offset
    async retrieveProductByOffset(limit = 10, offset) {
        console.log(limit, offset);
        const q = `
            SELECT
                p.id AS productId,
                p.name AS productName,
                p.description AS productDescription,

                b.name AS brandName,
                b.details AS brandDetails,
                b.logo AS brandLogo,
                b.address AS brandAddress,

                c.name AS categoryName,
                c.description AS categoryDescription,

                v.price,
                v.sku,
                v.status,

                (
                    SELECT COALESCE(
                        json_agg(vi.image_url ORDER BY vi.id),
                        '[]'::json
                    )
                    FROM variant_images vi
                    WHERE vi.variant_id = v.id
                ) AS images

            FROM products p
            LEFT JOIN variants v ON v.id = p.default_variant_id
            LEFT JOIN brand b ON b.id = p.brand_id
            LEFT JOIN sub_category sc ON sc.id = p.sub_categ_id
            LEFT JOIN category c ON c.id = sc.category_id
            LIMIT $1
            OFFSET $2;
        `
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve products by offset, productsModel.js file", [limit, offset]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] };
    }

} 