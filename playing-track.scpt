try
    set short_name to "whoami"
    

    tell application "Spotify"
		set theTrack to current track
		set theArtist to artist of theTrack
		set theName to name of theTrack
		if player state is playing then
			set playStatus to "playing"
		else
			set playStatus to "notPlaying"
		end if

		set p to theName
		#set p to  theTrack & ":" & theArtist & ":" & state
	    return p
	end tell


end try