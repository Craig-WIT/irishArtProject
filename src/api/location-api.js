import Boom from "@hapi/boom";
import { IdSpec, LocationArraySpec, LocationSpec, LocationSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";
import { locationAnalytics } from "../utils/location-analytics.js";

export const locationApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const locations = await db.locationStore.getAllLocations();
        return locations;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: LocationArraySpec, failAction: validationError },
    description: "Get all Locations",
    notes: "Returns all locations",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request, h) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        if (!location) {
          return Boom.notFound("No Location with this id");
        }
        return location;
      } catch (err) {
        return Boom.serverUnavailable("No Location with this id");
      }
    },
    tags: ["api"],
    description: "Find a Location",
    notes: "Returns a Location",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: LocationSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const location = request.payload;
        const newLocation = await db.locationStore.addLocation(location);
        if (newLocation) {
          return h.response(newLocation).code(201);
        }
        return Boom.badImplementation("error creating location");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Location",
    notes: "Returns the newly created Location",
    validate: { payload: LocationSpec, failAction: validationError },
    response: { schema: LocationSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        if (!location) {
          return Boom.notFound("No Location with this id");
        }
        await db.locationStore.deleteLocationById(location._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Location with this id");
      }
    },
    tags: ["api"],
    description: "Delete a Location",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.locationStore.deleteAllLocations();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all Locations",
  },

  userLocations: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const locations = await db.locationStore.getUserLocations(request.params.id);
        if (locations.length > 0) {
        for (let i = 0; i < locations.length; i+= 1) {
          // eslint-disable-next-line no-await-in-loop
          await locationAnalytics.updateDetails(locations[i]);
        }
      };
        return locations;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get User specific locations",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  uploadImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          location.img = url;
          db.locationStore.updateLocation(location);
        }
        return h.response(file).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  },
};