class PlaylistService {
    constructor(db) {
        this._pool = db;
    }

    GetPlaylistById = async (id) => {
        const query = {
            text: `
            SELECT playlists.id, playlists.name
            FROM playlists 
            WHERE playlists.id = $1`,
            values: [id],
        };

        const { rows } = await this._pool.query(query);
        return rows[0];
    };

    GetSongsByPlaylistId = async (id) => {
        const query = {
            text: `
            SELECT songs.id, songs.title, songs.performer
            FROM songs
            LEFT JOIN playlist_songs on songs.id = playlist_songs.song_id
            WHERE playlist_songs.playlist_id = $1`,
            values: [id],
        };
        const { rows } = await this._pool.query(query);
        return rows;
    };
}

module.exports = PlaylistService;
