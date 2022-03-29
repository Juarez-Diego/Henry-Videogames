import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame } from "../../Actions";
import { getGenres, getPlatforms } from "../../Actions";


import "../Form/Form.css"

function formValidation(input) {
    let formErrors = {};

    if (!input.name) {
        formErrors.name = "Title is required";
    }
    if (!input.description) {
        formErrors.description = "Description is required";
    }
    if (!input.released) {
        formErrors.released = "A date is required"
    }
    if (!input.parent_platforms || input.parent_platforms.length <= 0) {
        formErrors.parent_platforms = "Platforms are required";
    }
    if (!input.rating) {
        formErrors.rating = "Rating is required";
    }
    if (input.rating < 0 || input.rating > 5) {
        formErrors.rating = "Rating must be between 0 and 5";
    }
    if (!input.genres || input.genres.length === 0) {
        formErrors.genres = "Please include at least one genre";
    }

    return formErrors;
};




export function Form() {

    const dispatch = useDispatch();
    const tempGenres = useSelector(state => state.genres)
    const allPlatforms = useSelector((state) => state.platforms);
    const [formErrors, setFormErrors] = useState({})
    // const [checked, setChecked] = useState(false)

    let allGenres = tempGenres.map(e => e.name).sort()

    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        parent_platforms: [],
        rating: "",
        genres: [],
        background_image: ""
    })

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    useEffect(() => {
        dispatch(getPlatforms());
    }, [])


    function handleSubmit(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setFormErrors(formValidation({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    function handleSelectPlatforms(e) {
        e.preventDefault()
        if (!input.parent_platforms.includes(e.target.value)) {
            setInput({
                ...input,
                parent_platforms: [...input.parent_platforms, e.target.value],
            })
            setFormErrors(formValidation({
                ...input,
                parent_platforms: e.target.value
            }))
            console.log(input.parent_platforms)
            console.log(formErrors.parent_platforms)
        }
    }


    function handleDelete(e) {
        setInput({
            ...input,
            parent_platforms: input.parent_platforms.filter((v) => v !== e),
        });
    }


    function handleSelectGenres(e) {
        e.preventDefault()
        if (!input.genres.includes(e.target.value)) {
            setInput({
                ...input,
                genres: [...input.genres, e.target.value],
            })
            setFormErrors(formValidation({
                ...input,
                genres: e.target.value
            }))
        }
    }

    function handleDeleteGenres(e) {
        setInput({
            ...input,
            genres: input.genres.filter((v) => v !== e),
        })
        formValidation(e)
    }

    function auxiliar(e){
        setFormErrors(formValidation({
            ...input,
            genres: e.target.value
        }))
        setFormErrors(formValidation({
            ...input,
            parent_platforms: e.target.value
        }))
    }

    function submit(e) {
        e.preventDefault()
        if (Object.values(formErrors).length > 0 || input.name === "") {
            alert("Please fill in all the required fields")
        } else {
            dispatch(createVideogame(input))
            alert("Videogame created successfully!")
        }
    }

    return (
        <div className="form">
            <div className="form-title-container">
                <h1 className="form-title">Fill in the fields</h1>
            </div>

            <div className="inputs_checkboxes">

                <form onSubmit={submit}>


                    <div className="inputs">
                        <label className="input-labels">Title: </label>
                        <input className="input-name" type="text" value={input.name} name="name" onChange={handleSubmit}></input>
                        {formErrors.name && (<p className="warning">{formErrors.name}</p>)}
                        <br />

                        <label className="input-labels">Released: </label>
                        <input className="input-name" type="date" value={input.released} name="released" onChange={handleSubmit}></input>
                        {formErrors.released && (<p className="warning">{formErrors.released}</p>)}
                        <br />

                        <label className="input-labels">Rating: </label>
                        <input className="input-name" type="number" value={input.rating} name="rating" onChange={handleSubmit}></input>
                        {formErrors.rating && (<p className="warning">{formErrors.rating}</p>)}
                        <br />

                        <label className="input-labels">Image: </label>
                        <input className="input-name" type="text" value={input.background_image} name="background_image" onChange={handleSubmit}></input>
                        <br />

                        <label className="input-labels">Description: </label>
                        <textarea className="input-name" rows="5" value={input.description} name="description" onChange={handleSubmit} />
                        {formErrors.description && (<p className="warning">{formErrors.description}</p>)}
                        <br />
                    </div>
                    {/* //////////////////////////////DROPDOWN FOR GENRES AND PLATFORMS/////////////////////// */}

                    <div className="dropdowns">

                        <div className="dropdown-platforms">


                            {formErrors.parent_platforms && (<p className="warning">{formErrors.parent_platforms}</p>)}


                            <span>Platforms: </span>
                            <select className="dropdown-input" onChange={e => handleSelectPlatforms(e)}>
                                {allPlatforms?.map((e, index) => (<option key={index} className="input-select" name="parent_platforms" value={e}> {e}</option>))}
                            </select>


                            
                            <ul>{input.parent_platforms.map(e => <li className="platform-list" key={e}>{e} <div onClick={() => handleDelete(e)} className="list-delete">X</div></li>)}</ul>



                        </div>

                        <div className="dropdown-genres">
                            {formErrors.genres && (<p className="warning">{formErrors.genres}</p>)}
                            <span>Genres: </span>
                            <select className="dropdown-input" onChange={e => handleSelectGenres(e)}>
                                {allGenres?.map((e, index) => (<option key={index} className="input-select" name="genres" value={e}> {e}</option>))}
                            </select>
                            <ul>{input.genres.map(e => <li className="platform-list" key={e}>{e} <div onClick={() => handleDeleteGenres(e)} className="list-delete" >X</div></li>)}</ul>
                        </div>

                    </div>
                    {console.log(formErrors)}

                    <button className="form-button">CREATE</button>
                </form>
            </div>
        </div>
    )
}

export default Form;