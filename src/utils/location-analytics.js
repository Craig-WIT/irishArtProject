import { db } from "../models/db.js";

export const locationAnalytics = {

  getLatestArtwork(location) {
    let latestArtwork = null;
    if (location.artworks.length > 0) {
      latestArtwork = location.artworks[location.artworks.length - 1];
      }
    return latestArtwork;
  },

  async updateDetails(location) {
    let latestArtwork = null;
    location.artworks = await db.artworkStore.getArtworksByLocationId(location._id);
    if (location.artworks.length > 0) {
      latestArtwork = this.getLatestArtwork(location);
      location.title = latestArtwork.title;
      location.artist = latestArtwork.artist;
      location.category = latestArtwork.category;
      location.sculptures = await db.artworkStore.getCountArtworksCategoryByLocationId(location._id,"Sculpture");
      location.murals = await db.artworkStore.getCountArtworksCategoryByLocationId(location._id,"Mural");
      location.murals += await db.artworkStore.getCountArtworksCategoryByLocationId(location._id,"Waterford Walls");
      location.streetArt = await db.artworkStore.getCountArtworksCategoryByLocationId(location._id,"Graffiti");
      location.streetArt += await db.artworkStore.getCountArtworksCategoryByLocationId(location._id,"Dublin Canvas Box");
    }
    else{
      location.title = "None added yet!";
      location.artist = null;
      location.category = "None added yet!";
      location.sculptures = 0;
      location.murals = 0;
      location.streetArt = 0;
    }
  },
};