import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/artworks.json"));
db.data = { artworks: [] };

export const artworkJsonStore = {
  async getAllArtworks() {
    await db.read();
    return db.data.artworks;
  },

  async addArtwork(categoryId, artwork) {
    await db.read();
    artwork._id = v4();
    artwork.categoryid = categoryId;
    db.data.artworks.push(artwork);
    await db.write();
    return artwork;
  },

  async getArtworksByCategoryId(id) {
    await db.read();
    return db.data.artworks.filter((artwork) => artwork.categoryid === id);
  },

  async getArtworkById(id) {
    await db.read();
    return db.data.artworks.find((artwork) => artwork._id === id);
  },

  async deleteArtwork(id) {
    await db.read();
    const index = db.data.artworks.findIndex((artwork) => artwork._id === id);
    db.data.artworks.splice(index, 1);
    await db.write();
  },

  async deleteAllArtworks() {
    db.data.artworks = [];
    await db.write();
  },

  async updateArtwork(artwork, updatedArtwork) {
    artwork.title = updatedArtwork.title;
    artwork.artist = updatedArtwork.artist;
    artwork.duration = updatedArtwork.duration;
    await db.write();
  },
};