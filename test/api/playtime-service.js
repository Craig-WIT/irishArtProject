import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const playtimeService = {
  playtimeUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.playtimeUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.playtimeUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.playtimeUrl}/api/users`);
    return res.data;
  },

  async createLocation(location) {
    const res = await axios.post(`${this.playtimeUrl}/api/locations`, location);
    return res.data;
  },

  async deleteAllLocations() {
    const response = await axios.delete(`${this.playtimeUrl}/api/locations`);
    return response.data;
  },

  async deleteLocation(id) {
    const response = await axios.delete(`${this.playtimeUrl}/api/locations/${id}`);
    return response;
  },

  async getAllLocations() {
    const res = await axios.get(`${this.playtimeUrl}/api/locations`);
    return res.data;
  },

  async getLocation(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/locations/${id}`);
    return res.data;
  },

  async createArtwork(id,artwork) {
    const res = await axios.post(`${this.playtimeUrl}/api/locations/${id}/artworks`,artwork);
    return res.data;
  },

  async getArtwork(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/artworks/${id}`);
    return res.data;
  },

  async getAllArtworks() {
    const res = await axios.get(`${this.playtimeUrl}/api/artworks`);
    return res.data;
  },

  async deleteArtwork(id) {
    const res = await axios.delete(`${this.playtimeUrl}/api/artworks/${id}`);
    return res;
  },

  async deleteAllArtworks() {
    const res = await axios.delete(`${this.playtimeUrl}/api/artworks`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.playtimeUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${  response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },
};