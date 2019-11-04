import firebase from './../src/config';

const db = firebase.firestore();
export async function createUser(username, password, email, gender, birthday) {
	let error;
	//console.log('CreateUser has been called.')

	return await firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
		//console.log("res: ", res)
		db.collection('Users').doc(res.user.uid).set({
			username: username,
			gender: gender,
			birthday: birthday,
		})
		return {isError: false, error: ""};
	}).catch((error) => {
		//console.log('createUser error: ', error);
		return {isError: true, error: error};
	});
}

export async function signInUser (email, password){
	let error;
	
	//console.log('signInUser has been called.')

	return await firebase.auth().signInWithEmailAndPassword(email, password)
		.catch((error) => {
			//console.log('signInUser error: ', error);
			return {isError: true, error: error};
		});
}

export const logoutUser = () => {
	//console.log('logoutUser has been called.')
	firebase.auth().signOut();
}

export async function readUserData(uid){
	var docRef = db.collection("Users").doc(uid);
	//console.log(uid, docRef)
	let responseUser = await docRef.get().then(async function(doc) {
		if (doc.exists) {
			let response = {
				username: doc.data().username ,
				gender: doc.data().gender ,
				birthday: doc.data().birthday ,
			}
			console.log("Document data:", doc.data());
			return response;
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
			return false;
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});

	return responseUser;

}

export const updateSingleData=(email)=>{
    firebase.database().ref('users/').update({
        email,
    });
}