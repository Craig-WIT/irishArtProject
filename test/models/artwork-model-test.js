import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testLocations, testArtworks, dublinCity, dublin, artwork1, testUsers, maggie } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Artwork Model tests", () => {

  let dublinCityList = [];
  let dublinList = [];

  setup(async () => {
    db.init("mongo");
    await db.locationStore.deleteAllLocations();
    await db.artworkStore.deleteAllArtworks();
    const user = await db.userStore.addUser(maggie);
    dublinCity.userid = user._id
    dublinCityList = await db.locationStore.addLocation(dublinCity);
    for (let i = 0; i < testArtworks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testArtworks[i] = await db.artworkStore.addArtwork(dublinCityList._id, testArtworks[i]);
    }
  });

  test("create single artwork", async () => {
    const user = await db.userStore.addUser(maggie);
    dublin.userid = user._id
    dublinList = await db.locationStore.addLocation(dublin);
    const artwork = await db.artworkStore.addArtwork(dublinList._id, artwork1)
    assert.isNotNull(artwork._id);
    assertSubset (artwork1, artwork);
  });

  test("get multiple artworks", async () => {
    const artworks = await db.artworkStore.getArtworksByLocationId(dublinCityList._id);
    assert.equal(testArtworks.length, artworks.length)
  });

  test("delete all artworks", async () => {
    const artworks = await db.artworkStore.getAllArtworks();
    assert.equal(testArtworks.length, artworks.length);
    await db.artworkStore.deleteAllArtworks();
    const newArtworks = await db.artworkStore.getAllArtworks();
    assert.equal(0, newArtworks.length);
  });

  test("get a artwork - success", async () => {
    dublinList = await db.locationStore.addLocation(dublin);
    const artwork = await db.artworkStore.addArtwork(dublinList._id, artwork1)
    const newArtwork = await db.artworkStore.getArtworkById(artwork._id);
    assertSubset (artwork1, newArtwork);
  });

  test("delete One Artwork - success", async () => {
    const id = testArtworks[0]._id;
    await db.artworkStore.deleteArtwork(id);
    const artworks = await db.artworkStore.getAllArtworks();
    assert.equal(artworks.length, testArtworks.length - 1);
    const deletedArtwork = await db.artworkStore.getArtworkById(id);
    assert.isNull(deletedArtwork);
  });

  test("get a artwork - bad params", async () => {
    assert.isNull(await db.artworkStore.getArtworkById(""));
    assert.isNull(await db.artworkStore.getArtworkById());
  });

  test("delete One Artwork - fail", async () => {
    await db.artworkStore.deleteArtwork("bad-id");
    const artworks = await db.artworkStore.getAllArtworks();
    assert.equal(artworks.length, testArtworks.length);
  });
});