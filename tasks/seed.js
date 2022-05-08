const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const bcrypt = require('bcrypt');
const games = data.games;
const game = data.game;
const forums = data.forums;
const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const usersC = mongoCollections.users;


async function seedGames() {

	//populating runs ---------------------------------------------------------------------
	//clastle crashers
	try {
	let idHolder;
	try {
		idHolder = await game.createRun('generalKenobi', 'Castle Crashers', 'this run took 9 parsecs', 220802,"https://www.youtube.com/embed/pJOUCwf6-N4", ['Any%', 'Glitchless'] );
		try {
		await game.newComment(idHolder.id.toString(), 'Tristan', 'Nice run man');
		} catch(e) {
		console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'Connor', 'I could do better');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'Sebastian', 'No you couldnt');
		} catch(e) {
			console.log(e);
		}
		} catch (e) {
			console.log(e);
		}
	try {
		idHolder = await game.createRun('Tristan', 'Castle Crashers', 'Killed Boss 1', 220910,'https://www.youtube.com/embed/QqtPAjOg2oU', ['Any%', 'Glitchless'] );
		try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'bad run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'Tristan', 'that was fine');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'Sebastian', 'worst Ive seen');
		} catch(e) {
			console.log(e);
		} 
	} catch (e) {
		console.log(e)
		}
	
	try {
		idHolder = await game.createRun('Isaac', 'Castle Crashers', 'Killed Boss 2', 220920,'https://www.youtube.com/embed/utrzdYhS9Es', ['Any%', 'Blindfolded'] );
		try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'Nice run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'I really liked it');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'Like I loved it');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		idHolder = await game.createRun('Sebastian', 'Castle Crashers', 'Killed Boss 3', 220930,'https://www.youtube.com/embed/YII_P5-3wfs', ['100%', 'Blindfolded'] );
		try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'Nice run man');
		} catch(e) {
			console.log(e);
		}
	}catch (e) {
			console.log(e);
		}
		try {
			idHolder = await game.createRun('Connor', 'Castle Crashers', 'Killed Boss 4', 220940,'https://www.youtube.com/embed/0Derj5N4Yrk', ['Any%', 'Glitchless'] );
		}catch (e) {
			console.log(e);
		}
		//populating Minecraft
	try {
		idHolder = await game.createRun('generalKenobi', 'Minecraft', 'this run took 10 parsecs', 220802,"https://www.youtube.com/embed/zePrYFb2NbI", ['Any%', 'Glitchless'] );
	} catch(e) {
		console.log(e);
	}
	try {
		idHolder = await game.createRun('Connor', 'Minecraft', 'Killed Boss 5', 220940,'https://www.youtube.com/embed/f1jWqoyWobg', ['Any%', 'Glitchless'] );
		try {
			await game.newComment(idHolder.id.toString(), 'Tristan', 'Nice run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'Connor', 'I could do better');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'Sebastian', 'No you couldnt');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		idHolder = await game.createRun('Tristan', 'Minecraft', 'Killed Boss 6', 220910,'https://www.youtube.com/embed/srd17aD7P3Y', ['Any%', 'Glitchless'] );
		try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'bad run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'Tristan', 'that was fine');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'Sebastian', 'worst Ive seen');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		idHolder = await game.createRun('Isaac', 'Minecraft', 'Killed Boss 7', 220920,'https://www.youtube.com/embed/4EG2up-jcKM', ['Any%', 'Blindfolded'] );
		try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'Nice run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'I really liked it');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'Like I loved it');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		idHolder = await game.createRun('Sebastian', 'Minecraft', 'Killed Boss 8', 220930,'https://www.youtube.com/embed/ET9n1aKzY-0', ['100%', 'Blindfolded'] );
		try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'Nice run man');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}

	// populating  the binding of issac
	try {
		idHolder = await game.createRun('Connor', 'The Binding of Issac', 'Killed Boss 9', 220940,'https://www.youtube.com/embed/OfuEiF0iw3I', ['Any%', 'Glitchless'] );
		try {
			await game.newComment(idHolder.id.toString(), 'Tristan', 'Nice run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'Connor', 'I could do better');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'Sebastian', 'No you couldnt');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		idHolder = await game.createRun('Tristan', 'The Binding of Issac', 'Killed Boss 10', 220910,'https://www.youtube.com/embed/LtVKALflhic', ['Any%', 'Glitchless'] );
		try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'bad run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'Tristan', 'that was fine');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'Sebastian', 'worst Ive seen');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		idHolder = await game.createRun('Isaac', 'The Binding of Issac', 'Killed Boss 11', 220920,'https://www.youtube.com/embed/XqOKFym_c0U', ['Any%', 'Blindfolded'] );
		try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'Nice run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'I really liked it');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'Like I loved it');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		idHolder = await game.createRun('Sebastian', 'The Binding of Issac', 'Killed Boss 12', 220930,'https://www.youtube.com/embed/r1mBhQoZDcI', ['100%', 'Blindfolded'] );
		try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'Nice run man');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
		//populating terraria

	try {
		idHolder = await game.createRun('Connor', 'Terraria', 'Killed Boss 13', 220940,'https://www.youtube.com/embed/-jkVC43ofOM', ['Any%', 'Glitchless'] );
		try {
			await game.newComment(idHolder.id.toString(), 'Tristan', 'Nice run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'Connor', 'I could do better');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'Sebastian', 'No you couldnt');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		idHolder = await game.createRun('Tristan', 'Terraria', 'Killed Boss 14', 220910,'https://www.youtube.com/embed/ZTPrOnI9lFw', ['Any%', 'Glitchless'] );
		try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'bad run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'Tristan', 'that was fine');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'Sebastian', 'worst Ive seen');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		idHolder = await game.createRun('Isaac', 'Terraria', 'Killed Boss 15', 220920,'https://www.youtube.com/embed/j5D44ZysfU8', ['Any%', 'Blindfolded'] );
		try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'Nice run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'I really liked it');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'Like I loved it');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		idHolder = await game.createRun('Sebastian', 'Terraria', 'Killed Boss 16', 220930,'https://www.youtube.com/embed/lZqrCof1Sjc', ['100%', 'Blindfolded'] );
		try {
			await game.newComment(idHolder.id.toString(), 'generalKenobi', 'Nice run man');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		idHolder = await game.createRun('generalKenobi', 'Flappy Bird','I got so far', 220804,"https://www.youtube.com/embed/O5VYqv6Fyec", ['Blindfolded', 'Glitchless'] );
	}
	catch (e) {
		console.log(e);
	}
} catch(e) {
	console.log(e);
}
}
const main = async () => {
	const db = await dbConnection.connectToDb();
	await db.dropDatabase();
	const usersCollection = await usersC();
	let hashedPassword = '';
        let tempUser = {
            username: 'username',
            password: 'hashedPassword',
            email: 'email',
            token: 'token',
            status: 'active',
            runs: [],
            posts: []
        };
	let post = {};
	let finder = "";

		const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let token = '';
		function findToken() {
			token = '';
        	for (let i=0; i<25; i++) {
            	token += characters[Math.floor(Math.random() * characters.length)];
        	}
		}

		// seed users and forums b/c authenticating users doesn't work without email
	//--------------------------------------------------

	try {
		hashedPassword = await bcrypt.hash('thenyouarelost', 16);
		findToken();
        tempUser = {
            username: 'generalKenobi',
            password: hashedPassword,
            email: "hello@gmail.com",
            token: token,
            status: 'active',
            runs: [],
            posts: []
        };
		await usersCollection.insertOne(tempUser);
		
	}
		catch (e){
			console.log("General didn't add");
	}
	try {
		hashedPassword = await bcrypt.hash('password', 16);
		findToken();
        tempUser = {
            username: 'Tristan',
            password: hashedPassword,
            email: "tristan@gmail.com",
            token: token,
            status: 'active',
            runs: [],
            posts: []
        };
		await usersCollection.insertOne(tempUser);
	}
	catch (e){
		console.log("Tristan didn't add");
	}
	try {
		hashedPassword = await bcrypt.hash('password2', 16);
		findToken();
        tempUser = {
            username: 'Isaac',
            password: hashedPassword,
            email: "isaac@gmail.com",
            token: token,
            status: 'active',
            runs: [],
            posts: []
        };
		await usersCollection.insertOne(tempUser);
	}
	catch (e){
		console.log("Isaac didn't add");
	}
	try {
		hashedPassword = await bcrypt.hash('password3', 16);
		findToken();
        tempUser = {
            username: 'Sebastian',
            password: hashedPassword,
            email: "sebastian@gmail.com",
            token: token,
            status: 'active',
            runs: [],
            posts: []
        };
		await usersCollection.insertOne(tempUser);
	}
	catch (e){
		console.log("Sebastian didn't add");
	}
	try {
		hashedPassword = await bcrypt.hash('password4', 16);
		findToken();
        tempUser = {
            username: 'Connor',
            password: hashedPassword,
            email: "connor@gmail.com",
            token: token,
            status: 'active',
            runs: [],
            posts: []
        };
		await usersCollection.insertOne(tempUser);
	}
	catch (e){
		console.log("Connor didn't add");
	}


	//check users
	try {await users.checkUser('generalKenobi', 'thenyouarelost')}
	catch (e) {
		console.log('failedUser1');
	}
	try {await users.checkUser('Tristan', 'password')}
	catch (e) {
		console.log('failedUser2');
	}
	try {await users.checkUser('Isaac', 'password2')}
	catch (e) {
		console.log('failedUser3');
	}
	try {await users.checkUser('Connor', 'password4')}
	catch (e) {
		console.log('failedUser5');
	}
	try {await users.checkUser('Sebastian', 'password3')}
	catch (e) {
		console.log('failedUser4');
	}


	// populating user bios
	await users.changeBio('generalKenobi', 'You were my brother Anakin');
	await users.changeBio('Tristan', 'they call me big fun');
	await users.changeBio('Isaac', 'you will never beat me at league');
	await users.changeBio('Sebastian', 'have you seen my sick alienware laptop');
	await users.changeBio('Connor', 'I love to run for miles');
	
	// populating user profile pics
	await users.changeProfilePic('generalKenobi', 'https://lumiere-a.akamaihd.net/v1/images/General-Grievous_c9df9cb5.jpeg?region=0%2C0%2C1200%2C675&width=960');
	await users.changeProfilePic('Tristan', 'https://shortnorth.org/wp-content/uploads/2015/03/Big-Fun-01-640x386.jpg');
	await users.changeProfilePic('Isaac', 'https://i0.wp.com/twinfinite.net/wp-content/uploads/2012/10/The-Binding-of-Isaac-Rebirth-Free-Download-Full-Version-PC-Crack-Torrent-9-600x338.jpg?resize=600%2C338')
	await users.changeProfilePic('Sebastian', 'https://www.giantbomb.com/a/uploads/scale_medium/1/10354/2686391-tumblr_nbi1zxz3r51qbf9iro1_500.jpg')
	await users.changeProfilePic('Connor', 'https://i.pinimg.com/originals/12/54/f8/1254f852f8fbaab9f0bd8605622837c7.jpg')

	//populating posts
	await forums.createPost("Is gaming fun?", "Yes, yes it is!!!", 'generalKenobi');
	await forums.createPost("Why gamers should workout", "It helps with the indurance needed for stressful gaming", 'Tristan');
	await forums.createPost("What is the optimal gaming fuel?", "Obviously it is pizza and Mtn. Dew", 'Isaac');
	await forums.createPost("Why e-sports are better than regular ones", "Well, it is all of the excitement of regular sports, but everyone can participate", 'Sebastian');
	await forums.createPost("Where are all of the Pandas going", "It turns out that they aren't endangered, but it is a government consperacy to keep them to themselves.", 'Sebastian');
	await forums.createPost("Why Smash Bros is the best game", "It is the best game because of the nostalga", 'Connor');
	
	//seed games------------------------------------------------
	try {await games.createGame('https://whatifgaming.com/wp-content/uploads/2021/08/Steve-Sitting-Down.jpg', 'Minecraft')}
	catch (e) {
		console.log("failed to make minecraft");
	}
	try {await games.createGame('https://upload.wikimedia.org/wikipedia/en/f/fa/Binding_of_isaac_header.jpg', 'The Binding of Issac')}
	catch (e) {
		console.log('failed to make the binding of Issac');
	}
	try {await games.createGame('https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg?t=1590092560', 'Terraria')}
	catch (e) {
		console.log("failed to make Terraria");
	}
	try {await games.createGame('https://png.pngitem.com/pimgs/s/184-1842460_flappy-bird-bird-png-transparent-png.png', 'Flappy Bird')}
	catch (e) {
		console.log("failed to make Flappy Bird");
	}
	try {await games.createGame('https://assets.nintendo.com/image/upload/c_fill,f_auto,q_auto,w_1200/v1/ncom/en_US/games/switch/c/castle-crashers-remastered-switch/hero', 'Castle Crashers')}
	catch (e) {
		console.log("failed to make Castle Crashers");
	}
	try {await games.createGame('https://steamrip.com/wp-content/uploads/2021/08/hearts-of-iron-iv-free-download-preinstalled-steamrip.jpg.webp', "Hearts Of Iron4")}
	catch (e) {
		console.log("failed to make HOI 4");
	}
	
	await seedGames();
	dbConnection.closeConnection();
};

main();
