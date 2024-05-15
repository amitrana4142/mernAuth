
import {getAuth ,GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { firebaseApp } from '../firebaseService'
import {  signInSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch()
    const navigator = useNavigate();
    const handleGoogleClick = async()=>{
        try {
          console.log('oauth');
            const provider = new GoogleAuthProvider()
            const auth = getAuth(firebaseApp);
            const result = await signInWithPopup (auth, provider);
            const res =  await fetch( '/api/auth/google',{
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
                  body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    profilePhoto: result.user.photoURL,
                    
                  })
            })
            const data = await res.json()
           dispatch(signInSuccess(data));
           navigator("/");
        } catch (error) {
            console.log('Unable to process google login', error);
        }
    }
  return (
    <button
    type="buttton"
    onClick={handleGoogleClick}
    className="bg-red-800 p-4 border-none max text-white
     rounded-xl uppercase hover:opacity-95 
    "
 
  > Countine With Google Account </button>
  )
}
