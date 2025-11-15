const { fileTypeFromBuffer } = require('file-type');
const fs = require('fs').promises;

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


module.exports = { processFileUpload };