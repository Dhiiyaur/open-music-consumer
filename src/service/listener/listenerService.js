class ListenerService {
    constructor(playlistService, mailService) {
        this.playlistService = playlistService;
        this.mailService = mailService;
    }

    listener = async (message) => {
        try {
            const { playlistId, targetEmail } = JSON.parse(message.content.toString());
            const queryDataPlaylist = await this.playlistService.GetPlaylistById(playlistId);
            const queryPlaylistSongs = await this.playlistService.GetSongsByPlaylistId(playlistId);

            const data = {
                playlist: {
                    ...queryDataPlaylist,
                    songs: queryPlaylistSongs,
                },
            };

            await this.mailService.sendMail(targetEmail, JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    };
}

module.exports = ListenerService;
