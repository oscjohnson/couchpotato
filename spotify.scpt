on run argv
	set command to item 1 of argv
	

	if command is equal to "playpause" then
		tell application "Spotify" to playpause
	
	else if	command is equal to "next" then
		tell application "Spotify" to next track

	else if	command is equal to "prev" then
		tell application "Spotify" to previous track

	else if	command is equal to "currenttrack" then
		tell application "Spotify" to current track
	
	else if command is equal to "play" then
		set song to item 2 of argv
		tell application "Spotify"
     		play track song
		end tell

	end if

	return command
		
end run
	
# current track