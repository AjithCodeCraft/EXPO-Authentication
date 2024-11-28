import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged, signOut} from 'firebase/auth'
import { doc,getDoc,setDoc} from 'firebase/firestore'
export const AuthContext = createContext();
import { auth, db } from '../firebaseConfig';

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    // Simulate authentication status after 3 seconds
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, async (user) => {
        // console.log('Got user', user);
        if (user) {
          setIsAuthenticated(true);
          // Fetch and update user data from Firestore only when the user is logged in
          await updateUserData(user.uid);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      });
      return unsub;
    }, []);
    
    const updateUserData = async (userId) => {
      try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUser({
            username: data.username,
            profileUrl: data.profileUrl,
            userId: data.userId,
            email: auth.currentUser?.email, // You can include more details if needed
          });
        } else {
          console.log("No user data found in Firestore");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    


    const login = async (email, password) => {
      try {
          // Attempt to sign in the user with email and password
          const response = await signInWithEmailAndPassword(auth, email, password);
          const user = response.user;
  
          // Return a success object if login is successful
          return { success: true, data: user };
      } catch (e) {
          let msg = e.message;
  
          // Error handling based on Firebase auth error codes
          const errorCode = e.code;
  
          // Provide specific error messages based on the error code
          switch (errorCode) {
              case 'auth/user-not-found':
                  msg = 'User not found. Please check your email or sign up.';
                  break;
              case 'auth/wrong-password':
                  msg = 'Incorrect password. Please try again.';
                  break;
              case 'auth/invalid-email':
                  msg = 'Invalid email format. Please check your input.';
                  break;
              case 'auth/too-many-requests':
                  msg = 'Too many unsuccessful login attempts. Please try again later.';
                  break;
              case 'auth/network-request-failed':
                  msg = 'Network error. Please check your connection and try again.';
                  break;
              default:
                  msg = 'Login failed. Please try again later.';
                  break;
          }
  
          // Return an error object if login fails
          return { success: false, msg, error: e };
      }
  };
  

    const logout = async () => {
        try {
            await signOut(auth);  // Sign out the user
            return { success: true };  // Return success status
        } catch (e) {
            return { success: false, msg: e.message, error: e };  // Return error status and message
        }
    };
    
    const register = async (email, password, username, profileUrl) => {
        try {
          // Create a new user with email and password
          const response = await createUserWithEmailAndPassword(auth, email, password);
          const user = response.user;
      
          console.log(user);
      
          // Add user data to Firestore
          await setDoc(doc(db, "users", user.uid), {
            username: username,
            profileUrl: profileUrl,
            userId: response?.user?.uid,
            createdAt: new Date(),
          });
      
          return { success: true, data: response?.user };
        } catch (e) {
          let msg = e.message;
      
          // Handle specific Firebase Auth errors
          if (msg.includes("auth/invalid-email")) {
            msg = "Invalid email address";
          } else if (msg.includes("auth/email-already-in-use")) {
            msg = "Email is already in use";
          } else if (msg.includes("auth/weak-password")) {
            msg = "Password should be at least 6 characters";
          } else if (msg.includes("auth/network-request-failed")) {
            msg = "Network error, please check your connection";
          } else {
            msg = "Registration failed, please try again";
          }
      
          return { success: false, msg };
        }
      };
      

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error("useAuth must be used within AuthContextProvider");
    }
    return value;
};
