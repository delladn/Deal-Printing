import { db } from "./firebase/config";

export default function FirebaseTest() {
  console.log("Firebase DB:", db);
  return (
    <div className="p-10 text-xl">
      <h1>Firebase Connected!</h1>
    </div>
  );
}
