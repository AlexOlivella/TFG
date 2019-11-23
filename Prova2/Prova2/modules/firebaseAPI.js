import firebase from './../src/config';

const db = firebase.firestore();

export async function createUser(username, password, email, gender, type, birthday) {
	let docRef
	return await firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
		//console.log("res: ", res)
		if (type == "Doctor") {
			docRef = db.collection("Metges")
		}
		else docRef = db.collection("Pacients")
		docRef.doc(res.user.uid).set({
			username: username,
			gender: gender,
			birthday: birthday,
			type: type
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
export async function comprovarTipusUsuari(uid) {
	var docRef = db.collection("Metges").doc(uid);
	let resposta = false
	await docRef.get().then(function (doc) {
		if (doc.exists) {
			console.log("Document data:", doc.data());
			resposta = true
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}).catch(function (error) {
		console.log("Error getting document:", error);
	});
	return resposta;
}
export async function readUserData(uid) {
	var docRef = db.collection("Pacients").doc(uid);
	//console.log(uid, docRef)
	let responseUser = await docRef.get().then(async function (doc) {
		if (doc.exists) {
			let response = {
				username: doc.data().username,
				gender: doc.data().gender,
				birthday: doc.data().birthday,
				type: doc.data().type,

			}
			console.log("Document data:", doc.data());
			return response;
		} else {
			var docRef = db.collection("Metges").doc(uid);
			//console.log(uid, docRef)
			responseUser = await docRef.get().then(async function (doc) {
				if (doc.exists) {
					let response = {
						username: doc.data().username,
						gender: doc.data().gender,
						birthday: doc.data().birthday,
						type: doc.data().type,
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
		}
	}).catch(function (error) {
		console.log("Error getting document:", error);
	});

	return responseUser;

}
/*
export const updateSingleData = (email) => {
		firebase.database().ref('Pacients/').update({
		email,
	});
}*/

export async function updateProfile(uid, newUsername, newGender, newBirthday) {
	var docRef = db.collection("Pacients").doc(uid);
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

export async function createMigranya(uid, dIni, dFini, intensitat, zonaC, simpt, caus, menst, exerc, imped, medi) {
	var docRef = db.collection("Pacients").doc(uid).collection("migranyes").doc(dIni.toString());
	return await docRef.set({
		dataFinal: dFini,
		intensitatDolor: intensitat,
		zonaCap: zonaC,
		simptomes: simpt,
		causes: caus,
		menstruacio: menst,
		exercicis: exerc,
		impediments: imped,
		medicaments: medi,
	}).then(function (docRef) {
		console.log("Migraine added successfully: ");
	}).catch(function (error) {
		console.error("Error adding migraine: ", error.message);
	});
}

export async function getMigranyes(uid) {
	let result = []
	var docRef = db.collection("Pacients").doc(uid).collection("migranyes")

	await docRef.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, " => ", doc.data());
			result.push(doc.id, doc.data())
		});
	})
		.catch(function (error) {
			console.log("Error getting documents: ", error);
		});
	return result
}

export async function getPacientsFromMetge(uid_metge){
	let result = []
	var docRef = db.collection("Metges").doc(uid_metge).collection("llistaPacients")

	await docRef.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, " => ", doc.data());
			result.push(doc.id)
		});
	})
		.catch(function (error) {
			console.log("Error getting documents: ", error);
		});
	return result
}

export async function getDadesPacient(pacient_uid){
	let result = []
	var docRef = db.collection("Pacients").doc(pacient_uid)

	await docRef.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, " => ", doc.data());
			result.push(doc.id, doc.data())
		});
	})
		.catch(function (error) {
			console.log("Error getting documents: ", error);
		});
	return result
}