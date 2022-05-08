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
            username: 'generalkenobi',
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
            username: 'tristan',
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
		console.log("tristan didn't add");
	}
	try {
		hashedPassword = await bcrypt.hash('password2', 16);
		findToken();
        tempUser = {
            username: 'isaac',
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
            username: 'sebastian',
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
            username: 'connor',
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
	try {await users.checkUser('generalkenobi', 'thenyouarelost')}
	catch (e) {
		console.log('failedUser1');
	}
	try {await users.checkUser('tristan', 'password')}
	catch (e) {
		console.log('failedUser2');
	}
	try {await users.checkUser('isaac', 'password2')}
	catch (e) {
		console.log('failedUser3');
	}
	try {await users.checkUser('connor', 'password4')}
	catch (e) {
		console.log('failedUser5');
	}
	try {await users.checkUser('sebastian', 'password3')}
	catch (e) {
		console.log('failedUser4');
	}


	// populating user bios
	await users.changeBio('generalkenobi', 'jedi scum');
	await users.changeBio('tristan', 'they call me big fun');
	await users.changeBio('isaac', 'you will never beat me at league');
	await users.changeBio('sebastian', 'have you seen my sick alienware laptop');
	await users.changeBio('connor', 'I love to run for miles');
	
	// populating user profile pics
	await users.changeProfilePic('generalkenobi', 'https://lumiere-a.akamaihd.net/v1/images/General-Grievous_c9df9cb5.jpeg?region=0%2C0%2C1200%2C675&width=960');
	await users.changeProfilePic('tristan', 'https://shortnorth.org/wp-content/uploads/2015/03/Big-Fun-01-640x386.jpg');
	await users.changeProfilePic('isaac', 'https://i0.wp.com/twinfinite.net/wp-content/uploads/2012/10/The-Binding-of-Isaac-Rebirth-Free-Download-Full-Version-PC-Crack-Torrent-9-600x338.jpg?resize=600%2C338')
	await users.changeProfilePic('sebastian', 'https://www.giantbomb.com/a/uploads/scale_medium/1/10354/2686391-tumblr_nbi1zxz3r51qbf9iro1_500.jpg')
	await users.changeProfilePic('connor', 'https://i.pinimg.com/originals/12/54/f8/1254f852f8fbaab9f0bd8605622837c7.jpg')

	//populating posts
	await forums.createPost("Is gaming fun?", "Yes, yes it is!!!", 'generalkenobi');
	await forums.createPost("Why gamers should workout", "It helps with the indurance needed for stressful gaming", 'tristan');
	await forums.createPost("What is the optimal gaming fuel?", "Obviously it is pizza and Mtn. Dew", 'isaac');
	await forums.createPost("Why e-sports are better than regular ones", "Well, it is all of the excitement of regular sports, but everyone can participate", 'sebastian');
	await forums.createPost("Where are all of the Pandas going", "It turns out that they aren't endangered, but it is a government consperacy to keep them to themselves.", 'sebastian');
	await forums.createPost("Why Smash Bros is the best game", "It is the best game because of the nostalga", 'connor');
	
	

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
	try {await games.createGame('https://steamrip.com/wp-content/uploads/2021/08/hearts-of-iron-iv-free-download-preinstalled-steamrip.jpg.webp', "Hearts Of Iron 4")}
	catch (e) {
		console.log("failed to make HOI 4");
	}


	

	let idHolder;
	try {
		try{
			idHolder = await game.createRun('generalkenobi', 'Castle Crashers', 'this run took 9 parsecs', 1757,"https://www.youtube.com/embed/pJOUCwf6-N4", ['Any%', 'Glitchless'] );
		} catch(e){
			console.log(e);
		}
		
		try {
		await game.newComment(idHolder.id.toString(), 'tristan', 'Nice run man');
		} catch(e) {
		console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'connor', 'I could do better');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'sebastian', 'No you couldnt');
		} catch(e) {
			console.log(e);
		}
		} catch (e) {
			console.log(e);
		}
	try {
		try{
			idHolder = await game.createRun('tristan', 'Castle Crashers', 'Killed it ;)', 2091,'https://www.youtube.com/embed/QqtPAjOg2oU', ['Any%', 'Glitchless'] );
		} catch(e){
			console.log(e);
		}
		
		try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'bad run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'tristan', 'that was fine');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'sebastian', 'worst Ive seen');
		} catch(e) {
			console.log(e);
		} 
	} catch (e) {
		console.log(e)
		}
	
	try {
		try{
			idHolder = await game.createRun('isaac', 'Castle Crashers', 'Got stuck on some wood but went okay', 2220,'https://www.youtube.com/embed/utrzdYhS9Es', ['Any%', 'Blindfolded'] );
		} catch(e){
			console.log(e);
		}
		try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'Nice run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'I really liked it');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'Like I loved it');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		try{
			idHolder = await game.createRun('sebastian', 'Castle Crashers', '3rd princess is my favorite', 45521,'https://www.youtube.com/embed/YII_P5-3wfs', ['100%', 'Blindfolded'] );
		} catch(e){
			console.log(e);
		}
		try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'Nice run man');
		} catch(e) {
			console.log(e);
		}
	}catch (e) {
			console.log(e);
		}
		try {
			idHolder = await game.createRun('connor', 'Castle Crashers', 'Orange Knight best knight', 2783,'https://www.youtube.com/embed/0Derj5N4Yrk', ['Any%', 'Glitchless'] );
		}catch (e) {
			console.log(e);
		}
		//populating Minecraft
	try {
		idHolder = await game.createRun('generalkenobi', 'Minecraft', 'this run took 10 parsecs', 2413,"https://www.youtube.com/embed/zePrYFb2NbI", ['Any%', 'Glitchless'] );
	} catch(e) {
		console.log(e);
	}
	try {
		try{
			idHolder = await game.createRun('connor', 'Minecraft', 'wheres the leak maam', 1203,'https://www.youtube.com/embed/f1jWqoyWobg', ['Any%', 'Glitchless'] );
		} catch(e){
			console.log(e);
		}
		try {
			await game.newComment(idHolder.id.toString(), 'tristan', 'Nice run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'connor', 'I could do better');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'sebastian', 'No you couldnt');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		try{
			idHolder = await game.createRun('tristan', 'Minecraft', 'Some BS happened here', 1243,'https://www.youtube.com/embed/srd17aD7P3Y', ['Any%', 'Glitchless'] );
		} catch(e){
			console.log(e);
		}
		try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'bad run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'tristan', 'that was fine');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'sebastian', 'worst Ive seen');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		try{
			idHolder = await game.createRun('isaac', 'Minecraft', 'Why did the dragon fly for so long?????', 4557,'https://www.youtube.com/embed/4EG2up-jcKM', ['Any%', 'Blindfolded'] );
		} catch(e){
			console.log(e);
		}
		
		try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'Nice run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'I really liked it');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'Like I loved it');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		try{
			idHolder = await game.createRun('sebastian', 'Minecraft', 'I am a god', 5124,'https://www.youtube.com/embed/ET9n1aKzY-0', ['100%', 'Blindfolded'] );
		} catch(e){
			console.log(e);
		}
		try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'Nice run man');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}

	// populating  the binding of issac
	try {
		try{
			idHolder = await game.createRun('connor', 'The Binding of Issac', 'Mom knife for the win', 1102,'https://www.youtube.com/embed/OfuEiF0iw3I', ['Any%', 'Glitchless'] );
		} catch(e){
			console.log(e);
		}
		try {
			await game.newComment(idHolder.id.toString(), 'tristan', 'Nice run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'connor', 'I could do better');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'sebastian', 'No you couldnt');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		try {
			idHolder = await game.createRun('tristan', 'The Binding of Issac', 'cursed eye couldnt stop this', 1002,'https://www.youtube.com/embed/LtVKALflhic', ['Any%', 'Glitchless'] );
		} catch(e) {
			console.log(e);
		}
		try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'bad run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'tristan', 'that was fine');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'sebastian', 'worst Ive seen');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		try {
			idHolder = await game.createRun('isaac', 'The Binding of Issac', 'Holy moly how did I survive that', 3458,'https://www.youtube.com/embed/XqOKFym_c0U', ['Any%', 'Blindfolded'] );
		} catch(e) {
			console.log(e);
		}
		try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'Nice run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'I really liked it');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'Like I loved it');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		try {
			idHolder = await game.createRun('sebastian', 'The Binding of Issac', 'I cannot believe they patched this now', 3500,'https://www.youtube.com/embed/r1mBhQoZDcI', ['100%', 'Blindfolded'] );
		} catch(e) {
			console.log(e);
		}
		
		try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'Nice run man');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
		//populating terraria

	try {
		try{
			idHolder = await game.createRun('connor', 'Terraria', 'Guide is completely worthless', 4578,'https://www.youtube.com/embed/-jkVC43ofOM', ['Any%', 'Glitchless'] );
		} catch(e){
			console.log(e);
		}
		
		try {
			await game.newComment(idHolder.id.toString(), 'tristan', 'Nice run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'connor', 'I could do better');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'sebastian', 'No you couldnt');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		try {
			idHolder = await game.createRun('tristan', 'Terraria', 'I am losing my mind to Plantera', 1247,'https://www.youtube.com/embed/ZTPrOnI9lFw', ['Any%', 'Glitchless'] );
		} catch(e) {
			console.log(e);
		}
		try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'bad run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'tristan', 'that was fine');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'sebastian', 'worst Ive seen');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	try {
		try {
			idHolder = await game.createRun('isaac', 'Terraria', 'Bully Mguire', 5567,'https://www.youtube.com/embed/j5D44ZysfU8', ['Any%', 'Blindfolded'] );
		} catch(e) {
			console.log(e);
		}
		try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'Nice run man');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'I really liked it');
		} catch(e) {
			console.log(e);
		} try {
			await game.newComment(idHolder.id.toString(), 'generalkenobi', 'Like I loved it');
		} catch(e) {
			console.log(e);
		}
	} catch(e) {
		console.log(e);
	}
	//purposefull error check
	try {
		try {
			await game.createRun('Sebastian', 'Terraria', 'Queen bee is terrifying', 3248,'https://www.youtube.com/embed/lZqrCof1Sjc', ['100%', 'Blindfolded'] );
		} catch(e) {
			console.log(e);
		}
		try {
			await game.createRun('sebastian', 'Terraria', '', 4588,'https://www.youtube.com/embed/lZqrCof1Sjc', ['100%', 'Blindfolded'] );
		} catch(e) {
			console.log(e);
		}
	 
	try {
		idHolder = await game.createRun('generalKenobi', 'Flappy Bird','I got so far', 4568,"https://www.youtube.com/embed/O5VYqv6Fyec", ['Blindfolded', 'Glitchless'] );
	}
	catch (e) {
		console.log(e);
	}
	} catch(e) {
		console.log(e);
	}

	console.log('Done seeding database');
	await dbConnection.closeConnection();
};

main();
