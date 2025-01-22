const multer = require("multer");

const storageMulti = multer.memoryStorage();
const uploadMulti = multer({
    storage: storageMulti,
    limits: { fileSize: 1000000 },
});

module.exports = uploadMulti;