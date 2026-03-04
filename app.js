const firebaseConfig = {
  apiKey: "AIzaSyA-Iy2Uli9_9ebdJZyVK5RpLKwZF3XrdY4",
  authDomain: "lirtr-2fc4d.firebaseapp.com",
  projectId: "lirtr-2fc4d",
  storageBucket: "lirtr-2fc4d.firebasestorage.app",
  messagingSenderId: "7328042961",
  appId: "1:7328042961:web:3b7851c755290408c55af0",
  measurementId: "G-EGH879VZPJ"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Select DOM Elements
const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const errorMsg = document.getElementById('auth-error');

// --- AUTH LOGIC ---

// Sign Up
signupBtn.addEventListener('click', () => {
    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .catch(error => errorMsg.innerText = error.message);
});

// Login
loginBtn.addEventListener('click', () => {
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .catch(error => errorMsg.innerText = "Invalid login credentials");
});

// Logout
logoutBtn.addEventListener('click', () => {
    signOut(auth);
});

// Monitor Auth State (Login/Logout Detection)
onAuthStateChanged(auth, (user) => {
    if (user) {
        authContainer.style.display = 'none';
        appContainer.style.display = 'block';
        loadTreasureList(); // We will write this function next
    } else {
        authContainer.style.display = 'block';
        appContainer.style.display = 'none';
    }
});
