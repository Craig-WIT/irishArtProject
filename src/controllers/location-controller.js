import { db } from "../models/db.js";
import { ArtworkSpec, } from "../models/joi-schemas.js";

export const locationController = {
  index: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const viewData = {
        title: "Location",
        location: location,
      };
      return h.view("location-view", viewData);
    },
  },

  addArtwork: {
    validate: {
      payload: ArtworkSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const location = await db.locationStore.getLocationById(request.params.id);
      const viewData = {
        title: "Can't Add Artwork",
        location: location,
        errors: error.details
      };
        return h.view("location-view", viewData).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const newArtwork = {
        title: request.payload.title,
        artist: request.payload.artist,
        year: Number(request.payload.year),
        category: request.payload.category,
        description: request.payload.description,
        lat: request.payload.lat,
        lng: request.payload.lng,
      };
      await db.artworkStore.addArtwork(location._id, newArtwork);
      return h.redirect(`/location/${location._id}`);
    },
  },

  deleteArtwork: {
    handler: async function(request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.artworkStore.deleteArtwork(request.params.artworkid);
      return h.redirect(`/location/${location._id}`);
    },
  },
};