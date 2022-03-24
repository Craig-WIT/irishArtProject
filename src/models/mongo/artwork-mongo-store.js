import { Artwork } from "./artwork.js";

export const artworkMongoStore = {
  async getAllArtworks() {
    const artworks = await Artwork.find().lean();
    return artworks;
  },

  async addArtwork(locationId, artwork) {
    artwork.locationid = locationId;
    const newArtwork = new Artwork(artwork);
    const artworkObj = await newArtwork.save();
    return this.getArtworkById(artworkObj._id);
  },

  async getArtworksByLocationId(id) {
    const artworks = await Artwork.find({ locationid: id }).lean();
    return artworks;
  },

  async getCountArtworksCategoryByLocationId(id,category) {
    const artworks = await Artwork.find({ locationid: id, category: category }).lean();
    return artworks.length;
  },

  async getArtworkById(id) {
    if (id) {
      const artwork = await Artwork.findOne({ _id: id }).lean();
      return artwork;
    }
    return null;
  },

  async deleteArtwork(id) {
    try {
      await Artwork.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllArtworks() {
    await Artwork.deleteMany({});
  },

  async updateArtwork(artwork, updatedArtwork) {
    artwork.title = updatedArtwork.title;
    artwork.artist = updatedArtwork.artist;
    artwork.duration = updatedArtwork.duration;
    await artwork.save();
  },
};