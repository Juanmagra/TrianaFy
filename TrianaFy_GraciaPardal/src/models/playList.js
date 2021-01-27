class PlayList {
    constructor(nombre, descripcion, userId, songsList = [], id = 0) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.userId = userId;
        this.songsList = songsList;

    }
}
export {
    PlayList
}