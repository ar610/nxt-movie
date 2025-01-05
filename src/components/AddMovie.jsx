function AddMovie(){
    return(
        <>
            <form>
                <input className="inputfield" type="text" id="addmovie" name="addmovie" placeholder="Add movie"></input>
                <button type="submit" className="add-button">
                ADD
                </button>
            </form>
        </>
    )
}
export default AddMovie;