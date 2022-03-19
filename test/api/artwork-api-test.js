import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { playtimeService } from "./playtime-service.js";
import { maggie, maggieCredentials, dublin, testLocations, testArtworks, artwork1 } from "../fixtures.js";

suite("Artwork API tests", () => {
  let user = null;
  let artLocation = null;

  setup(async () => {
    playtimeService.clearAuth();
    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);
    await playtimeService.deleteAllLocations();
    await playtimeService.deleteAllArtworks();
    await playtimeService.deleteAllUsers();
    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);
    dublin.userid = user._id;
    artLocation = await playtimeService.createLocation(dublin);
  });

  teardown(async () => {});

  test("create artwork", async () => {
    const returnedArtwork = await playtimeService.createArtwork(artLocation._id, artwork1);
    assertSubset(artwork1, returnedArtwork);
  });

  test("create Multiple artworks", async () => {
    for (let i = 0; i < testArtworks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createArtwork(artLocation._id, testArtworks[i]);
    }
    const returnedArtworks = await playtimeService.getAllArtworks();
    assert.equal(returnedArtworks.length, testArtworks.length);
    for (let i = 0; i < returnedArtworks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const artwork = await playtimeService.getArtwork(returnedArtworks[i]._id);
      assertSubset(artwork, returnedArtworks[i]);
    }
  });

  test("Delete ArtworkApi", async () => {
    for (let i = 0; i < testArtworks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createArtwork(artLocation._id, testArtworks[i]);
    }
    let returnedArtworks = await playtimeService.getAllArtworks();
    assert.equal(returnedArtworks.length, testArtworks.length);
    for (let i = 0; i < returnedArtworks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const artwork = await playtimeService.deleteArtwork(returnedArtworks[i]._id);
    }
    returnedArtworks = await playtimeService.getAllArtworks();
    assert.equal(returnedArtworks.length, 0);
  });

  test("denormalised location", async () => {
    for (let i = 0; i < testArtworks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createArtwork(artLocation._id, testArtworks[i]);
    }
    const returnedLocation = await playtimeService.getLocation(artLocation._id);
    assert.equal(returnedLocation.artworks.length, testArtworks.length);
    for (let i = 0; i < testArtworks.length; i += 1) {
      assertSubset(testArtworks[i], returnedLocation.artworks[i]);
    }
  });
});