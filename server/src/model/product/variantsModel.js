import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";
import QueryCreator from "../../utils/queryCreator.js";

export default class variantsModel {
    constructor() {
        this.queryCreator = new QueryCreator();
    }

    // the function which creates the variant
    async createVariant(variantData) {
        const q = `INSERT INTO variants(product_id, price, cost_price, sku, barcode, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to create product variant in database, variantsModel.js file", variantData);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the function which retrieves the variant
    async retrieveVariantById(variantId) {
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

            FROM variants AS v
            LEFT JOIN products AS p ON p.id=v.product_id
            LEFT JOIN brand b ON b.id = p.brand_id
            LEFT JOIN sub_category sc ON sc.id = p.sub_categ_id
            LEFT JOIN category c ON c.id = sc.category_id
            WHERE v.id=$1;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve the variant by id, variantModel.js file", [variantId]);
        console.log(response);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the function which retrieves the variants of the product
    async retrieveVariantByProductId(prodId, limit = null) {
        let q = `
            SELECT
                v.id,
                v.price,
                v.sku,
                v.barcode,
                v.status,
                
                (
                    SELECT COALESCE(
                        json_agg(
                            json_build_object(
                                'id', sp.id,
                                'name', sp.name,
                                'unit', sp.unit,
                                'value', vs.value
                            )
                            ORDER BY sp.name
                        ),
                        '[]'::json
                    )
                    FROM variant_specification vs
                    JOIN specification sp
                        ON sp.id = vs.specification_id
                    WHERE vs.variant_id = v.id
                ) AS specifications,

                (
                    SELECT COALESCE(
                        json_agg(vi.image_url ORDER BY vi.id),
                        '[]'::json
                    )
                    FROM variant_images vi
                    WHERE vi.variant_id = v.id
                ) AS images

            FROM variants AS v
            WHERE v.product_id = $1
            GROUP BY v.id
            ORDER BY v.id
        `;

        // add the limit
        if (limit) q += ` LIMIT $2`;
        q += `;`;

        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve the variant by productId, variantsModel.js file", limit ? [prodId, limit] : [prodId]);
        if (response.status !== 200) return response;
        return { status: response.status, data: limit === 1 ? response.data[0] : response.data };
    }

    // the function which updates the product variant
    async updateProductVariant(prodId, variantId, data) {
        const keys = Object.keys(data);
        if (!keys.length) throw new Error("No fields to update.");

        const setters = keys.map((key, index) => `${key} = $${index + 3}`).join(',');
        const values = [prodId, variantId, ...Object.values(data)]

        const q = this.queryCreator.buildUpdatorQuery({
            table: "variants",
            setters,
            where: "WHERE product_id=$1 AND id=$2 RETURNING *"
        })

        return await postgresQueryHelper(q, "Internal server error, failed to update the product variant, variantsModel.js file", values);
    }
}