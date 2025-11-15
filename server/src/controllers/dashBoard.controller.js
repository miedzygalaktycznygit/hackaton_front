const { fileTypeFromBuffer } = require('file-type');
const fs = require('fs').promises;
const { addImg ,addSharedImgByEmail} = require('../services/dashBoard.service');
const { getImagesByUserId, getSharedImagesByUserId } = require('../services/dashBoard.service');

async function processFileUpload(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const buffer = await fs.readFile(req.file.path);
        const type = await fileTypeFromBuffer(buffer);
        
        if (!type || !type.mime.startsWith('image/')) {
            await fs.unlink(req.file.path);
            return res.status(400).json({ message: "Invalid file type" });
        }

        if (!req.user || !req.user.id) {
            await fs.unlink(req.file.path).catch(() => {});
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await addImg(req.user.id, req.file.filename);
        
        res.status(200).json({
            message: "File uploaded successfully",
            filename: req.file.filename,
        });

    } catch (error) {
        console.error(error);
        if (req.file?.path) {
            await fs.unlink(req.file.path).catch(() => {});
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function postSharedImage(req, res) {
    try {
        const { email, image_id } = req.body;

        const currentUserId = req.user.id;

        if (userToShare.id === currentUserId) {
            return res.status(400).json({ message: "You cannot share an image with yourself" });
        }


        if (!email || !image_id) {
            return res.status(400).json({ message: "Missing shared_to_user_id or image_id" });
        }

        const shared = await addSharedImgByEmail(email, image_id);

        res.status(200).json({ message: "Image shared successfully", shared });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to share image" });
    }
}




async function getImages(req, res) {
    try{ 
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userId = req.user.id;
        const images = await getImagesByUserId(userId);
        res.status(200).json({ images });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getSharedImages(req, res) {
    try{ 
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userId = req.user.id;
        const images = await getSharedImagesByUserId(userId);
        res.status(200).json({ images });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { processFileUpload, getImages , getSharedImages, postSharedImage};