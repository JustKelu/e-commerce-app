const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,       
    api_secret: process.env.CLOUDINARY_API_SECRET,
    analytics: false,
});

const getPublicIds = (urls) => {
    return urls.map(url => {
        let id = url.split("/upload/")[1];
        return id
            .replace(/^v\d+\//, "")
            .replace(/\.[^/.]+$/, "");
    });
}

const deleteImages = async (publicIds) => {
    try {
        const result = await cloudinary.api.delete_resources(publicIds);
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteFromCloudinary = async (urls) => {
    const publicIds = getPublicIds(urls);
    return await deleteImages(publicIds);
}

module.exports = deleteFromCloudinary;