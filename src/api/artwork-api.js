import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, ArtworkSpec, ArtworkSpecPlus, ArtworkArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const artworkApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const artworks = await db.artworkStore.getAllArtworks();
        return artworks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: ArtworkArraySpec, failAction: validationError },
    description: "Get all Artworks",
    notes: "Returns all Artworks",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const artwork = await db.artworkStore.getArtworkById(request.params.id);
        if (!artwork) {
          return Boom.notFound("No artwork with this id");
        }
        return artwork;
      } catch (err) {
        return Boom.serverUnavailable("No artwork with this id");
      }
    },
    tags: ["api"],
    description: "Find an Artwork",
    notes: "Returns an Artwork",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ArtworkSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const artwork = await db.artworkStore.addArtwork(request.params.id, request.payload);
        if (artwork) {
          return h.response(artwork).code(201);
        }
        return Boom.badImplementation("error creating artwork");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create an Artwork",
    notes: "Returns the newly created Artwork",
    validate: { payload: ArtworkSpec },
    response: { schema: ArtworkSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.artworkStore.deleteAllArtworks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all Artworks",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const artwork = await db.artworkStore.getArtworkById(request.params.id);
        if (!artwork) {
          return Boom.notFound("No artwork with this id");
        }
        await db.artworkStore.deleteArtwork(artwork._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No artwork with this id");
      }
    },
    tags: ["api"],
    description: "Delete an Artwork",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};