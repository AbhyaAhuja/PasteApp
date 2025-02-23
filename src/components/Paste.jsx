import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from './pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { TwitterIcon, TwitterShareButton, LinkedinIcon, LinkedinShareButton } from 'react-share';
import Modal from 'react-modal';
const Paste = () => {

    const pastes = useSelector((state) => state.paste.pastes)
    // state. nameOfSlice.value(initialstate)

    
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const filteredData = pastes.filter(
        (paste) => paste.title.toLowerCase().includes(text.toLowerCase())
    )

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
    }
    return (
        <div>
            <div>
                <input className='p-2 rounded-2xl min-w-[600px] mt-5' type="search" placeholder="enter search" value={text} onChange={(e) => setText(e.target.value)} />
            </div>

            {/* //cards   */}
            <div className='flex flex-column pt-4 gap-5 mt-5' >

                {
                    // conditional rendering
                    filteredData.length > 0 &&
                    filteredData.map(
                        (paste) => {
                            return (
                                <div key='' className='border pt-4 min-w-[300px]
                                 min-h-[200px]'>
                                    <div>
                                        {paste.title}
                                    </div>
                                    <div>
                                        {paste.content}
                                    </div>
                                    <div className='flex flex-row p-4 mt-10 gap-4 place-content-evenly'>
                                        <button><NavLink to={`/?pasteId=${paste?._id}`}>Edit</NavLink></button>
                                        <button><NavLink to={`/pastes/${paste?._id}`}>View</NavLink></button>
                                        <button onClick={() => handleDelete(paste?._id)} >Delete</button>
                                        {/* optional chaining: ?.
                                        returns undefined if paste is null or undefined
                                        */}
                                        <button onClick={() => {
                                            navigator.clipboard.writeText(paste?.content)
                                            toast.success("copied to clipboard")
                                        }}>Copy</button>
                                         <button >Share</button>



                                    </div>
                                    <div>
                                        {paste.createdAt}
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>
            
        </div>
    )
}

export default Paste
