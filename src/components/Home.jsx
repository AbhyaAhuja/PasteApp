import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addToPastes, updateToPastes } from './pasteSlice';

import { useSelector } from 'react-redux';
// this page is going to be same for both:
// 1. creation
// 2. updation

// button would change based on if we get an ID

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    //pasteId: key, is a part of url
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes)


    // pasteid changes on edit, hence handled by:

    // you'll need all pastes, to access title, content of PASTE not pasteId

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content)
        }
    }, [pasteId])


    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString()
        }



        if (pasteId) {
            //update: reducer in slice
            dispatch(updateToPastes(paste));

        }
        else {
            //create: just dispatch
            dispatch(addToPastes(paste));
        }

        //after creation or updation
        setTitle('')
        setSearchParams({})//careful
        setValue('')
    }
    return (

        <div>
            <div className='flex flex-row gap-7 place-content-between'>

                <input className='p-2 rounded-2xl mt-2 min-w-[305px] pl-4' type="text" placeholder='enter title here' value={title} onChange={(e) => {
                    setTitle(e.target.value);
                }} />

                <button className='p-2 rounded-2xl mt-2' onClick={createPaste}>
                    {pasteId ? "Update my Paste" : "Create my Paste"}
                </button>

            </div>
            <div>
                <textarea className='rounded-2xl mt-4 min-w-[500px] p-4' value={value} placeholder="enter code" onChange={(e) => { setValue(e.target.value) }} rows={20} />
            </div>
        </div>
    )
}

export default Home
