

/**
 * Adds a virtual field 'id' that returns the '_id' as 'id' and sets toJSON options.
 * @param {Schema} schema - The Mongoose schema to modify.
 */
function addCommonSchemaOptions(schema) {
    // Create a virtual field 'id' that returns the '_id' as 'id'
    const virtual = schema.virtual('id');
    virtual.get(function () {
        return this._id;
    });

    // Set the toJSON options for the schema
    schema.set('toJSON', {
        virtuals: true, // Include virtual fields in the JSON representation
        versionKey: false, // Exclude the '__v' field
        transform: (doc, ret) => {
            delete ret._id; // Remove the '_id' field
        }
    });
}

module.exports = { addCommonSchemaOptions };
