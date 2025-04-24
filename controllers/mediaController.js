const Media = require('../models/Media');


exports.addMedia = async (req, res) => {
  try {
    const media = new Media(req.body);
    await media.save();
    res.status(201).json({ message: 'Media added successfully', media });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add media', error: err.message });
  }
};


exports.deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Media.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Media not found' });
    }
    res.status(200).json({ message: 'Media deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete media', error: err.message });
  }
};


exports.getAllMedia = async (req, res) => {
  try {
    const { type } = req.query; // 'movie' or 'series'
    let filter = {};

    if (type) {
      filter.media_type = type; // assuming your schema has a 'mediaType' field
    }

    const mediaList = await Media.find(filter).sort({ createdAt: -1 });
    console.log(mediaList);
    res.status(200).json(mediaList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch media', error: err.message });
  }
};
