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
					//console.log("Document data:", doc.data());
					resposta = doc.data().type
				} else {
					// doc.data() will be undefined in this case
					//console.log("No such document!");
				}
			}).catch(function (error) {
				//console.log("Error getting document:", error);
			});
			return resposta;
		}
	}).catch(function (error) {
		//console.log("Error getting document:", error);
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
			//console.log("Document data:", doc.data());
			response = doc.data();
		} else {
			// doc.data() will be undefined in this case
			//console.log("No such document!");
		}
	}).catch(function (error) {
		//console.log("Error getting document:", error);
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
export async function createMigranya(uid, dIni, dFini, intensitat, zonaC, simpt, caus, menst, exerc, imped, medi, tipus) {
	if (tipus == "Doctor")
		var docRef = db.collection("Metges").doc(uid).collection("migranyes").doc(dIni.toString());

	else if (tipus == "Pacient")
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
export async function deleteMigranya(uid, data_migranya, tipus) {
	if (tipus == "Doctor") var docRef = db.collection("Metges").doc(uid).collection("migranyes").doc(data_migranya)

	else if (tipus == "Pacient")
		var docRef = db.collection("Pacients").doc(uid).collection("migranyes").doc(data_migranya)
	await docRef.delete().then(function () {
		console.log("Document successfully deleted!");
	}).catch(function (error) {
		console.error("Error removing document: ", error);
	});
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
export async function getNumPendings(metge_uid) {
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
export async function getDoctorsAdded(pacient_uid) {
	let result = []
	let docRef = db.collection("Pacients").doc(pacient_uid).collection("llistaDoctors")
	await docRef.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			//console.log(doc.id, " => ", doc.data());
			result.push({ uid: doc.uid, nom: doc.data().firstName + " " + doc.data().lastName })
		});
	});
	return result
}
export async function getAllMetges() {
	let result = []
	var docRef = db.collection("Metges")
	await docRef.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			//console.log(doc.id, " => ", doc.data());
			/*doc.forEach(function (query2) {
				if (docRef.doc(pacient_uid))*/
			result.push({ uid: doc.id, nom: doc.data().firstName + " " + doc.data().lastName })
			//});
		});
	});
	return result
}
export async function getLlistaDoctorsFromPacient(uid_pacient) {
	let result = []
	var docRef = db.collection("Pacients").doc(uid_pacient).collection("llistaDoctors")
	await docRef.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
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
			//console.log("Document data:", doc.data());
			result = doc.data()
		} else {
			// doc.data() will be undefined in this case
			//console.log("No such document!");
		}
	}).catch(function (error) {
		//console.log("Error getting document:", error);
	});
	return result
}
export async function getLlistaMigranyes(uid, tipus) {
	let result = []
	if (tipus == "Doctor") var docRef = db.collection("Metges").doc(uid).collection("migranyes")
	else if (tipus == "Pacient") var docRef = db.collection("Pacients").doc(uid).collection("migranyes")
	await docRef.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			//console.log(doc.id, " => ", doc.data());
			result.push(doc.id)
		});
	});
	return result
}
export async function getInfoMigranya(uid, data_migranya, tipus) {

	let result
	if (tipus == "Doctor") var docRef = db.collection("Metges").doc(uid).collection("migranyes").doc(data_migranya)

	else if (tipus == "Pacient")
		var docRef = db.collection("Pacients").doc(uid).collection("migranyes").doc(data_migranya)
	await docRef.get().then(function (doc) {
		if (doc.exists) {
			//console.log("Document data:", doc.data());
			result = doc.data()
		} else {
			// doc.data() will be undefined in this case
			//console.log("No such document!");
		}
	}).catch(function (error) {
		//console.log("Error getting document:", error);
	});
	return result
}
export function addDoctor(pacient_uid, metge_uid, firstN, lastN) {
	db.collection("Metges").doc(metge_uid).collection("llistaPacients").doc(pacient_uid).set({
		firstName: firstN,
		lastName: lastN,
		estatSolicitud: "Pending"
	});
}
export function addPacient(metge_uid, pacient_uid, firstN, lastN) {
	db.collection("Pacients").doc(pacient_uid).collection("llistaDoctors").doc(metge_uid).set({
		firstName: firstN,
		lastName: lastN

	});
	return db.collection("Metges").doc(metge_uid).collection("llistaPacients").doc(pacient_uid).update({
		estatSolicitud: "Accepted"
	})
		.then(function () {
			//console.log("Document successfully updated!");
		})
		.catch(function (error) {
			// The document probably doesn't exist.
			console.error("Error updating document: ", error);
		});
}
export async function getMigrainesByDate(uid, tipus, data) {
	let result = []
	if (tipus == "Doctor") var docRef = db.collection("Metges").doc(uid).collection("migranyes")
	else if (tipus == "Pacient") var docRef = db.collection("Pacients").doc(uid).collection("migranyes")
	await docRef.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			console.log("doc.id", doc.id, "data", data, "data/1000 + 86399", data / 1000 + 86399, "data/1000 ", data / 1000)

			console.log((doc.id / 1000 > data / 1000 - 3600) && (doc.id / 1000 < (data / 1000 - 3600 + 86399)))
			if ((doc.id / 1000 > data / 1000 - 3600) && (doc.id / 1000 < (data / 1000 - 3600 + 86399))) {
				//console.log((doc.id) > data/1000 && parseInt(doc.id) < (data/1000 + 86399))
				console.log(doc.id);
				result.push(doc.id)
			}
		});
	});
	return result
}
export async function afegirCitaPacient(metge_uid, pacient, data) {
	let errorR
	var docRef = db.collection("Metges").doc(metge_uid).collection("citesPacients").doc(data.toString())
	return ºdocRef.get().then(async function (doc) {
		if (doc.exists) {
			errorR = "You already have an appointment at this date and hour"
			return errorR
		} else {
			await docRef.set({
				pacientName: pacient,
				diaHora: data
			}).then(function (docRef) {
				console.log("Document successfully written!");
			}).catch(function (error) {
				console.error("Error writing document: ", error);
			});;
		}
	}).catch(function (error) {
		console.log("Error getting document:", error);
	});

}
export async function getAppointmentsByDate(uid, data){
	let result = []
	var docRef = db.collection("Metges").doc(uid).collection("citesPacients")
	await docRef.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			if ((doc.id / 1000 > data / 1000 - 3600) && (doc.id / 1000 < (data / 1000 - 3600 + 86399))) {
				//console.log((doc.id) > data/1000 && parseInt(doc.id) < (data/1000 + 86399))
				console.log(doc.id);
				result.push(doc.id)
			}
		});
	});
	return result
} 