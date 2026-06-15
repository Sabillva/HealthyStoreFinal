const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(require("./e-commerce-coffee-equipment-firebase-adminsdk-fbsvc-74e6d67320.json")),
});

async function makeAdmin(email) {
  const user = await admin.auth().getUserByEmail(email);
  const current = user.customClaims || {};
  await admin.auth().setCustomUserClaims(user.uid, { ...current, admin: false });
  console.log("✅ admin=false set for", email, "uid:", user.uid);
  console.log("Now sign out and sign back in (or refresh token).");
}

makeAdmin(process.argv[2]).catch(console.error);