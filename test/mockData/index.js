

const genEmail = `${randomString("ebusameric")}@gmail.com`;
const genUsername  = `${randomString("samuelchristopher")}`;

export const newUser = {
				email: genEmail,
				username: genUsername,
				password: '22384938999',
				membership: 'Gold'
		};

export const fakeUserEmail = {
				email: 'jacksonegmail.com',
				username: 'sammatinddss',
				password: '22384938ss999',
				membership: 'Gold'
		};

export const oldUser = {
				username: 'sammatins',
				password: '22384938999',
		};

export const adminUser = {
				username: 'sammatins',
				password: '22384938999',
				admin: true
		};

export const fakeAdmin = {
				username:'dlkksjldjlsj0',
				password: 'dldidkshdls',
				admin: true
		};

export const fakeUser = {
				username: 'esammenjjjsshek',
				password: 'sldjsdhjdkhehek',
		}

export const book = {
                    Tittle: 'The Book of John',
                    Author: 'John the beloved',
                    Category: 'Bible',
                    Quantity: 3,
                    Description: 'This book is God\'s word, and most powerful gift too man.'
                };

export const borrowBookById = { 
								bookId : 2
							};

function randomString(v){
    let newString = '';
    let arr = v.split('');
	let len = arr.length;
	for(let i = 0; i < len; i++){
	   let len = arr.length;
       let random = Math.round(Math.random() * arr.length);
	   newString += arr.splice(random,1);
    }
    return newString + arr.join('');
}