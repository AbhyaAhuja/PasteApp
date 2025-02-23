import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useSearchParams, useParams } from 'react-router-dom';



// pastes/:id--> useParams
// /?key:value searchParams.get("pasteId");

const ViewPaste = () => {

    const { id } = useParams();
    const allPastes = useSelector((state) => state.paste.pastes)

    //filter returns array of pastes whose id matches
    const paste = allPastes.filter((p) => p._id === id)[0];
    return (
        <div>
            <div className='flex flex-row gap-7 place-content-between'>

                <input className='p-2 rounded-2xl mt-2 min-w-[305px] pl-4' type="text" placeholder='enter title here' value={paste.title} disabled />

                {/* <button className='p-2 rounded-2xl mt-2' onClick={createPaste}>
                    {pasteId ? "Update my Paste" : "Create my Paste"}
                </button> */}

            </div>
            <div>
                <textarea className='rounded-2xl mt-4 min-w-[500px] p-4' value={paste.content} placeholder="enter code" rows={20} disabled />
            </div>
        </div>
    )
}

export default ViewPaste