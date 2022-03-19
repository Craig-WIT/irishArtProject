import { v4 } from "uuid";

let artworks = [];

export const artworkMemStore = {
  async getAllArtworks() {
    return artworks;
  },

  async addArtwork(categoryId, artwork) {
    artwork._id = v4();
    artwork.categoryid = categoryId;
    artworks.push(artwork);
    return artwork;
  },

  async getArtworksByCategoryId(id) {
    return artworks.filter((artwork) => artwork.categoryid === id);
  },

  async getArtworkById(id) {
    return artworks.find((artwork) => artwork._id === id);
  },

  async getCategoryArtworks(categoryId) {
    return artworks.filter((artwork) => artwork.categoryid === categoryId);
  },

  async deleteArtwork(id) {
    const index = artworks.findIndex((artwork) => artwork._id === id);
    artworks.splice(index, 1);
  },

  async deleteAllArtworks() {
    artworks = [];
  },

  async updateArtwork(artwork, updatedArtwork) {
    artwork.title = updatedArtwork.title;
    artwork.artist = updatedArtwork.artist;
    artwork.duration = updatedArtwork.duration;
  },
};