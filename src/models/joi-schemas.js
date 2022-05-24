import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const ArtworkSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Mona Lisa"),
    artist: Joi.string().required().example("Leonardo Da Vinci"),
    year: Joi.number().greater(0).less(2023).required().example(1506),
    category: Joi.string().required().example("Mural"),
    description: Joi.string().max(100).required().example("A description of the artwork"),
    lat: Joi.number().required().example("53.3498"),
    lng: Joi.number().required().example("-6.2603"),
    img: Joi.string().optional(),
    locationid: IdSpec,
  })
  .label("Artwork");

export const ArtworkSpecPlus =  ArtworkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ArtworkPlus");

export const ArtworkArraySpec = Joi.array().items(ArtworkSpecPlus).label("ArtworkArray");

export const LocationSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Dublin").regex(/^[A-Z][a-z]{2,}$/),
    lat: Joi.number().required().example("53.3498"),
    lng: Joi.number().required().example("-6.2603"),
    img: Joi.string().optional(),
    userid: IdSpec,
    artworks: ArtworkArraySpec,
  })
  .label("Location");

export const LocationSpecPlus = LocationSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("LocationPlus");

export const LocationArraySpec = Joi.array().items(LocationSpecPlus).label("LocationArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");