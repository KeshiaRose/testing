(function() {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function(schemaCallback) {
        var cols = [{ id: "id", dataType: tableau.dataTypeEnum.int },
            { id: "name", dataType: tableau.dataTypeEnum.string },
            { id: "downloads", dataType: tableau.dataTypeEnum.int },
            { id: "created_at", dataType: tableau.dataTypeEnum.string },
            { id: "updated_at", dataType: tableau.dataTypeEnum.string },
            { id: "deleted_at", dataType: tableau.dataTypeEnum.string },
            { id: "detailed_description", dataType: tableau.dataTypeEnum.string },
            { id: "privacy_policy", dataType: tableau.dataTypeEnum.string },
            { id: "product_icon_url", dataType: tableau.dataTypeEnum.string },
            { id: "rating", dataType: tableau.dataTypeEnum.string },
            { id: "review_count", dataType: tableau.dataTypeEnum.string },
            { id: "short_description", dataType: tableau.dataTypeEnum.string },
            { id: "support_url", dataType: tableau.dataTypeEnum.string },
            { id: "terms_and_conditions", dataType: tableau.dataTypeEnum.string },
            { id: "owner_id", dataType: tableau.dataTypeEnum.int },
            { id: "owner_uid", dataType: tableau.dataTypeEnum.string },
            { id: "owner_name", dataType: tableau.dataTypeEnum.string },
            { id: "lv_compatible_versions", dataType: tableau.dataTypeEnum.string },
            { id: "lv_created_at", dataType: tableau.dataTypeEnum.string },
            { id: "lv_updated_at", dataType: tableau.dataTypeEnum.string },
            { id: "lv_deleted_at", dataType: tableau.dataTypeEnum.string },
            { id: "lv_id", dataType: tableau.dataTypeEnum.int },
            { id: "lv_install_instructions", dataType: tableau.dataTypeEnum.string },
            { id: "lv_product", dataType: tableau.dataTypeEnum.int },
            { id: "lv_release_notes", dataType: tableau.dataTypeEnum.string },
            { id: "lv_version_number", dataType: tableau.dataTypeEnum.string },
            { id: "lv_version_resource_url", dataType: tableau.dataTypeEnum.string },
            { id: "lv_visibility", dataType: tableau.dataTypeEnum.string },
            { id: "lv_picture1", dataType: tableau.dataTypeEnum.string },
            { id: "lv_picture2", dataType: tableau.dataTypeEnum.string },
            { id: "lv_picture3", dataType: tableau.dataTypeEnum.string }
        ];

        var tableSchema = {
            id: "TableauExtensionGallery",
            alias: "Get Downloads data from the Tableau Extension Gallery.",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://xy81r1n76k.execute-api.us-west-2.amazonaws.com/production/api/v1/products?page=1&per_page=50", function(resp) {
            var items = resp.items,
                tableData = [];
            // console.log(items)

            for (i in items) {
                tableData.push({
                    "id": items[i].id,
                    "name": items[i].name,
                    "downloads": items[i].downloads,
                    "created_at": items[i].created_at,
                    "updated_at": items[i].updated_at,
                    "deleted_at": items[i].deleted_at,
                    "detailed_description": items[i].detailed_description,
                    "privacy_policy": items[i].privacy_policy,
                    "product_icon_url": items[i].product_icon_url,
                    "rating": items[i].rating,
                    "review_count": items[i].review_count,
                    "short_description": items[i].short_description,
                    "support_url": items[i].support_url,
                    "terms_and_conditions": items[i].terms_and_conditions,
                    "owner_id": items[i].owner.id,
                    "owner_uid": items[i].owner.uid,
                    "owner_name": items[i].owner.username,
                    "lv_compatible_versions": items[i].last_version.compatible_versions,
                    "lv_created_at": items[i].last_version.created_at,
                    "lv_updated_at": items[i].last_version.updated_at,
                    "lv_deleted_at": items[i].last_version.deleted_at,
                    "lv_id": items[i].last_version.id,
                    "lv_install_instructions": items[i].last_version.install_instructions,
                    "lv_product": items[i].last_version.product,
                    "lv_release_notes": items[i].last_version.release_notes,
                    "lv_version_number": items[i].last_version.version_number,
                    "lv_version_resource_url": items[i].last_version.version_resource_url,
                    "lv_visibility": items[i].last_version.visibility,
                    "lv_picture1": items[i].last_version.pictures[0],
                    "lv_picture2": items[i].last_version.pictures[1],
                    "lv_picture3": items[i].last_version.pictures[2],

                });
            }
            // console.log(tableData)

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Tableau Extension Gallery";
            tableau.submit();
        });
    });
})();