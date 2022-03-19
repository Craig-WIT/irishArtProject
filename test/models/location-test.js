import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testLocations, dublin,maggie } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Location Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.locationStore.deleteAllLocations();
    const user = await db.userStore.addUser(maggie)
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testLocations[i] = await db.locationStore.addLocation(testLocations[i]);
      testLocations[i].userid = user._id
    }
  });

  test("create a location", async () => {
    const user = await db.userStore.addUser(maggie)
    const location = await db.locationStore.addLocation(dublin);
    location.userid = user._id
    assertSubset(dublin, location);
    assert.isDefined(location._id);
  });

  test("delete all locations", async () => {
    let returnedLocations = await db.locationStore.getAllLocations();
    assert.equal(returnedLocations.length, 3);
    await db.locationStore.deleteAllLocations();
    returnedLocations = await db.locationStore.getAllLocations();
    assert.equal(returnedLocations.length, 0);
  });

  test("get a location - success", async () => {
    const location = await db.locationStore.addLocation(dublin);
    const returnedLocation = await db.locationStore.getLocationById(location._id);
    assertSubset(dublin, location);
  });

  test("delete One Playist - success", async () => {
    const id = testLocations[0]._id;
    await db.locationStore.deleteLocationById(id);
    const returnedLocations = await db.locationStore.getAllLocations();
    assert.equal(returnedLocations.length, testLocations.length - 1);
    const deletedLocation = await db.locationStore.getLocationById(id);
    assert.isNull(deletedLocation);
  });

  test("get a location - bad params", async () => {
    assert.isNull(await db.locationStore.getLocationById(""));
    assert.isNull(await db.locationStore.getLocationById());
  });

  test("delete One Location - fail", async () => {
    await db.locationStore.deleteLocationById("bad-id");
    const allLocations = await db.locationStore.getAllLocations();
    assert.equal(testLocations.length, allLocations.length);
  });
});