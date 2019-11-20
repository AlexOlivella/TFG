import firebase from './../src/config';

const db = firebase.firestore();

export async function createUser(username, password, email, gender, birthday) {
	return await firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
		//console.log("res: ", res)
		db.collection('Users').doc(res.user.uid).set({
			username: username,
			gender: gender,
			birthday: birthday,
		})
		return { isError: false, error: "" };
	}).catch((error) => {
		//console.log('createUser error: ', error);
		return { isError: true, error: error };
	});
}

export async function signInUser(email, password) {
	let error;

	//console.log('signInUser has been called.')

	return await firebase.auth().signInWithEmailAndPassword(email, password)
		.catch((error) => {
			//console.log('signInUser error: ', error);
			return { isError: true, error: error };
		});
}

export const logoutUser = () => {
	//console.log('logoutUser has been called.')
	firebase.auth().signOut();
}

export async function readUserData(uid) {
	var docRef = db.collection("Users").doc(uid);
	//console.log(uid, docRef)
	let responseUser = await docRef.get().then(async function (doc) {
		if (doc.exists) {
			let response = {
				username: doc.data().username,
				gender: doc.data().gender,
				birthday: doc.data().birthday,
			}
			console.log("Document data:", doc.data());
			return response;
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
			return false;
		}
	}).catch(function (error) {
		console.log("Error getting document:", error);
	});

	return responseUser;

}

export const updateSingleData = (email) => {
	firebase.database().ref('users/').update({
		email,
	});
}

export async function updateProfile(uid, newUsername, newGender, newBirthday) {
	var docRef = db.collection("Users").doc(uid);
	return await docRef.update({
		username: newUsername,
		gender: newGender,
		birthday: newBirthday,
	}).then(function () {
		console.log("Document successfully updated!");
	})
		.catch(function (error) {
			// The document probably doesn't exist.
			console.error("Error updating document: ", error);
		});
}

export async function createMigranya(uid, dIni, dFini, intensitat, zonaC, simpt, caus, menst,exerc,imped,medi) {
	var docRef = db.collection("Users").doc(uid).collection("migranyes");
	return await docRef.add({
		dataIni: dIni,
		dataFinal: dFini,
		intensitatDolor: intensitat,
		zonaCap: zonaC,
		simptomes: simpt,
		causes: caus,
		menstruacio: menst,
		exercicis:exerc,
		impediments:imped,
		medicaments:medi,
	}).then(function (docRef) {
		console.log("Migraine added successfully: ", docRef.id);
	})
		.catch(function (error) {
			console.error("Error adding migraine: ", error);
		});
}