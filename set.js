const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS05haFp6YjRQWFdDQmJocU9vYmpxdzFYWStqWlNheU5iaTlRVGtvZFpWQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0Q0Q0VvSEhvTVlSMUJla3Q5SVlNODZVMXBhSTdNTWxsUlBlMDdIZHN4ND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlT3FmQ3NDTnBwaFBiaGhUMGFyc3NJdC9qVis0MUNIY1huZlAvZUx6R1VJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwbE9LRC81SENMb3NvcXM5VFo3aVJzdFhMZGtXWkozYWNLdkdQTGswZXdFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVEN2pzSnh4MmRocG1RcnV0clA0ZG82ZUtiY3FGTVhGQ3FiK1lIT2gwM0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im45OHEvOGthejV3amUvckREaXM3bmdrbHVhck5XVHNZWlhzQjA4OWM2Unc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0FJbG8rOHZEbG8vVmRWWXJRZEZORkhaRS81SXJ5K0hmLzhzeXNBTVUxaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQzkzUk1RTWtWay9OOUEzcW13dTlBZS8vZ0ljTUNpeCtkV2hZNFMzN0lYYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhGeXdRTm9lZDk2N2hRU0NlK0xwVCtFZUFYT0tORllWOGY3eEF4TnVyeVdEdloxMjdWNW9haUdqamNrRW9XZy9OY1ArT29TQjRpYlRpR2VCRC9HeENBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM4LCJhZHZTZWNyZXRLZXkiOiJQVzREcW02UHhLT1ZlaGZCZ0g0MEtFWGIyWllWb25qOUNHYXpXb2JFWCswPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijg4MDEzMzQ3NDE0NzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNzJCMDYzMjc0MTFCQTQ1RjVGMkE2RDk4MzZDOTNFNzYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNTUyNzUwNH0seyJrZXkiOnsicmVtb3RlSmlkIjoiODgwMTMzNDc0MTQ3M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyQUQxRUU1MDg2ODc2QTgxRkM5MkRDOUU2Q0UzRUMwOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI1NTI3NTA1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJQckw5RFBMTlN5ZTNOcldxcWd2OW5RIiwicGhvbmVJZCI6ImYyMzM4ZGU4LTg2N2UtNDIyNC05ZWM2LTM4M2Y0OTAwZjkwYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNaDJFczdaYWlSM0JtZ2xMdFhNaldqaXBtWm89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRGt5VDFPV2FIaXI2WjRIOVhWRENrdTlJV1Y0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjFKTTM1S0pEIiwibWUiOnsiaWQiOiI4ODAxMzM0NzQxNDczOjFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTUQgQXNhZHV6emFtYW4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05IbTVKc0hFTURyNWJZR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImorVnA1ZkZtSFNSbzN6TG85aU1Mb1c4cTJHYVBNKzZiOEw5M2VSaFRvRUE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkFRUkI1SXRZaWwxbFNHNWU3SUV5MGVDWCt2YWVLYWhxWDZkdVl3M081OGJKZGxjMnR1bTVQMmNHb3pqWTRFUERmZmViT21CNjhtWGIwdUl5a0dYbkJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ5RWtMVkVjMUQ5bW1KNTZiVUlNMzN0WHQwZUY3OExRWk5tYmxmNURvYXdMdkw0eWpaVGZOOStmNzBkbmdxbllWazlaYkIvQXAwcENwcDN1SUNDVjNCUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijg4MDEzMzQ3NDE0NzM6MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZL2xhZVh4Wmgwa2FOOHk2UFlqQzZGdkt0aG1qelB1bS9DL2Qza1lVNkJBIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI1NTI3NTAxLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUthbCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
