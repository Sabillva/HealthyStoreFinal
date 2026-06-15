const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(require("./healthy-store-final-firebase-adminsdk-fbsvc-7c022d612d.json")),
});

async function makeAdmin(email) {
  const user = await admin.auth().getUserByEmail(email);
  const current = user.customClaims || {};
  await admin.auth().setCustomUserClaims(user.uid, { ...current, admin: true });
  console.log("✅ admin=true set for", email, "uid:", user.uid);
  console.log("Now sign out and sign back in (or refresh token).");
}

makeAdmin(process.argv[2]).catch(console.error);
