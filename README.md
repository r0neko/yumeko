# yumeko
Trying to revive Yahoo! Messenger. This project is my playground. I figured out some parts by "fuzzing" packets. I'll take the time to explain how I achieved this somewhere in the future. I've been doing this from 2019, so the code isn't that clean(I didn't have a proper coding style at that time.)
At some point in time, I'll re-write it in another language and make it better. 

# Features
- IM Chat working
- Group Lists working
- Friend Requests are half-working(you can get friend requests, but they won't show up in your list until the next login; the friend added packet isn't implemented)

There are many features to be implemented. The voice component is based on SIP with a minor modification.

To set this up, install the dependencies using `npm install`, then clone the front-end website `pandora` and run `php artisan migrate:fresh` in order to create the database structure.

Important note: The user with UID 1 MUST BE CALLED yumeko. Make sure you set the `password_hash` to something like `-` in order to prevent those leechers to join that account. Use a database management app like phpMyAdmin to achieve this, or do it yourself using the mysql CLI application.

# Developer Note

If you have some knowledge on the opcodes, lemme know. I'm still having a bad time trying to figure out how the packets are processed internally. They use observers internally from what I can see in the decompilations of the clients.

This readme file will be updated accordingly with other information that may be useful in the future.