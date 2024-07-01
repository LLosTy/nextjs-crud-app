async function getNote(noteId: string){
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
        {
            next: { revalidate:10 }
        }
    )
    // http://127.0.0.1:8090/api/collections/notes/records
    //since this is a dynamic route, it doesn't automatically cache every request
    //however we might want to change the caching behaviour
    //Revalidate - after a certain amount of time, regenerate the page
    const data = await res.json()
    // console.log("Data from idpage",data)
    return data

}

export default async function NotePage({params} :any){
    const note = await getNote(params.id)

    return(
    <div>
        <h1>notes{note.id}</h1>
        <div>
            <h3>{note.title}</h3>
            <h5>{note.content}</h5>
            <p>{note.created}</p>
        </div>
    </div>
)
}

