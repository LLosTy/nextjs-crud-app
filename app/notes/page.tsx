import Link from "next/link";
import CreateNote from "@/app/notes/CreateNote";
// import PocketBase from 'pocketbase'

async function getNotes(){

    const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records?=1&perPage=30',
        {cache:'no-store'})
    const data = await res.json()
    // ---ALTERNATIVE---
    // const db = new PocketBase('http://127.0.0.1:8090')
    // const data = await db.records.getList('notes')
    // console.log(data)
    return data?.items as any[]
}


export default async function NotesPage() {
    const notes = await getNotes()
    return (
        <div>
            <h1>Notes</h1>
            <div>
                {notes?.map((note) => {
                    return <Note key={note.id} note={note}></Note>
                })}
            </div>
            <CreateNote/>
        </div>
    )
};

function Note({ note }: any) {
    const { id, title, content, created } = note || {};
    return(
        <Link href={`/notes/${id}`}>
            <div>
                <h2>{title}</h2>
                <h5>{content}</h5>
                <p>{created}</p>
            </div>
        </Link>
    );
}
