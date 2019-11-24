import firebase from './../src/config';

const db = firebase.firestore();

export async function createUser(firstName, lastName, password, email, gender, type, birthday) {
	let docRef
	return await firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
		//console.log("res: ", res)
		if (type == "Doctor") {
			docRef = db.collection("Metges")
		}
		else docRef = db.collection("Pacients")
		docRef.doc(res.user.uid).set({
			firstName: firstName,
			lastName: lastName,
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
	let resposta
	await docRef.get().then(async function (doc) {
		if (doc.exists) {
			//console.log("Document data:", doc.data());
			resposta = doc.data().type
		} else {
			docRef = db.collection("Pacients").doc(uid);
			await docRef.get().then(function (doc) {
				if (doc.exists) {
					console.log("Document data:", doc.data());
					resposta = doc.data().type
				} else {
					// doc.data() will be undefined in this case
					console.log("No such document!");
				}
			}).catch(function (error) {
				console.log("Error getting document:", error);
			});
			return resposta;
		}
	}).catch(function (error) {
		console.log("Error getting document:", error);
	});
	return resposta;
}

export async function readUserData(uid, tipus) {
	let docRef
	if (tipus == "Doctor")
		docRef = db.collection("Metges").doc(uid);
	else docRef = db.collection("Pacients").doc(uid)
	//console.log(uid, docRef)
	let response
	await docRef.get().then(function (doc) {
		if (doc.exists) {
			console.log("Document data:", doc.data());
			response = doc.data();
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}).catch(function (error) {
		console.log("Error getting document:", error);
	});
	return response
}
/*
export const updateSingleData = (email) => {
		firebase.database().ref('Pacients/').update({
		email,
	});
}*/

export async function updateProfile(uid, firstName, lastName, newGender, newBirthday) {
	var docRef = db.collection("Pacients").doc(uid);
	return await docRef.update({
		firstName: firstName,
		lastName: lastName,
		gender: newGender,
		birthday: newBirthday,
	}).then(function () {
		//console.log("Document successfully updated!");
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
		//console.log("Migraine added successfully: ");
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
			//console.log(doc.id, " => ", doc.data());
			result.push(doc.id, doc.data())
		});
	})
		.catch(function (error) {
			//console.log("Error getting documents: ", error);
		});
	return result
}

export async function getPacientsFromMetge(uid_metge) {
	let result = []
	var docRef = db.collection("Metges").doc(uid_metge).collection("llistaPacients")

	await docRef.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			//console.log(doc.id, " => ", doc.data());
			if (doc.data().estatSolicitud != "Pending")
				result.push({ uid: doc.id, nom: doc.data().firstName + " " + doc.data().lastName })
		});
	})
		.catch(function (error) {
			//console.log("Error getting documents: ", error);
		});
	return result
}

export async function getPendings(metge_uid) {
	let pendings = 0
	var docRef = db.collection("Metges").doc(metge_uid).collection("llistaPacients")
	await docRef.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			//console.log(doc.id, " => ", doc.data());
			if (doc.data().estatSolicitud == "Pending")
				pendings = pendings + 1
		});
	})
		.catch(function (error) {
			//console.log("Error getting documents: ", error);
		});
	return pendings
}


export async function getPendingsFromMetge(uid_metge) {
	let result = []
	var docRef = db.collection("Metges").doc(uid_metge).collection("llistaPacients")

	await docRef.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			//console.log(doc.id, " => ", doc.data());
			if (doc.data().estatSolicitud == "Pending")
				result.push({ uid: doc.id, nom: doc.data().firstName + " " + doc.data().lastName })
		});
	})
		.catch(function (error) {
			//console.log("Error getting documents: ", error);
		});
	return result
}
export async function getAllMetges() {
	let result = []
	await db.collection("Metges").get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			//console.log(doc.id, " => ", doc.data());
			result.push({ uid: doc.id, nom: doc.data().firstName + " " + doc.data().lastName })
		});
	});
	return result
}

export async function getDadesPacient(pacient_uid) {
	let result 
	var docRef = db.collection("Pacients").doc(pacient_uid)

	await docRef.get().then(function (doc) {
		if (doc.exists) {
			console.log("Document data:", doc.data());
			result= doc.data()
		} else {
			// doc.data() will be undefined in this case
			//console.log("No such document!");
		}
	}).catch(function (error) {
		//console.log("Error getting document:", error);
	});
	return result
}
export async function getLlistaMigranyes(pacient_uid) {
	let result = []
	await db.collection("Pacients").doc(pacient_uid).collection("migranyes").get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			//console.log(doc.id, " => ", doc.data());
			result.push(doc.id)
		});
	});
	return result
}

export async function getInfoMigranya(pacient_uid, data_migranya) {

	let result
	var docRef = db.collection("Pacients").doc(pacient_uid).collection("migranyes").doc(data_migranya)
	await docRef.get().then(function (doc) {
		if (doc.exists) {
			//console.log("Document data:", doc.data());
			result = doc.data()
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}).catch(function (error) {
		console.log("Error getting document:", error);
	});
	return result
}

export function addDoctor(pacient_uid, metge_uid) {
	db.collection("Metges").doc(metge_uid).collection("llistaPacients").doc(pacient_uid).set({
		estatSolicitud: "Pending"
	});
}
export function addPacient(metge_uid, pacient_uid) {
	db.collection("Pacients").doc(pacient_uid).collection("llistaDoctors").doc(metge_uid).set({
		doctor: metge_uid
	});
	return db.collection("Metges").doc(metge_uid).collection("llistaPacients").doc(pacient_uid).update({
		estatSolicitud: "Accepted"
	})
		.then(function () {
			console.log("Document successfully updated!");
		})
		.catch(function (error) {
			// The document probably doesn't exist.
			console.error("Error updating document: ", error);
		});
}