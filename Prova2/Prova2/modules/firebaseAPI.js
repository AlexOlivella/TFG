import firebase from './../src/config';

export async function createUser(username, password, email, gender, birthday) {
	let error;
	//console.log('CreateUser has been called.')

	return await firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
		//console.log("res: " + res)
		firebase.database().ref('users/' + res.user.uid).set({
			username: username,
			password: password,
			email: email,
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

export  function readUserData(uid){
	var retorn;
	firebase.database().ref('users/' + uid).on('value', snap =>{ 
		retorn = snap.val()
	console.log(snap.val())
	return retorn}
	
	);
	

}
export const updateSingleData=(email)=>{
    firebase.database().ref('users/').update({
        email,
    });
}