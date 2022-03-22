import Mongoose from "mongoose";

const { Schema } = Mongoose;

const artworkSchema = new Schema({
  title: String,
  artist: String,
  year: Number,
  category: String,
  description: String,
  lat: Number,
  lng: Number,
  img: String,
  locationid: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },
});

export const Artwork = Mongoose.model("Artwork", artworkSchema);