export const seedData = {
  users: {
    _model: "User",
    admin: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@admin.com",
      password: "Admin",
      scope: ["Admin"]
    },
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
      img: "https://res.cloudinary.com/dtf6gxvaq/image/upload/v1647980988/DublinHotel_zpnvcs_xtshou.jpg",
      userid: "->users.bart"
    },
    Waterford: {
      name: "Waterford City",
      lat: 52.2593,
      lng: -7.11097,
      img: "https://res.cloudinary.com/dtf6gxvaq/image/upload/v1647901506/cat_hvlacx.jpg",
      userid: "->users.bart"
    },
    Cork: {
      name: "Cork City",
      lat: 51.897775,
      lng: -8.472671,
      img: "https://res.cloudinary.com/dtf6gxvaq/image/upload/v1647988375/Cork_zh8zf9.jpg",
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
      img: "https://res.cloudinary.com/dtf6gxvaq/image/upload/v1647904016/placeholder_opkxn0.jpg",
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
      img: "https://res.cloudinary.com/dtf6gxvaq/image/upload/v1647987395/lukeKelly_t1tjiv.jpg",
      locationid: "->locations.Dublin"
    },
    artwork_3 : {
      title: "Scarlet for your Ma'",
      artist: "Holly Pereira",
      year: 2021,
      category: "Dublin Canvas Box",
      description: "A description of the artwork",
      lat: 53.336328,
      lng: -6.273231,
      img: "https://res.cloudinary.com/dtf6gxvaq/image/upload/v1647904016/placeholder_opkxn0.jpg",
      locationid: "->locations.Dublin"
    },
    artwork_4 : {
      title: "Heavy Sea of Love'",
      artist: "Learning Man",
      year: 2021,
      category: "Dublin Canvas Box",
      description: "A description of the artwork",
      lat: 53.32541,
      lng: -6.265248,
      img: "https://res.cloudinary.com/dtf6gxvaq/image/upload/v1647904016/placeholder_opkxn0.jpg",
      locationid: "->locations.Dublin"
    },
    artwork_5 : {
      title: "One More Square'",
      artist: "Craig Grehan",
      year: 2021,
      category: "Dublin Canvas Box",
      description: "A description of the artwork",
      lat: 53.389442,
      lng: -6.197706,
      img: "https://res.cloudinary.com/dtf6gxvaq/image/upload/v1647985673/onemoresquare_jtbjjn.jpg",
      locationid: "->locations.Dublin"
    },
    artwork_6 : {
      title: "Monday'",
      artist: "Fuchsia MacAree",
      year: 2021,
      category: "Dublin Canvas Box",
      description: "A description of the artwork",
      lat: 53.330651,
      lng: -6.264423,
      img: "https://res.cloudinary.com/dtf6gxvaq/image/upload/v1647904016/placeholder_opkxn0.jpg",
      locationid: "->locations.Dublin"
    },
    artwork_7 : {
      title: "An Taisce'",
      artist: "Caroline McKeon",
      year: 2021,
      category: "Dublin Canvas Box",
      description: "A description of the artwork",
      lat: 53.389924,
      lng: -6.193115,
      img: "https://res.cloudinary.com/dtf6gxvaq/image/upload/v1647904016/placeholder_opkxn0.jpg",
      locationid: "->locations.Dublin"
    },
    artwork_8 : {
      title: "Gra don Teanga'",
      artist: "Jody Garry",
      year: 2021,
      category: "Dublin Canvas Box",
      description: "A description of the artwork",
      lat: 53.320357,
      lng: -6.394689,
      img: "https://res.cloudinary.com/dtf6gxvaq/image/upload/v1647904016/placeholder_opkxn0.jpg",
      locationid: "->locations.Dublin"
    },
    artwork_9 : {
      title: "Heart/Hand Grenade'",
      artist: "Lisa McHugh",
      year: 2021,
      category: "Dublin Canvas Box",
      description: "A description of the artwork",
      lat: 53.358143,
      lng: -6.35647,
      img: "https://res.cloudinary.com/dtf6gxvaq/image/upload/v1647904016/placeholder_opkxn0.jpg",
      locationid: "->locations.Dublin"
    },
    artwork_10 : {
      title: "Bike it - Like It'",
      artist: "Anna Entrambasaguas",
      year: 2021,
      category: "Dublin Canvas Box",
      description: "A description of the artwork",
      lat: 53.345867,
      lng: -6.254764,
      img: "https://res.cloudinary.com/dtf6gxvaq/image/upload/v1647904016/placeholder_opkxn0.jpg",
      locationid: "->locations.Dublin"
    },
    artwork_11 : {
      title: "Tower Island'",
      artist: "John Tynan",
      year: 2021,
      category: "Dublin Canvas Box",
      description: "A description of the artwork",
      lat: 53.320357,
      lng: -6.394689,
      img: "https://res.cloudinary.com/dtf6gxvaq/image/upload/v1647904016/placeholder_opkxn0.jpg",
      locationid: "->locations.Dublin"
    },
  }
};