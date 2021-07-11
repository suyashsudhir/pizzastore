import React, {useRef, useEffect} from 'react';
import './modal.styles.css';

const Modal = ({
                   children, show, onClose, title, btnAction, btnText, footer = true
               }) => {
    const modalRef = useRef(null);
    useEffect(() => {
        if (show){
            modalRef.current.classList.add("visible")
        }
        else {
            modalRef.current.classList.remove("visible")
        }
    })
    return(

        <>
            <div ref={modalRef} className="modal-window">
                <div>
                    <span onClick={onClose} title="Close" className="modal-close">Close</span>
                    <h1>{title}</h1>
                    {children}
                    {
                        footer && <>
                            <hr/>
                            <footer>
                                <button className="brand-btn-danger" onClick={onClose}>Cancel</button>
                                <button className="brand-btn" onClick={btnAction}>
                                    {btnText}
                                </button>
                            </footer></>
                    }

                </div>
            </div>
        </>
    )
}
export default Modal;