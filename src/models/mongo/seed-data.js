export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    }
  },
  locations: {
    _model: "Location",
    Dublin: {
      name: "Dublin City",
      lat: 53.3498,
      lng: -6.265503,
      userid: "->users.bart"
    },
    Waterford: {
      name: "Waterford City",
      lat: 52.2593,
      lng: -7.11097,
      userid: "->users.bart"
    }
  },
  artworks: {
    _model : "Artwork",
    artwork_1 : {
      title: "Summer Tales",
      artist: "Shalom Chiaverini",
      year: 2020,
      category: "Dublin Canvas Box",
      description: "A description of the artwork",
      lat: 53.389391,
      lng: -6.264859,
      locationid: "->locations.Dublin"
    },
    artwork_2 : {
      title: "Luke Kelly Sculpture",
      artist: "Vera Klute",
      year: 2008,
      category: "Sculpture",
      description: "A description of the artwork",
      lat: 53.350240259153885,
      lng: -6.24068775933172,
      locationid: "->locations.Dublin"
    },
  }
};