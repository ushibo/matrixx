import * as firebase  from 'firebase';

export default {
  sendUserText: (fullName, text) => {
    return firebase.auth().signInAnonymously().then(() => {
      return firebase.database().ref('users/' + fullName).set({
        text: text
      });
    })
  }
}