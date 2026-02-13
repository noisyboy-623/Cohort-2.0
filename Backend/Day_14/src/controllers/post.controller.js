const postModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs')

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY// This is the default and can be omitted
});

async function createPostController(req, res) {
    console.log(req.body, req.file)
    
    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),"file"),
        fileName: "Test55"
    })

    res.send(file)
}

module.exports = {
    createPostController
}