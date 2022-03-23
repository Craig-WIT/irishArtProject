import _ from "lodash";
import { Location } from "./location.js";
import { artworkMongoStore } from "./artwork-mongo-store.js";

export const locationMongoStore = {
  async getAllLocations() {
    const locations = await Location.find().lean();
    return locations;
  },

  async getLocationById(id) {
    if (id) {
      const location = await Location.findOne({ _id: id }).lean();
      if (location) {
        location.artworks = await artworkMongoStore.getArtworksByLocationId(location._id);
        location.artworks = _.sortBy(location.artworks, o => o.title)
      }
      return location;
    }
    return null;
  },

  async addLocation(location) {
    const newLocation = new Location(location);
    const locationObj = await newLocation.save();
    return this.getLocationById(locationObj._id);
  },

  async getUserLocations(id) {
    let locations = await Location.find({ userid: id }).lean();
    locations = _.sortBy(locations, o => o.name)
    return locations;
  },

  async deleteLocationById(id) {
    try {
      await Location.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllLocations() {
    await Location.deleteMany({});
  },

  async updateLocation(updatedLocation) {
    const location = await Location.findOne({ _id: updatedLocation._id });
    location.name = updatedLocation.name;
    location.img = updatedLocation.img;
    await location.save();
  },
};