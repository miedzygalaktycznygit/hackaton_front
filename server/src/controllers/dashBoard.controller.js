function processFileUpload(req, res) {
    try{
        if(req.file == undefined){
            return res.status(400).json({ message: "No file uploaded" });
        }

        res.status(200).json({message: "File uploaded succesfully", filename: req.file.originalname});

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { processFileUpload };
