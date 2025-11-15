const { fileTypeFromBuffer } = require('file-type');
const fs = require('fs').promises;
const { addImg } = require('../services/dashBoard.service');
const { getImagesByUserId } = require('../services/dashBoard.service');

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


async function getImages(req, res) {
    try{ 
        const userId = req.user.id;
        const images = await getImagesByUserId(userId);
        res.status(200).json({ images });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { processFileUpload, getImages };