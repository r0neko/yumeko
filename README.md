# yumeko
Trying to revive Yahoo! Messenger. This project is my playground. I figured out some parts by "fuzzing" packets. I'll take the time to explain how I achieved this somewhere in the future. I've been doing this since 2019, so the code isn't that clean(I didn't have a proper coding style at that time.)
At some point in time, I'll re-write it in another language and make it better. 

# Features
- IM Chat working
- Group Lists working
- Friend Requests are mostly working
- System Messages

There are still many features to be implemented. The voice component is based on SIP with a minor alteration of the protocol.

To set this up, install the dependencies using `npm install`, then clone the front-end website `pandora` and run `php artisan migrate:fresh` in order to create the database structure.

Important note: The user with UID 1 MUST BE CALLED yumeko. Make sure you set the `password_hash` to something like `-` in order to prevent those leechers to connect to that account. Use a database management app like phpMyAdmin to achieve this, or do it yourself using the mysql CLI application.

# Developer Note

The protocol is subdivided in modules which reside within the client and those modules are responsable for stuff like messaging, alerts and more. We are slowly trying to understand the structure of the data.

This readme file will be updated accordingly with other information that may be useful in the future.