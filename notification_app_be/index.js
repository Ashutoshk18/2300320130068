import { getPriorityInbox } from "./src/priorityInbox.js";

async function run() {
  const topNotifications = await getPriorityInbox(10);

  console.dir(topNotifications, { depth: null });
}

run();
