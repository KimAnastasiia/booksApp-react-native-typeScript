export let backendUrl = "http://192.168.31.77:4000"
export let tokenFireBaseStorage = "ede4c50c-3f94-44a2-bd2d-8aa18fd9b21f"
export let firebaseStorage = "https://firebasestorage.googleapis.com/v0/b/books-store-cf637.appspot.com/o/photos%2F"

export let firebaseErrors = new Map();
firebaseErrors.set("auth/invalid-email", "Invalid email");
firebaseErrors.set("auth/email-already-in-use", "Email already in use");
firebaseErrors.set("auth/weak-password", "Your password dont have 6 characters");
firebaseErrors.set("auth/invalid-credential", "Sign in failed, check your email or password");
firebaseErrors.set("auth/too-many-requests", "Too many request, wait few minets");