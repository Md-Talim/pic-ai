import { unsplash } from "@/lib/unsplash";
import { Hono } from "hono";

const COLLECTION_IDS = ["317099"];
const IMAGES_COUNT = 50;

const app = new Hono().get("/", async (c) => {
  const images = await unsplash.photos.getRandom({
    collectionIds: COLLECTION_IDS,
    count: IMAGES_COUNT,
  });

  if (images.errors) {
    return c.json({ error: "Something went wrong!" }, 400);
  }

  let response = images.response;

  if (!Array.isArray(response)) {
    response = [response];
  }

  return c.json({ data: response });
});

export default app;
