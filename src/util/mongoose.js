module.exports = {
    convertMongoosesToObject: (mongooses) => {
        return mongooses.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: (mongoose) => {
        return mongoose.toObject();
    }
}