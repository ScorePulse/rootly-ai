const { auth, db } = require("../../config/firebase");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const { doc, setDoc } = require("firebase/firestore");

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
    });
    res.status(201).json({
      message: "User registered successfully",
      userId: user.uid,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    res.status(200).json({
      message: "User logged in successfully",
      userId: user.uid,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
